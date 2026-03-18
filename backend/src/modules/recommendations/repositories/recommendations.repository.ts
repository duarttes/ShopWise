/**
 * RecommendationsRepository
 *
 * Handles all data queries needed by the recommendation engine.
 * This repository centralizes access to shopping lists and price records.
 */

import { prisma } from "../../../shared/infra/prisma";

export class RecommendationsRepository {
  async findShoppingListById(shoppingListId: string) {
    return prisma.shoppingList.findUnique({
      where: { id: shoppingListId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findLatestPriceRecordsByProductIds(productIds: string[]) {
    const priceRecords = await prisma.priceRecord.findMany({
      where: {
        productId: {
          in: productIds,
        },
      },
      include: {
        market: true,
        product: true,
      },
      orderBy: {
        observedAt: "desc",
      },
    });

    /**
     * We only want the latest price record per product and market.
     * Since records are ordered by observedAt descending, the first occurrence
     * for each product+market pair is the latest one.
     */
    const latestRecordsMap = new Map<string, (typeof priceRecords)[number]>();

    for (const record of priceRecords) {
      const key = `${record.productId}:${record.marketId}`;

      if (!latestRecordsMap.has(key)) {
        latestRecordsMap.set(key, record);
      }
    }

    return Array.from(latestRecordsMap.values());
  }
}