import { useEffect, useState } from 'react';
import { getRecentReceipts, getStoredUserId } from '../services/api';
import { Card, PageHeader, EmptyState } from '../components/ui';

export function ReceiptsPage() {
  const userId = getStoredUserId()!;
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentReceipts(userId)
      .then((res) => setReceipts(res.receipts ?? []))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-muted)' }}>
      Carregando...
    </div>
  );

  return (
    <div>
      <PageHeader title="Minhas notas" subtitle={`${receipts.length} nota(s) importada(s)`} />
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {receipts.length === 0 && (
          <EmptyState icon="🧾" title="Nenhuma nota ainda" description="Escaneie um QR code de nota fiscal para começar." />
        )}
        {receipts.map((receipt) => (
          <Card key={receipt.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ flex: 1, marginRight: 12 }}>
                <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, lineHeight: 1.3, color: 'var(--text)' }}>
                  {receipt.market?.marketName}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {receipt.market?.city} · {receipt.market?.state}
                </div>
              </div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 18, color: 'var(--green)', whiteSpace: 'nowrap' }}>
                R$ {Number(receipt.totalAmount).toFixed(2)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-subtle)' }}>
              <span>📅 {new Date(receipt.purchasedAt).toLocaleDateString('pt-BR')}</span>
              <span>📦 {receipt.itemsCount} itens</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}