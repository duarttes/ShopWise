import 'dotenv/config';
import 'reflect-metadata';
import { prisma } from '../shared/infra/prisma';
import { makeGeocodingProvider } from '../shared/geocoding/geocoding-provider.factory';

async function run() {
  const markets = await prisma.market.findMany({
    where: {
      latitude: null,
    },
  });

  console.log(`Found ${markets.length} markets without coordinates.`);

  if (markets.length === 0) {
    console.log('Nothing to do.');
    await prisma.$disconnect();
    return;
  }

  const provider = makeGeocodingProvider();

  for (const market of markets) {
    try {
      const result = await provider.geocode({
        address: market.address,
        city: market.city,
        state: market.state,
        country: 'Brazil',
      });

      if (!result) {
        console.log(`  ✗ ${market.name} — could not geocode`);
        continue;
      }

      await prisma.market.update({
        where: { id: market.id },
        data: {
          latitude: result.latitude,
          longitude: result.longitude,
        },
      });

      console.log(`  ✓ ${market.name} → ${result.latitude}, ${result.longitude}`);

      // Nominatim pede 1 req/segundo
      await new Promise((r) => setTimeout(r, 1100));
    } catch (err) {
      console.error(`  ✗ ${market.name} — error:`, err);
    }
  }

  console.log('Done.');
  await prisma.$disconnect();
}

run();