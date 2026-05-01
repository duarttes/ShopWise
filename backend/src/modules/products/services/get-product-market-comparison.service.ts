/**
 * GetProductMarketComparisonService
 *
 * Retrieves the latest comparable market prices for a product
 * and returns a ranked market comparison summary.
 */

import { AppError } from "../../../shared/errors/app-error";
import { ProductsRepository } from "../repositories/products.repository";

type MarketSnapshot = {
  marketId: string;
  marketName: string;
  city: string | null;
  state: string | null;
  latestPrice: number;
  latestObservedAt: Date;
  lowestObservedPrice: number;
  highestObservedPrice: number;
  recordsCount: number;
};

export class GetProductMarketComparisonService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(productId: string) {
    const product =
      await this.productsRepository.findMarketComparisonByProductId(productId);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (product.priceRecords.length === 0) {
      return {
        product: {
          id: product.id,
          name: product.name,
          normalizedName: product.normalizedName,
          brand: product.brand,
          category: product.category,
          unit: product.unit,
        },
        summary: {
          marketsCount: 0,
          bestMarket: null,
          worstMarket: null,
          priceSpread: null,
          priceSpreadPercentage: null,
        },
        markets: [],
      };
    }

    const grouped = new Map<string, MarketSnapshot>();

    for (const record of product.priceRecords) {
      const marketId = record.market.id;
      const marketName = record.market.displayName ?? record.market.name;

      const existing = grouped.get(marketId);

      if (!existing) {
        grouped.set(marketId, {
          marketId,
          marketName,
          city: record.market.city,
          state: record.market.state,
          latestPrice: record.price,
          latestObservedAt: record.observedAt,
          lowestObservedPrice: record.price,
          highestObservedPrice: record.price,
          recordsCount: 1,
        });
        continue;
      }

      existing.lowestObservedPrice = Math.min(
        existing.lowestObservedPrice,
        record.price
      );
      existing.highestObservedPrice = Math.max(
        existing.highestObservedPrice,
        record.price
      );
      existing.recordsCount += 1;
    }

    const markets = Array.from(grouped.values())
      .sort((a, b) => a.latestPrice - b.latestPrice)
      .map((entry, index, array) => {
        const bestPrice = array[0].latestPrice;
        const differenceFromBest = Number(
          (entry.latestPrice - bestPrice).toFixed(2)
        );
        const differenceFromBestPercentage =
          bestPrice > 0
            ? Number((((entry.latestPrice - bestPrice) / bestPrice) * 100).toFixed(2))
            : 0;

        return {
          market: {
            id: entry.marketId,
            name: entry.marketName,
            city: entry.city,
            state: entry.state,
          },
          latestPrice: entry.latestPrice,
          latestObservedAt: entry.latestObservedAt,
          lowestObservedPrice: entry.lowestObservedPrice,
          highestObservedPrice: entry.highestObservedPrice,
          recordsCount: entry.recordsCount,
          rank: index + 1,
          differenceFromBest,
          differenceFromBestPercentage,
        };
      });

    const bestMarket = markets[0];
    const worstMarket = markets[markets.length - 1];
    const priceSpread = Number(
      (worstMarket.latestPrice - bestMarket.latestPrice).toFixed(2)
    );
    const priceSpreadPercentage =
      bestMarket.latestPrice > 0
        ? Number(((priceSpread / bestMarket.latestPrice) * 100).toFixed(2))
        : 0;

    return {
      product: {
        id: product.id,
        name: product.name,
        normalizedName: product.normalizedName,
        brand: product.brand,
        category: product.category,
        unit: product.unit,
      },
      summary: {
        marketsCount: markets.length,
        bestMarket: {
          id: bestMarket.market.id,
          name: bestMarket.market.name,
          latestPrice: bestMarket.latestPrice,
        },
        worstMarket: {
          id: worstMarket.market.id,
          name: worstMarket.market.name,
          latestPrice: worstMarket.latestPrice,
        },
        priceSpread,
        priceSpreadPercentage,
      },
      markets,
    };
  }
}