/**
 * GetShoppingListRecommendationService
 *
 * Calculates shopping list recommendations by comparing:
 * - item coverage
 * - estimated total price
 * - distance from user (when available)
 *
 * This service returns:
 * - closest market
 * - cheapest market
 * - best value market
 * - ranked market breakdown
 *
 * Ranking strategies:
 * - balanced: coverage + price + distance
 * - cheapest: heavily prioritizes lower price
 * - closest: heavily prioritizes shorter distance
 */

import { AppError } from "../../../shared/errors/app-error";
import { RecommendationsRepository } from "../repositories/recommendations.repository";

interface RecommendationParams {
  userLatitude?: number;
  userLongitude?: number;
  strategy?: "balanced" | "cheapest" | "closest";
}

interface MarketRecommendationEntry {
  marketId: string;
  marketName: string;
  estimatedTotal: number;
  matchedItemsCount: number;
  totalItemsCount: number;
  coveragePercentage: number;
  missingItemsCount: number;
  distanceKm: number | null;
  matchedItems: Array<{
    shoppingListItemId: string;
    shoppingListItemName: string;
    productId: string;
    productName: string;
    price: number;
  }>;
  recommendationScore: number;
}

export class GetShoppingListRecommendationService {
  constructor(
    private recommendationsRepository: RecommendationsRepository
  ) {}

  async execute(
    shoppingListId: string,
    params?: RecommendationParams
  ) {
    const shoppingList =
      await this.recommendationsRepository.findShoppingListById(shoppingListId);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    if (!shoppingList.items || shoppingList.items.length === 0) {
      throw new AppError("Shopping list has no items", 400);
    }

    const strategy = params?.strategy ?? "balanced";

    /**
     * Only items linked to products can participate in recommendation.
     */
    const productBackedItems = shoppingList.items.filter(
      (item) => Boolean(item.productId)
    );

    if (productBackedItems.length === 0) {
      throw new AppError(
        "Shopping list has no items linked to products",
        400
      );
    }

    const productsLatestPrices =
      await this.recommendationsRepository.findLatestPricesForProducts(
        productBackedItems.map((item) => item.productId!)
      );

    const marketMap = new Map<
      string,
      {
        marketId: string;
        marketName: string;
        latitude: number | null;
        longitude: number | null;
        matchedItems: MarketRecommendationEntry["matchedItems"];
      }
    >();

    for (const priceRecord of productsLatestPrices) {
      const existing = marketMap.get(priceRecord.marketId);

      const matchedShoppingListItems = productBackedItems.filter(
        (item) => item.productId === priceRecord.productId
      );

      if (matchedShoppingListItems.length === 0) {
        continue;
      }

      const mappedItems = matchedShoppingListItems.map((item) => ({
        shoppingListItemId: item.id,
        shoppingListItemName: item.name,
        productId: priceRecord.product.id,
        productName: priceRecord.product.name,
        price: priceRecord.price,
      }));

      if (!existing) {
        marketMap.set(priceRecord.marketId, {
          marketId: priceRecord.marketId,
          marketName: priceRecord.market.displayName ?? priceRecord.market.name,
          latitude: priceRecord.market.latitude,
          longitude: priceRecord.market.longitude,
          matchedItems: mappedItems,
        });

        continue;
      }

      const existingItemIds = new Set(
        existing.matchedItems.map((item) => item.shoppingListItemId)
      );

      for (const item of mappedItems) {
        if (!existingItemIds.has(item.shoppingListItemId)) {
          existing.matchedItems.push(item);
        }
      }
    }

    const totalItemsCount = productBackedItems.length;

    let marketBreakdown: MarketRecommendationEntry[] = Array.from(
      marketMap.values()
    ).map((market) => {
      const estimatedTotal = market.matchedItems.reduce(
        (sum, item) => sum + item.price,
        0
      );

      const matchedItemsCount = market.matchedItems.length;
      const missingItemsCount = totalItemsCount - matchedItemsCount;
      const coveragePercentage =
        totalItemsCount > 0
          ? Number(((matchedItemsCount / totalItemsCount) * 100).toFixed(2))
          : 0;

      const distanceKm = this.calculateDistanceIfPossible(
        params?.userLatitude,
        params?.userLongitude,
        market.latitude,
        market.longitude
      );

      return {
        marketId: market.marketId,
        marketName: market.marketName,
        estimatedTotal: Number(estimatedTotal.toFixed(2)),
        matchedItemsCount,
        totalItemsCount,
        coveragePercentage,
        missingItemsCount,
        distanceKm,
        matchedItems: market.matchedItems,
        recommendationScore: 0,
      };
    });

    if (marketBreakdown.length === 0) {
      return {
        shoppingList: {
          id: shoppingList.id,
          name: shoppingList.name,
          totalItemsCount: shoppingList.items.length,
          productBackedItemsCount: productBackedItems.length,
        },
        strategy,
        closestMarket: null,
        cheapestMarket: null,
        bestValueMarket: null,
        marketBreakdown: [],
      };
    }

    marketBreakdown = this.applyRecommendationScore(marketBreakdown, strategy);
    marketBreakdown.sort((a, b) => b.recommendationScore - a.recommendationScore);

    const closestMarket = this.findClosestMarket(marketBreakdown);
    const cheapestMarket = this.findCheapestMarket(marketBreakdown);
    const bestValueMarket = marketBreakdown[0] ?? null;

    return {
      shoppingList: {
        id: shoppingList.id,
        name: shoppingList.name,
        totalItemsCount: shoppingList.items.length,
        productBackedItemsCount: productBackedItems.length,
      },
      strategy,
      closestMarket,
      cheapestMarket,
      bestValueMarket,
      marketBreakdown,
    };
  }

  private applyRecommendationScore(
    entries: MarketRecommendationEntry[],
    strategy: "balanced" | "cheapest" | "closest"
  ): MarketRecommendationEntry[] {
    const maxPrice = Math.max(...entries.map((entry) => entry.estimatedTotal));
    const minPrice = Math.min(...entries.map((entry) => entry.estimatedTotal));

    const validDistances = entries
      .map((entry) => entry.distanceKm)
      .filter((distance): distance is number => distance !== null);

    const maxDistance =
      validDistances.length > 0 ? Math.max(...validDistances) : null;
    const minDistance =
      validDistances.length > 0 ? Math.min(...validDistances) : null;

    const weights = this.getStrategyWeights(strategy);

    return entries.map((entry) => {
      const coverageScore = entry.coveragePercentage / 100;

      const priceScore =
        maxPrice === minPrice
          ? 1
          : 1 - (entry.estimatedTotal - minPrice) / (maxPrice - minPrice);

      let distanceScore = 0.5;

      if (
        entry.distanceKm !== null &&
        maxDistance !== null &&
        minDistance !== null
      ) {
        distanceScore =
          maxDistance === minDistance
            ? 1
            : 1 - (entry.distanceKm - minDistance) / (maxDistance - minDistance);
      }

      const recommendationScore =
        coverageScore * weights.coverage +
        priceScore * weights.price +
        distanceScore * weights.distance;

      return {
        ...entry,
        recommendationScore: Number(recommendationScore.toFixed(4)),
      };
    });
  }

  private getStrategyWeights(strategy: "balanced" | "cheapest" | "closest") {
    switch (strategy) {
      case "cheapest":
        return {
          coverage: 0.35,
          price: 0.5,
          distance: 0.15,
        };

      case "closest":
        return {
          coverage: 0.35,
          price: 0.15,
          distance: 0.5,
        };

      case "balanced":
      default:
        return {
          coverage: 0.5,
          price: 0.35,
          distance: 0.15,
        };
    }
  }

  private findClosestMarket(entries: MarketRecommendationEntry[]) {
    const withDistance = entries.filter(
      (entry) => entry.distanceKm !== null
    );

    if (withDistance.length === 0) {
      return null;
    }

    return [...withDistance].sort(
      (a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity)
    )[0];
  }

  private findCheapestMarket(entries: MarketRecommendationEntry[]) {
    if (entries.length === 0) {
      return null;
    }

    return [...entries].sort((a, b) => a.estimatedTotal - b.estimatedTotal)[0];
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