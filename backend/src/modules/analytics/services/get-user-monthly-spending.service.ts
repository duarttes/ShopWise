/**
 * GetUserMonthlySpendingService
 *
 * Aggregates user spending by month.
 * Supports optional date range filtering.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

interface DateRangeFilter {
  startDate?: Date;
  endDate?: Date;
}

export class GetUserMonthlySpendingService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async execute(userId: string, filters?: DateRangeFilter) {
    const user = await this.analyticsRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const receipts = await this.analyticsRepository.findUserReceipts(
      userId,
      filters
    );

    const monthlyMap = new Map<
      string,
      {
        year: number;
        month: number;
        label: string;
        totalSpent: number;
        receiptsCount: number;
      }
    >();

    for (const receipt of receipts) {
      const year = receipt.purchasedAt.getUTCFullYear();
      const month = receipt.purchasedAt.getUTCMonth() + 1;
      const key = `${year}-${String(month).padStart(2, "0")}`;

      const existing = monthlyMap.get(key);

      if (!existing) {
        monthlyMap.set(key, {
          year,
          month,
          label: key,
          totalSpent: receipt.totalAmount,
          receiptsCount: 1,
        });

        continue;
      }

      existing.totalSpent += receipt.totalAmount;
      existing.receiptsCount += 1;
    }

    const months = Array.from(monthlyMap.values())
      .map((entry) => ({
        ...entry,
        totalSpent: Number(entry.totalSpent.toFixed(2)),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

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
      totalMonths: months.length,
      months,
    };
  }
}