/**
 * GetMultiMarketRecommendationService
 *
 * Builds a recommendation comparing:
 * - best single-market plan
 * - best two-market plan
 * - best three-market plan
 *
 * The service can be limited by maxMarketsToCompare.
 *
 * Suggested product strategy:
 * - free: up to 2 markets
 * - premium: up to 3 markets
 */

import { AppError } from "../../../shared/errors/app-error";
import { RecommendationsRepository } from "../repositories/recommendations.repository";

interface MultiMarketRecommendationParams {
  userLatitude?: number;
  userLongitude?: number;
  maxMarketsToCompare?: number;
}

interface PlannedItem {
  shoppingListItemId: string;
  shoppingListItemName: string;
  productId: string;
  productName: string;
  price: number;
}

interface PlannedMarket {
  marketId: string;
  marketName: string;
  latitude: number | null;
  longitude: number | null;
  distanceKm: number | null;
  totalEstimated: number;
  items: PlannedItem[];
}

interface PlanCandidate {
  planType: "single_market" | "two_market" | "three_market";
  marketsUsedCount: number;
  totalEstimated: number;
  matchedItemsCount: number;
  totalItemsCount: number;
  missingItemsCount: number;
  coveragePercentage: number;
  markets: PlannedMarket[];
  penalties: {
    extraMarketsPenalty: number;
    distancePenalty: number;
  };
  adjustedScore: number;
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

    const maxMarketsToCompare = this.resolveMaxMarkets(
      params?.maxMarketsToCompare
    );

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
        maxMarketsToCompare,
        bestSingleMarket: null,
        bestTwoMarketPlan: null,
        bestThreeMarketPlan: null,
        recommendedPlan: null,
      };
    }

    const uniqueMarkets = Array.from(
      new Map(
        latestPrices.map((price) => [
          price.marketId,
          {
            marketId: price.marketId,
            marketName: price.market.displayName ?? price.market.name,
            latitude: price.market.latitude,
            longitude: price.market.longitude,
          },
        ])
      ).values()
    );

    const bestSingleMarket = this.buildBestCombinationPlan(
      1,
      productBackedItems,
      latestPrices,
      uniqueMarkets,
      effectiveUserLatitude,
      effectiveUserLongitude
    );

    const bestTwoMarketPlan =
      maxMarketsToCompare >= 2
        ? this.buildBestCombinationPlan(
            2,
            productBackedItems,
            latestPrices,
            uniqueMarkets,
            effectiveUserLatitude,
            effectiveUserLongitude
          )
        : null;

    const bestThreeMarketPlan =
      maxMarketsToCompare >= 3
        ? this.buildBestCombinationPlan(
            3,
            productBackedItems,
            latestPrices,
            uniqueMarkets,
            effectiveUserLatitude,
            effectiveUserLongitude
          )
        : null;

    const recommendedPlan = this.chooseRecommendedPlan([
      bestSingleMarket,
      bestTwoMarketPlan,
      bestThreeMarketPlan,
    ]);

    return {
      shoppingList: {
        id: shoppingList.id,
        name: shoppingList.name,
        totalItemsCount: shoppingList.items.length,
        productBackedItemsCount: productBackedItems.length,
      },
      maxMarketsToCompare,
      bestSingleMarket,
      bestTwoMarketPlan,
      bestThreeMarketPlan,
      recommendedPlan,
    };
  }

  private resolveMaxMarkets(value?: number) {
    if (!value || Number.isNaN(value)) {
      return 2;
    }

    return Math.min(Math.max(value, 1), 3);
  }

  private buildBestCombinationPlan(
    combinationSize: 1 | 2 | 3,
    productBackedItems: Array<{
      id: string;
      name: string;
      productId: string | null;
    }>,
    latestPrices: Awaited<
      ReturnType<RecommendationsRepository["findLatestPricesForProducts"]>
    >,
    uniqueMarkets: Array<{
      marketId: string;
      marketName: string;
      latitude: number | null;
      longitude: number | null;
    }>,
    effectiveUserLatitude?: number,
    effectiveUserLongitude?: number
  ): PlanCandidate | null {
    const marketCombinations = this.generateCombinations(
      uniqueMarkets,
      combinationSize
    );

    const candidates = marketCombinations
      .map((marketsInCombination) => {
        const grouped = new Map<string, PlannedMarket>();

        for (const market of marketsInCombination) {
          grouped.set(market.marketId, {
            marketId: market.marketId,
            marketName: market.marketName,
            latitude: market.latitude,
            longitude: market.longitude,
            distanceKm: this.calculateDistanceIfPossible(
              effectiveUserLatitude,
              effectiveUserLongitude,
              market.latitude,
              market.longitude
            ),
            totalEstimated: 0,
            items: [],
          });
        }

        let matchedItemsCount = 0;

        for (const shoppingItem of productBackedItems) {
          const candidatesForItem = latestPrices
            .filter(
              (entry) =>
                entry.productId === shoppingItem.productId &&
                marketsInCombination.some(
                  (market) => market.marketId === entry.marketId
                )
            )
            .sort((a, b) => a.price - b.price);

          const chosen = candidatesForItem[0];

          if (!chosen) {
            continue;
          }

          matchedItemsCount += 1;

          const market = grouped.get(chosen.marketId);

          if (!market) {
            continue;
          }

          market.items.push({
            shoppingListItemId: shoppingItem.id,
            shoppingListItemName: shoppingItem.name,
            productId: chosen.product.id,
            productName: chosen.product.name,
            price: chosen.price,
          });

          market.totalEstimated = Number(
            (market.totalEstimated + chosen.price).toFixed(2)
          );
        }

        const usedMarkets = Array.from(grouped.values()).filter(
          (market) => market.items.length > 0
        );

        const totalEstimated = Number(
          usedMarkets
            .reduce((sum, market) => sum + market.totalEstimated, 0)
            .toFixed(2)
        );

        const totalItemsCount = productBackedItems.length;
        const missingItemsCount = totalItemsCount - matchedItemsCount;
        const coveragePercentage =
          totalItemsCount > 0
            ? Number(((matchedItemsCount / totalItemsCount) * 100).toFixed(2))
            : 0;

        const averageDistanceKm = this.calculateAverageDistance(usedMarkets);

        const penalties = this.calculatePenalties(
          usedMarkets.length,
          averageDistanceKm
        );

        const adjustedScore = this.calculatePlanScore({
          coveragePercentage,
          totalEstimated,
          penalties,
        });

        return {
          planType:
            combinationSize === 1
              ? "single_market"
              : combinationSize === 2
              ? "two_market"
              : "three_market",
          marketsUsedCount: usedMarkets.length,
          totalEstimated,
          matchedItemsCount,
          totalItemsCount,
          missingItemsCount,
          coveragePercentage,
          markets: usedMarkets,
          penalties,
          adjustedScore,
        } as PlanCandidate;
      })
      .sort((a, b) => {
        if (b.coveragePercentage !== a.coveragePercentage) {
          return b.coveragePercentage - a.coveragePercentage;
        }

        if (a.totalEstimated !== b.totalEstimated) {
          return a.totalEstimated - b.totalEstimated;
        }

        return b.adjustedScore - a.adjustedScore;
      });

    return candidates[0] ?? null;
  }

  private chooseRecommendedPlan(plans: Array<PlanCandidate | null>) {
    const validPlans = plans.filter(
      (plan): plan is PlanCandidate => plan !== null
    );

    if (validPlans.length === 0) {
      return null;
    }

    validPlans.sort((a, b) => {
      if (b.coveragePercentage !== a.coveragePercentage) {
        return b.coveragePercentage - a.coveragePercentage;
      }

      /**
       * Prefer better practical score, not just lower raw price.
       */
      if (b.adjustedScore !== a.adjustedScore) {
        return b.adjustedScore - a.adjustedScore;
      }

      return a.totalEstimated - b.totalEstimated;
    });

    const best = validPlans[0];
    const single = validPlans.find((plan) => plan.planType === "single_market");

    if (!single || best.planType === "single_market") {
      return best;
    }

    const rawSavingsVsSingleMarket = Number(
      (single.totalEstimated - best.totalEstimated).toFixed(2)
    );

    const totalPenalty = Number(
      (best.penalties.extraMarketsPenalty + best.penalties.distancePenalty).toFixed(2)
    );

    const adjustedSavingsVsSingleMarket = Number(
      (rawSavingsVsSingleMarket - totalPenalty).toFixed(2)
    );

    return {
      ...best,
      comparison: {
        rawSavingsVsSingleMarket,
        adjustedSavingsVsSingleMarket,
        totalPenalty,
        isWorthSplitting: adjustedSavingsVsSingleMarket > 0,
      },
    };
  }

  private calculateAverageDistance(markets: PlannedMarket[]) {
    const distanceValues = markets
      .map((market) => market.distanceKm)
      .filter((value): value is number => value !== null);

    if (distanceValues.length === 0) {
      return null;
    }

    return Number(
      (
        distanceValues.reduce((sum, value) => sum + value, 0) /
        distanceValues.length
      ).toFixed(2)
    );
  }

  private calculatePenalties(marketsUsedCount: number, averageDistanceKm: number | null) {
    /**
     * Stronger penalty as the number of markets increases.
     *
     * 1 market => 0
     * 2 markets => 2
     * 3 markets => 6
     */
    const extraMarketsPenalty =
      marketsUsedCount <= 1
        ? 0
        : marketsUsedCount === 2
        ? 2
        : 6;

    const distancePenalty =
      averageDistanceKm !== null
        ? Number((averageDistanceKm * 0.2).toFixed(2))
        : 0;

    return {
      extraMarketsPenalty: Number(extraMarketsPenalty.toFixed(2)),
      distancePenalty,
    };
  }

  private calculatePlanScore(plan: {
    coveragePercentage: number;
    totalEstimated: number;
    penalties: {
      extraMarketsPenalty: number;
      distancePenalty: number;
    };
  }) {
    const coverageScore = plan.coveragePercentage / 100;
    const penaltyScore =
      plan.penalties.extraMarketsPenalty + plan.penalties.distancePenalty;

    return Number((coverageScore * 100 - plan.totalEstimated - penaltyScore).toFixed(2));
  }

  private generateCombinations<T>(items: T[], size: number): T[][] {
    const results: T[][] = [];

    const backtrack = (start: number, current: T[]) => {
      if (current.length === size) {
        results.push([...current]);
        return;
      }

      for (let i = start; i < items.length; i += 1) {
        current.push(items[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    };

    backtrack(0, []);
    return results;
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