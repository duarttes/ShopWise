/**
 * GetProductPriceHistoryService
 *
 * Returns the full observed price history for a specific product.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

export class GetProductPriceHistoryService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async execute(productId: string) {
    const product = await this.analyticsRepository.findProductById(productId);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const priceHistory =
      await this.analyticsRepository.findProductPriceHistory(productId);

    return {
      product: {
        id: product.id,
        name: product.name,
        normalizedName: product.normalizedName,
        brand: product.brand,
        category: product.category,
        unit: product.unit,
      },
      totalRecords: priceHistory.length,
      records: priceHistory.map((record) => ({
        id: record.id,
        price: record.price,
        observedAt: record.observedAt,
        market: {
          id: record.market.id,
          name: record.market.displayName ?? record.market.name,
          city: record.market.city,
          state: record.market.state,
        },
        receiptItem: record.receiptItem
          ? {
              id: record.receiptItem.id,
              nameRaw: record.receiptItem.nameRaw,
              unit: record.receiptItem.unit,
              quantity: record.receiptItem.quantity,
              unitPrice: record.receiptItem.unitPrice,
              totalPrice: record.receiptItem.totalPrice,
            }
          : null,
      })),
    };
  }
}