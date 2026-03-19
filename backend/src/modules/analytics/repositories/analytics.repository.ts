/**
 * AnalyticsRepository
 *
 * Handles data queries related to analytics and price intelligence.
 * This repository focuses on product price history, latest known prices
 * and user dashboard summary information.
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

    const latestByMarket = new Map<string, (typeof priceRecords)[number]>();

    for (const record of priceRecords) {
      if (!latestByMarket.has(record.marketId)) {
        latestByMarket.set(record.marketId, record);
      }
    }

    return Array.from(latestByMarket.values()).sort((a, b) => a.price - b.price);
  }

  async findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findUserReceipts(userId: string) {
    return prisma.receipt.findMany({
      where: { userId },
      include: {
        market: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        purchasedAt: "desc",
      },
    });
  }

  async findRecentUserReceipts(userId: string, take = 10) {
    return prisma.receipt.findMany({
      where: { userId },
      include: {
        market: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        purchasedAt: "desc",
      },
      take,
    });
  }
}