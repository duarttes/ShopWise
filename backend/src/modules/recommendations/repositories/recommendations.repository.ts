/**
 * RecommendationsRepository
 *
 * Handles all database operations related to shopping list recommendations.
 */

import { prisma } from "../../../shared/infra/prisma";

export class RecommendationsRepository {
  async findShoppingListById(shoppingListId: string) {
    return prisma.shoppingList.findUnique({
      where: { id: shoppingListId },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  /**
   * Returns the latest known price record for each product in each market.
   *
   * Strategy:
   * - load price records ordered by newest first
   * - keep only the first occurrence of each (marketId + productId)
   */
  async findLatestPricesForProducts(productIds: string[]) {
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

    const latestByMarketAndProduct = new Map<
      string,
      (typeof priceRecords)[number]
    >();

    for (const record of priceRecords) {
      const key = `${record.marketId}:${record.productId}`;

      if (!latestByMarketAndProduct.has(key)) {
        latestByMarketAndProduct.set(key, record);
      }
    }

    return Array.from(latestByMarketAndProduct.values());
  }
}