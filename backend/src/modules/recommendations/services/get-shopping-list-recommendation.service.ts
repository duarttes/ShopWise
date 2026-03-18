/**
 * GetShoppingListRecommendationService
 *
 * This service calculates the best market recommendations for a shopping list.
 *
 * Improved MVP strategy:
 * - only shopping list items linked to a productId are used for price comparison
 * - unmatched items are returned separately
 * - latest price records are grouped by market
 * - each market receives coverage information
 * - cheapestCompleteMarket only considers markets that cover all matched items
 * - closestMarket only considers markets with available distance
 * - bestValueMarket balances coverage and estimated total
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
  quantity: number;
  estimatedItemTotal: number;
  observedAt: Date;
}

interface MarketBreakdown {
  marketId: string;
  name: string;
  estimatedTotal: number;
  distanceKm: number | null;
  coveredItemsCount: number;
  totalMatchedItemsCount: number;
  coveragePercentage: number;
  missingProductIds: string[];
  missingItemNames: string[];
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

    /**
     * Separate matched and unmatched items.
     * Matched items are the ones linked to a product in the catalog.
     */
    const matchedItems = shoppingList.items.filter((item) => Boolean(item.productId));
    const unmatchedItems = shoppingList.items
      .filter((item) => !item.productId)
      .map((item) => ({
        itemId: item.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
      }));

    if (matchedItems.length === 0) {
      throw new AppError(
        "Shopping list does not contain items linked to products",
        400
      );
    }

    const productIds = matchedItems.map((item) => item.productId as string);

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
      const relatedShoppingListItem = matchedItems.find(
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
          coveredItemsCount: 1,
          totalMatchedItemsCount: matchedItems.length,
          coveragePercentage: 0,
          missingProductIds: [],
          missingItemNames: [],
          items: [
            {
              productId: record.productId,
              productName:
                relatedShoppingListItem.product?.name ?? relatedShoppingListItem.name,
              price: record.price,
              quantity,
              estimatedItemTotal,
              observedAt: record.observedAt,
            },
          ],
        });

        continue;
      }

      /**
       * Avoid duplicated product entries inside the same market breakdown.
       * This can happen if the same product appears multiple times in the source set.
       */
      const alreadyIncluded = existingMarket.items.some(
        (item) => item.productId === record.productId
      );

      if (alreadyIncluded) {
        continue;
      }

      existingMarket.estimatedTotal += estimatedItemTotal;
      existingMarket.coveredItemsCount += 1;
      existingMarket.items.push({
        productId: record.productId,
        productName:
          relatedShoppingListItem.product?.name ?? relatedShoppingListItem.name,
        price: record.price,
        quantity,
        estimatedItemTotal,
        observedAt: record.observedAt,
      });
    }

    const matchedProductIdSet = new Set(productIds);

    const marketBreakdown = Array.from(marketBreakdownMap.values()).map((market) => {
      const coveredProductIds = new Set(market.items.map((item) => item.productId));

      const missingProductIds = Array.from(matchedProductIdSet).filter(
        (productId) => !coveredProductIds.has(productId)
      );

      const missingItemNames = matchedItems
        .filter((item) => item.productId && missingProductIds.includes(item.productId))
        .map((item) => item.product?.name ?? item.name);

      const coveragePercentage = Number(
        ((market.coveredItemsCount / market.totalMatchedItemsCount) * 100).toFixed(2)
      );

      return {
        ...market,
        missingProductIds,
        missingItemNames,
        coveragePercentage,
      };
    });

    /**
     * Sort helper lists for different recommendation strategies.
     */
    const byEstimatedTotal = [...marketBreakdown].sort(
      (a, b) => a.estimatedTotal - b.estimatedTotal
    );

    const completeMarkets = marketBreakdown
      .filter((market) => market.coveredItemsCount === market.totalMatchedItemsCount)
      .sort((a, b) => a.estimatedTotal - b.estimatedTotal);

    const marketsWithDistance = marketBreakdown
      .filter((market) => market.distanceKm !== null)
      .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));

    /**
     * Best value strategy for the MVP:
     * - prioritize higher coverage
     * - then lower estimated total
     * - then shorter distance when available
     */
    const byBestValue = [...marketBreakdown].sort((a, b) => {
      if (b.coveragePercentage !== a.coveragePercentage) {
        return b.coveragePercentage - a.coveragePercentage;
      }

      if (a.estimatedTotal !== b.estimatedTotal) {
        return a.estimatedTotal - b.estimatedTotal;
      }

      return (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity);
    });

    const cheapestMarket = byEstimatedTotal[0] ?? null;
    const cheapestCompleteMarket = completeMarkets[0] ?? null;
    const closestMarket = marketsWithDistance[0] ?? null;
    const bestValueMarket = byBestValue[0] ?? null;

    return {
      shoppingListId: shoppingList.id,
      shoppingListName: shoppingList.name,
      matchedItemsCount: matchedItems.length,
      unmatchedItemsCount: unmatchedItems.length,
      unmatchedItems,
      cheapestMarket,
      cheapestCompleteMarket,
      closestMarket,
      bestValueMarket,
      marketBreakdown: byBestValue,
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