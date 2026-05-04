import 'dotenv/config';
import 'reflect-metadata';
import { prisma } from '../shared/infra/prisma';

async function main() {
  console.log('🧹 Iniciando deduplicação de price records...');

  const allRecords = await prisma.priceRecord.findMany({
    orderBy: { observedAt: 'asc' },
    select: {
      id: true,
      productId: true,
      marketId: true,
      observedAt: true,
      price: true,
    },
  });

  console.log(`📊 Total de registros: ${allRecords.length}`);

  // Agrupa por productId + marketId + dia
  const seen = new Map<string, string>(); // key -> id a manter
  const toDelete: string[] = [];

  for (const record of allRecords) {
    const day = record.observedAt.toISOString().split('T')[0];
    const key = `${record.productId}:${record.marketId}:${day}`;

    if (seen.has(key)) {
      toDelete.push(record.id);
    } else {
      seen.set(key, record.id);
    }
  }

  console.log(`🗑️  Duplicatas encontradas: ${toDelete.length}`);

  if (toDelete.length === 0) {
    console.log('✅ Nenhuma duplicata encontrada!');
    return;
  }

  // Deleta em batches de 100
  const batchSize = 100;
  for (let i = 0; i < toDelete.length; i += batchSize) {
    const batch = toDelete.slice(i, i + batchSize);
    await prisma.priceRecord.deleteMany({
      where: { id: { in: batch } },
    });
    console.log(`  Deletados ${Math.min(i + batchSize, toDelete.length)}/${toDelete.length}`);
  }

  console.log('✅ Deduplicação concluída!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());