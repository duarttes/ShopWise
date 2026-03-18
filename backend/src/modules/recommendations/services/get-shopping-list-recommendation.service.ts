/**
 * GetShoppingListRecommendationService
 *
 * This service calculates the best market recommendations for a shopping list.
 *
 * MVP strategy:
 * - only shopping list items linked to a productId are considered
 * - latest price records are grouped by market
 * - estimated totals are calculated per market
 * - cheapest market is always returned if price data exists
 * - closest market is returned only when user coordinates are provided
 * - best value market is currently the same as the cheapest market in the MVP
 */

import { AppError } from "../../../shared/errors/app-error";
import { RecommendationsRepository } from "../repositories/recommendations.repository";

interface Coordinates {
  userLatitude?: number;
  userLongitude?: number;
}

interface MarketBreakdownItem {
  productId: string;
  productName: string;
  price: number;
  observedAt: Date;
}

interface MarketBreakdown {
  marketId: string;
  name: string;
  estimatedTotal: number;
  distanceKm: number | null;
  items: MarketBreakdownItem[];
}

export class GetShoppingListRecommendationService {
  constructor(
    private recommendationsRepository: RecommendationsRepository
  ) {}

  async execute(shoppingListId: string, coordinates?: Coordinates) {
    const shoppingList =
      await this.recommendationsRepository.findShoppingListById(shoppingListId);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    const productIds = shoppingList.items
      .map((item) => item.productId)
      .filter((productId): productId is string => Boolean(productId));

    if (productIds.length === 0) {
      throw new AppError(
        "Shopping list does not contain items linked to products",
        400
      );
    }

    const latestPriceRecords =
      await this.recommendationsRepository.findLatestPriceRecordsByProductIds(
        productIds
      );

    if (latestPriceRecords.length === 0) {
      throw new AppError(
        "No price records found for the products in this shopping list",
        404
      );
    }

    const marketBreakdownMap = new Map<string, MarketBreakdown>();

    for (const record of latestPriceRecords) {
      const relatedShoppingListItem = shoppingList.items.find(
        (item) => item.productId === record.productId
      );

      if (!relatedShoppingListItem) {
        continue;
      }

      const quantity = relatedShoppingListItem.quantity ?? 1;
      const estimatedItemTotal = record.price * quantity;

      const existingMarket = marketBreakdownMap.get(record.marketId);

      if (!existingMarket) {
        marketBreakdownMap.set(record.marketId, {
          marketId: record.marketId,
          name: record.market.name,
          estimatedTotal: estimatedItemTotal,
          distanceKm: this.calculateDistanceIfPossible(
            coordinates?.userLatitude,
            coordinates?.userLongitude,
            record.market.latitude,
            record.market.longitude
          ),
          items: [
            {
              productId: record.productId,
              productName:
                relatedShoppingListItem.product?.name ?? relatedShoppingListItem.name,
              price: record.price,
              observedAt: record.observedAt,
            },
          ],
        });

        continue;
      }

      existingMarket.estimatedTotal += estimatedItemTotal;
      existingMarket.items.push({
        productId: record.productId,
        productName:
          relatedShoppingListItem.product?.name ?? relatedShoppingListItem.name,
        price: record.price,
        observedAt: record.observedAt,
      });
    }

    const marketBreakdown = Array.from(marketBreakdownMap.values()).sort(
      (a, b) => a.estimatedTotal - b.estimatedTotal
    );

    const cheapestMarket = marketBreakdown[0] ?? null;

    const marketsWithDistance = marketBreakdown
      .filter((market) => market.distanceKm !== null)
      .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));

    const closestMarket = marketsWithDistance[0] ?? null;

    /**
     * MVP simplification:
     * bestValueMarket is the same as the cheapest market.
     * Later this can combine total price, distance and item coverage.
     */
    const bestValueMarket = cheapestMarket;

    return {
      shoppingListId: shoppingList.id,
      shoppingListName: shoppingList.name,
      cheapestMarket,
      closestMarket,
      bestValueMarket,
      marketBreakdown,
    };
  }

  /**
   * Calculates distance between two coordinates using the Haversine formula.
   * Returns null when any required coordinate is missing.
   */
  private calculateDistanceIfPossible(
    userLatitude?: number,
    userLongitude?: number,
    marketLatitude?: number | null,
    marketLongitude?: number | null
  ): number | null {
    if (
      userLatitude === undefined ||
      userLongitude === undefined ||
      marketLatitude === null ||
      marketLatitude === undefined ||
      marketLongitude === null ||
      marketLongitude === undefined
    ) {
      return null;
    }

    const toRadians = (value: number) => (value * Math.PI) / 180;

    const earthRadiusKm = 6371;

    const deltaLatitude = toRadians(marketLatitude - userLatitude);
    const deltaLongitude = toRadians(marketLongitude - userLongitude);

    const a =
      Math.sin(deltaLatitude / 2) ** 2 +
      Math.cos(toRadians(userLatitude)) *
        Math.cos(toRadians(marketLatitude)) *
        Math.sin(deltaLongitude / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Number((earthRadiusKm * c).toFixed(2));
  }
}