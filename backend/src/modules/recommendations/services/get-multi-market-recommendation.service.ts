/**
 * GetMultiMarketRecommendationService
 *
 * Builds a multi-market recommendation by selecting the cheapest
 * available market for each product-backed shopping list item.
 *
 * MVP strategy:
 * - for each item, choose the cheapest latest known price
 * - group chosen items by market
 * - compare against the best single-market option
 * - apply penalties for distance and number of markets
 */

import { AppError } from "../../../shared/errors/app-error";
import { RecommendationsRepository } from "../repositories/recommendations.repository";

interface MultiMarketRecommendationParams {
  userLatitude?: number;
  userLongitude?: number;
}

export class GetMultiMarketRecommendationService {
  constructor(
    private recommendationsRepository: RecommendationsRepository
  ) {}

  async execute(
    shoppingListId: string,
    params?: MultiMarketRecommendationParams
  ) {
    const shoppingList =
      await this.recommendationsRepository.findShoppingListById(shoppingListId);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    if (!shoppingList.items || shoppingList.items.length === 0) {
      throw new AppError("Shopping list has no items", 400);
    }

    const effectiveUserLatitude =
      params?.userLatitude ?? shoppingList.user?.homeLatitude ?? undefined;

    const effectiveUserLongitude =
      params?.userLongitude ?? shoppingList.user?.homeLongitude ?? undefined;

    const productBackedItems = shoppingList.items.filter((item) =>
      Boolean(item.productId)
    );

    if (productBackedItems.length === 0) {
      throw new AppError(
        "Shopping list has no items linked to products",
        400
      );
    }

    const latestPrices =
      await this.recommendationsRepository.findLatestPricesForProducts(
        productBackedItems.map((item) => item.productId!)
      );

    if (latestPrices.length === 0) {
      return {
        shoppingList: {
          id: shoppingList.id,
          name: shoppingList.name,
          totalItemsCount: shoppingList.items.length,
          productBackedItemsCount: productBackedItems.length,
        },
        bestSingleMarket: null,
        multiMarketPlan: {
          totalEstimated: 0,
          marketsUsedCount: 0,
          markets: [],
          distanceSummary: null,
          penalties: {
            extraMarketsPenalty: 0,
            distancePenalty: 0,
          },
          adjustedSavings: null,
          recommendationScore: 0,
          isWorthSplitting: false,
        },
        savingsVsBestSingleMarket: null,
      };
    }

    /**
     * Select the cheapest available market for each shopping list item.
     */
    const chosenByShoppingListItem = new Map<
      string,
      {
        shoppingListItemId: string;
        shoppingListItemName: string;
        productId: string;
        productName: string;
        marketId: string;
        marketName: string;
        marketLatitude: number | null;
        marketLongitude: number | null;
        price: number;
      }
    >();

    for (const item of productBackedItems) {
      const candidates = latestPrices
        .filter((price) => price.productId === item.productId)
        .sort((a, b) => a.price - b.price);

      const cheapest = candidates[0];

      if (!cheapest) {
        continue;
      }

      chosenByShoppingListItem.set(item.id, {
        shoppingListItemId: item.id,
        shoppingListItemName: item.name,
        productId: cheapest.product.id,
        productName: cheapest.product.name,
        marketId: cheapest.marketId,
        marketName: cheapest.market.displayName ?? cheapest.market.name,
        marketLatitude: cheapest.market.latitude,
        marketLongitude: cheapest.market.longitude,
        price: cheapest.price,
      });
    }

    const groupedByMarket = new Map<
      string,
      {
        marketId: string;
        marketName: string;
        latitude: number | null;
        longitude: number | null;
        totalEstimated: number;
        items: Array<{
          shoppingListItemId: string;
          shoppingListItemName: string;
          productId: string;
          productName: string;
          price: number;
        }>;
      }
    >();

    for (const chosen of chosenByShoppingListItem.values()) {
      const existing = groupedByMarket.get(chosen.marketId);

      if (!existing) {
        groupedByMarket.set(chosen.marketId, {
          marketId: chosen.marketId,
          marketName: chosen.marketName,
          latitude: chosen.marketLatitude,
          longitude: chosen.marketLongitude,
          totalEstimated: chosen.price,
          items: [
            {
              shoppingListItemId: chosen.shoppingListItemId,
              shoppingListItemName: chosen.shoppingListItemName,
              productId: chosen.productId,
              productName: chosen.productName,
              price: chosen.price,
            },
          ],
        });

        continue;
      }

      existing.totalEstimated += chosen.price;
      existing.items.push({
        shoppingListItemId: chosen.shoppingListItemId,
        shoppingListItemName: chosen.shoppingListItemName,
        productId: chosen.productId,
        productName: chosen.productName,
        price: chosen.price,
      });
    }

    const markets = Array.from(groupedByMarket.values())
      .map((market) => {
        const distanceKm = this.calculateDistanceIfPossible(
          effectiveUserLatitude,
          effectiveUserLongitude,
          market.latitude,
          market.longitude
        );

        return {
          ...market,
          totalEstimated: Number(market.totalEstimated.toFixed(2)),
          distanceKm,
        };
      })
      .sort((a, b) => b.items.length - a.items.length);

    const multiMarketTotal = Number(
      markets.reduce((sum, market) => sum + market.totalEstimated, 0).toFixed(2)
    );

    /**
     * Build single-market comparison using latest prices grouped by market.
     */
    const singleMarketMap = new Map<
      string,
      {
        marketId: string;
        marketName: string;
        matchedProductIds: Set<string>;
        totalEstimated: number;
      }
    >();

    for (const price of latestPrices) {
      const existing = singleMarketMap.get(price.marketId);

      if (!existing) {
        singleMarketMap.set(price.marketId, {
          marketId: price.marketId,
          marketName: price.market.displayName ?? price.market.name,
          matchedProductIds: new Set([price.productId]),
          totalEstimated: price.price,
        });

        continue;
      }

      if (!existing.matchedProductIds.has(price.productId)) {
        existing.matchedProductIds.add(price.productId);
        existing.totalEstimated += price.price;
      }
    }

    const bestSingleMarket =
      Array.from(singleMarketMap.values())
        .map((market) => ({
          marketId: market.marketId,
          marketName: market.marketName,
          matchedItemsCount: market.matchedProductIds.size,
          totalEstimated: Number(market.totalEstimated.toFixed(2)),
        }))
        .sort((a, b) => {
          if (b.matchedItemsCount !== a.matchedItemsCount) {
            return b.matchedItemsCount - a.matchedItemsCount;
          }

          return a.totalEstimated - b.totalEstimated;
        })[0] ?? null;

    const rawSavingsVsBestSingleMarket = bestSingleMarket
      ? Number((bestSingleMarket.totalEstimated - multiMarketTotal).toFixed(2))
      : null;

    const distanceValues = markets
      .map((market) => market.distanceKm)
      .filter((value): value is number => value !== null);

    const totalDistanceKm =
      distanceValues.length > 0
        ? Number(distanceValues.reduce((sum, value) => sum + value, 0).toFixed(2))
        : null;

    const averageDistanceKm =
      distanceValues.length > 0
        ? Number(
            (
              distanceValues.reduce((sum, value) => sum + value, 0) /
              distanceValues.length
            ).toFixed(2)
          )
        : null;

    /**
     * Penalty rules for MVP:
     * - each extra market after the first costs 2.00 in "effort"
     * - each km of average distance costs 0.20 in "effort"
     */
    const extraMarketsPenalty =
      markets.length > 1 ? Number(((markets.length - 1) * 2).toFixed(2)) : 0;

    const distancePenalty =
      averageDistanceKm !== null
        ? Number((averageDistanceKm * 0.2).toFixed(2))
        : 0;

    const totalPenalty = Number(
      (extraMarketsPenalty + distancePenalty).toFixed(2)
    );

    const adjustedSavings =
      rawSavingsVsBestSingleMarket !== null
        ? Number((rawSavingsVsBestSingleMarket - totalPenalty).toFixed(2))
        : null;

    /**
     * Decide if splitting is worth it.
     * MVP rule:
     * - must save more than zero after penalties
     * - and must actually use more than one market
     */
    const isWorthSplitting =
      markets.length > 1 &&
      adjustedSavings !== null &&
      adjustedSavings > 0;

    /**
     * Recommendation score for the multi-market plan itself.
     * Higher adjusted savings means a better plan.
     */
    const recommendationScore =
      adjustedSavings !== null
        ? Number(Math.max(adjustedSavings, 0).toFixed(2))
        : 0;

    return {
      shoppingList: {
        id: shoppingList.id,
        name: shoppingList.name,
        totalItemsCount: shoppingList.items.length,
        productBackedItemsCount: productBackedItems.length,
      },
      bestSingleMarket,
      multiMarketPlan: {
        totalEstimated: multiMarketTotal,
        marketsUsedCount: markets.length,
        markets,
        distanceSummary: {
          totalDistanceKm,
          averageDistanceKm,
        },
        penalties: {
          extraMarketsPenalty,
          distancePenalty,
        },
        adjustedSavings,
        recommendationScore,
        isWorthSplitting,
      },
      savingsVsBestSingleMarket: rawSavingsVsBestSingleMarket,
    };
  }

  private calculateDistanceIfPossible(
    userLatitude?: number,
    userLongitude?: number,
    marketLatitude?: number | null,
    marketLongitude?: number | null
  ): number | null {
    if (
      userLatitude == null ||
      userLongitude == null ||
      marketLatitude == null ||
      marketLongitude == null
    ) {
      return null;
    }

    const distance = this.calculateHaversineDistance(
      userLatitude,
      userLongitude,
      marketLatitude,
      marketLongitude
    );

    return Number(distance.toFixed(2));
  }

  private calculateHaversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  }
}