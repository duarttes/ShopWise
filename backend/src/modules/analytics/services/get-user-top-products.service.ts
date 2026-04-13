/**
 * GetUserTopProductsService
 *
 * Returns the most frequently purchased products for a user.
 * Supports optional date range filtering.
 *
 * MVP note:
 * only receipt items linked to products are considered.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

interface DateRangeFilter {
  startDate?: Date;
  endDate?: Date;
}

export class GetUserTopProductsService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async execute(userId: string, filters?: DateRangeFilter) {
    const user = await this.analyticsRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const receiptItems = await this.analyticsRepository.findUserReceiptItems(
      userId,
      filters
    );

    const productsMap = new Map<
      string,
      {
        productId: string;
        productName: string;
        normalizedName: string;
        category: string | null;
        brand: string | null;
        purchaseCount: number;
        totalQuantity: number;
        totalSpent: number;
      }
    >();

    for (const item of receiptItems) {
      if (!item.product) {
        continue;
      }

      const quantity = item.quantity ?? 1;
      const itemTotal =
        item.totalPrice ?? item.unitPrice * quantity;

      const existing = productsMap.get(item.product.id);

      if (!existing) {
        productsMap.set(item.product.id, {
          productId: item.product.id,
          productName: item.product.name,
          normalizedName: item.product.normalizedName,
          category: item.product.category ?? null,
          brand: item.product.brand ?? null,
          purchaseCount: 1,
          totalQuantity: quantity,
          totalSpent: itemTotal,
        });

        continue;
      }

      existing.purchaseCount += 1;
      existing.totalQuantity += quantity;
      existing.totalSpent += itemTotal;
    }

    const products = Array.from(productsMap.values())
      .map((product) => ({
        ...product,
        totalQuantity: Number(product.totalQuantity.toFixed(2)),
        totalSpent: Number(product.totalSpent.toFixed(2)),
      }))
      .sort((a, b) => {
        if (b.purchaseCount !== a.purchaseCount) {
          return b.purchaseCount - a.purchaseCount;
        }

        return b.totalSpent - a.totalSpent;
      });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      filters: {
        startDate: filters?.startDate ?? null,
        endDate: filters?.endDate ?? null,
      },
      totalProducts: products.length,
      products,
    };
  }
}