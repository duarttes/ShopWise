/**
 * GetUserSpendingByCategoryService
 *
 * Aggregates spending by product category using receipt items linked to products.
 * Supports optional date range filtering.
 *
 * MVP note:
 * only items with linked products and non-null categories are considered.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

interface DateRangeFilter {
  startDate?: Date;
  endDate?: Date;
}

export class GetUserSpendingByCategoryService {
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

    const categoryMap = new Map<
      string,
      {
        category: string;
        totalSpent: number;
        itemsCount: number;
      }
    >();

    for (const item of receiptItems) {
      const category = item.product?.category;

      if (!category) {
        continue;
      }

      const itemTotal =
        item.totalPrice ??
        (item.quantity ? item.unitPrice * item.quantity : item.unitPrice);

      const existing = categoryMap.get(category);

      if (!existing) {
        categoryMap.set(category, {
          category,
          totalSpent: itemTotal,
          itemsCount: 1,
        });

        continue;
      }

      existing.totalSpent += itemTotal;
      existing.itemsCount += 1;
    }

    const categories = Array.from(categoryMap.values())
      .map((entry) => ({
        ...entry,
        totalSpent: Number(entry.totalSpent.toFixed(2)),
      }))
      .sort((a, b) => b.totalSpent - a.totalSpent);

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
      totalCategories: categories.length,
      categories,
    };
  }
}