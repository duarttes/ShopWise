/**
 * GetShoppingListRecommendationService
 *
 * Calculates shopping list recommendations by comparing:
 * - item coverage
 * - estimated total price
 * - distance from user (query OR saved location)
 *
 * This service returns:
 * - closest market
 * - cheapest market
 * - best value market
 * - ranked market breakdown
 *
 * Strategy resolution priority:
 * 1. query param
 * 2. user preference
 * 3. default = balanced
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
    priceUpdatedAt: Date;
  }>;
  recommendationScore: number;
  oldestPriceUpdatedAt: Date | null;
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

    /**
     * Resolve strategy safely (prevents invalid string issues)
     */
    const strategy = this.resolveStrategy(
      params?.strategy,
      shoppingList.user?.recommendationStrategy
    );

    /**
     * Resolve effective user location
     * Priority:
     * 1. query params
     * 2. saved user location
     */
    const effectiveUserLatitude =
      params?.userLatitude ?? shoppingList.user?.homeLatitude ?? undefined;

    const effectiveUserLongitude =
      params?.userLongitude ?? shoppingList.user?.homeLongitude ?? undefined;

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

    /**
     * Group prices by market
     */
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

      if (matchedShoppingListItems.length === 0) continue;

      const mappedItems = matchedShoppingListItems.map((item) => ({
        shoppingListItemId: item.id,
        shoppingListItemName: item.name,
        productId: priceRecord.product.id,
        productName: priceRecord.product.name,
        price: priceRecord.price,
        priceUpdatedAt: priceRecord.observedAt,
      }));

      if (!existing) {
        marketMap.set(priceRecord.marketId, {
          marketId: priceRecord.marketId,
          marketName:
            priceRecord.market.displayName ?? priceRecord.market.name,
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
        effectiveUserLatitude,
        effectiveUserLongitude,
        market.latitude,
        market.longitude
      );

      // Pega a data mais antiga entre os preços — indica o menos atualizado
      const dates = market.matchedItems.map((i) => new Date(i.priceUpdatedAt));
      const oldestPriceUpdatedAt = dates.length
        ? new Date(Math.min(...dates.map((d) => d.getTime())))
        : null;

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
        oldestPriceUpdatedAt,
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

    /**
     * Apply ranking score
     */
    marketBreakdown = this.applyRecommendationScore(
      marketBreakdown,
      strategy
    );

    marketBreakdown.sort(
      (a, b) => b.recommendationScore - a.recommendationScore
    );

    return {
      shoppingList: {
        id: shoppingList.id,
        name: shoppingList.name,
        totalItemsCount: shoppingList.items.length,
        productBackedItemsCount: productBackedItems.length,
      },
      strategy,
      closestMarket: this.findClosestMarket(marketBreakdown),
      cheapestMarket: this.findCheapestMarket(marketBreakdown),
      bestValueMarket: marketBreakdown[0] ?? null,
      marketBreakdown,
    };
  }

  /**
   * Ensures valid strategy (avoids TS + runtime issues)
   */
  private resolveStrategy(
    queryStrategy?: string,
    userStrategy?: string | null
  ): "balanced" | "cheapest" | "closest" {
    const valid = ["balanced", "cheapest", "closest"] as const;

    if (queryStrategy && valid.includes(queryStrategy as any)) {
      return queryStrategy as any;
    }

    if (userStrategy && valid.includes(userStrategy as any)) {
      return userStrategy as any;
    }

    return "balanced";
  }

  private applyRecommendationScore(
    entries: MarketRecommendationEntry[],
    strategy: "balanced" | "cheapest" | "closest"
  ) {
    const weights = this.getStrategyWeights(strategy);

    const maxPrice = Math.max(...entries.map((e) => e.estimatedTotal));
    const minPrice = Math.min(...entries.map((e) => e.estimatedTotal));

    const distances = entries
      .map((e) => e.distanceKm)
      .filter((d): d is number => d !== null);

    const maxDistance = distances.length ? Math.max(...distances) : null;
    const minDistance = distances.length ? Math.min(...distances) : null;

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
            : 1 -
              (entry.distanceKm - minDistance) /
                (maxDistance - minDistance);
      }

      const score =
        coverageScore * weights.coverage +
        priceScore * weights.price +
        distanceScore * weights.distance;

      return {
        ...entry,
        recommendationScore: Number(score.toFixed(4)),
      };
    });
  }

  private getStrategyWeights(strategy: "balanced" | "cheapest" | "closest") {
    switch (strategy) {
      case "cheapest":
        return { coverage: 0.35, price: 0.5, distance: 0.15 };
      case "closest":
        return { coverage: 0.35, price: 0.15, distance: 0.5 };
      default:
        return { coverage: 0.5, price: 0.35, distance: 0.15 };
    }
  }

  private findClosestMarket(entries: MarketRecommendationEntry[]) {
    return entries
      .filter((e) => e.distanceKm !== null)
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))[0] ?? null;
  }

  private findCheapestMarket(entries: MarketRecommendationEntry[]) {
    return [...entries].sort((a, b) => a.estimatedTotal - b.estimatedTotal)[0];
  }

  private calculateDistanceIfPossible(
    lat1?: number,
    lon1?: number,
    lat2?: number | null,
    lon2?: number | null
  ): number | null {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Number((R * c).toFixed(2));
  }
}