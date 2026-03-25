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
 */

import { AppError } from "../../../shared/errors/app-error";
import { RecommendationsRepository } from "../repositories/recommendations.repository";

export class GetMultiMarketRecommendationService {
  constructor(
    private recommendationsRepository: RecommendationsRepository
  ) {}

  async execute(shoppingListId: string) {
    const shoppingList =
      await this.recommendationsRepository.findShoppingListById(shoppingListId);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    if (!shoppingList.items || shoppingList.items.length === 0) {
      throw new AppError("Shopping list has no items", 400);
    }

    const productBackedItems = shoppingList.items.filter(
      (item) => Boolean(item.productId)
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
        },
        savingsVsBestSingleMarket: null,
      };
    }

    /**
     * Cheapest market per shopping list item
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
        price: cheapest.price,
      });
    }

    const groupedByMarket = new Map<
      string,
      {
        marketId: string;
        marketName: string;
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
      .map((market) => ({
        ...market,
        totalEstimated: Number(market.totalEstimated.toFixed(2)),
      }))
      .sort((a, b) => b.items.length - a.items.length);

    const multiMarketTotal = Number(
      markets.reduce((sum, market) => sum + market.totalEstimated, 0).toFixed(2)
    );

    /**
     * Reuse single-market recommendation to compare savings
     */
    const singleMarketRecommendation =
      await this.recommendationsRepository.findLatestPricesForProducts(
        productBackedItems.map((item) => item.productId!)
      );

    const singleMarketMap = new Map<
      string,
      {
        marketId: string;
        marketName: string;
        matchedItemsCount: number;
        totalEstimated: number;
      }
    >();

    for (const price of singleMarketRecommendation) {
      const matchedItemsCount = productBackedItems.filter(
        (item) => item.productId === price.productId
      ).length;

      const existing = singleMarketMap.get(price.marketId);

      if (!existing) {
        singleMarketMap.set(price.marketId, {
          marketId: price.marketId,
          marketName: price.market.displayName ?? price.market.name,
          matchedItemsCount,
          totalEstimated: price.price,
        });

        continue;
      }

      existing.matchedItemsCount += matchedItemsCount;
      existing.totalEstimated += price.price;
    }

    const bestSingleMarket = Array.from(singleMarketMap.values())
      .map((market) => ({
        ...market,
        totalEstimated: Number(market.totalEstimated.toFixed(2)),
      }))
      .sort((a, b) => {
        if (b.matchedItemsCount !== a.matchedItemsCount) {
          return b.matchedItemsCount - a.matchedItemsCount;
        }

        return a.totalEstimated - b.totalEstimated;
      })[0] ?? null;

    const savingsVsBestSingleMarket = bestSingleMarket
      ? Number((bestSingleMarket.totalEstimated - multiMarketTotal).toFixed(2))
      : null;

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
      },
      savingsVsBestSingleMarket,
    };
  }
}