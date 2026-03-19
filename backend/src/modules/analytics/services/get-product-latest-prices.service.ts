/**
 * GetProductLatestPricesService
 *
 * Returns the latest known price for a product in each market.
 * The response is sorted by lowest price first.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

export class GetProductLatestPricesService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async execute(productId: string) {
    const product = await this.analyticsRepository.findProductById(productId);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const latestPrices =
      await this.analyticsRepository.findLatestPricesByProduct(productId);

    return {
      product: {
        id: product.id,
        name: product.name,
        normalizedName: product.normalizedName,
        brand: product.brand,
        category: product.category,
        unit: product.unit,
      },
      totalMarkets: latestPrices.length,
      markets: latestPrices.map((record) => ({
        marketId: record.market.id,
        marketName: record.market.name,
        city: record.market.city,
        state: record.market.state,
        latitude: record.market.latitude,
        longitude: record.market.longitude,
        latestPrice: record.price,
        observedAt: record.observedAt,
      })),
    };
  }
}