/**
 * AnalyticsRepository
 *
 * Handles data queries related to analytics and price intelligence.
 * This repository focuses on product price history and latest known prices.
 */

import { prisma } from "../../../shared/infra/prisma";

export class AnalyticsRepository {
  async findProductById(productId: string) {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  }

  async findProductPriceHistory(productId: string) {
    return prisma.priceRecord.findMany({
      where: { productId },
      include: {
        market: true,
        product: true,
        receiptItem: true,
      },
      orderBy: {
        observedAt: "desc",
      },
    });
  }

  async findLatestPricesByProduct(productId: string) {
    const priceRecords = await prisma.priceRecord.findMany({
      where: { productId },
      include: {
        market: true,
        product: true,
      },
      orderBy: {
        observedAt: "desc",
      },
    });

    /**
     * Keeps only the newest price record per market.
     */
    const latestByMarket = new Map<string, (typeof priceRecords)[number]>();

    for (const record of priceRecords) {
      if (!latestByMarket.has(record.marketId)) {
        latestByMarket.set(record.marketId, record);
      }
    }

    return Array.from(latestByMarket.values()).sort((a, b) => a.price - b.price);
  }
}