/**
 * GetProductPriceHistoryService
 *
 * Retrieves the full observed price history for a product
 * and computes summary metrics used by charts and comparisons.
 */

import { AppError } from "../../../shared/errors/app-error";
import { ProductsRepository } from "../repositories/products.repository";

export class GetProductPriceHistoryService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(productId: string) {
    const product = await this.productsRepository.findPriceHistoryByProductId(
      productId
    );

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const history = product.priceRecords.map((record) => ({
      id: record.id,
      price: record.price,
      observedAt: record.observedAt,
      market: {
        id: record.market.id,
        name: record.market.displayName ?? record.market.name,
        city: record.market.city,
        state: record.market.state,
      },
    }));

    if (history.length === 0) {
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
          latestPrice: null,
          lowestPrice: null,
          highestPrice: null,
          averagePrice: null,
          recordsCount: 0,
          marketsCount: 0,
        },
        history: [],
      };
    }

    const prices = history.map((entry) => entry.price);
    const latestEntry = history[history.length - 1];
    const lowestPrice = Math.min(...prices);
    const highestPrice = Math.max(...prices);
    const averagePrice =
      Math.round(
        (prices.reduce((total, current) => total + current, 0) / prices.length) *
          100
      ) / 100;

    const uniqueMarkets = new Set(history.map((entry) => entry.market.id));

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
        latestPrice: latestEntry.price,
        lowestPrice,
        highestPrice,
        averagePrice,
        recordsCount: history.length,
        marketsCount: uniqueMarkets.size,
      },
      history,
    };
  }
}