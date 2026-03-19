/**
 * GetUserSummaryService
 *
 * Builds a basic dashboard summary for a user.
 * This summary supports optional date range filtering.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

interface DateRangeFilter {
  startDate?: Date;
  endDate?: Date;
}

export class GetUserSummaryService {
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

    const totalSpent = receipts.reduce(
      (sum, receipt) => sum + receipt.totalAmount,
      0
    );

    const totalReceipts = receipts.length;

    const totalItems = receipts.reduce(
      (sum, receipt) => sum + receipt.items.length,
      0
    );

    const marketUsageMap = new Map<
      string,
      { marketId: string; marketName: string; receiptsCount: number; totalSpent: number }
    >();

    for (const receipt of receipts) {
      const existing = marketUsageMap.get(receipt.marketId);

      if (!existing) {
        marketUsageMap.set(receipt.marketId, {
          marketId: receipt.marketId,
          marketName: receipt.market.name,
          receiptsCount: 1,
          totalSpent: receipt.totalAmount,
        });

        continue;
      }

      existing.receiptsCount += 1;
      existing.totalSpent += receipt.totalAmount;
    }

    const topMarkets = Array.from(marketUsageMap.values())
      .map((market) => ({
        ...market,
        totalSpent: Number(market.totalSpent.toFixed(2)),
      }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    const averageReceiptAmount =
      totalReceipts > 0 ? Number((totalSpent / totalReceipts).toFixed(2)) : 0;

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
      summary: {
        totalSpent: Number(totalSpent.toFixed(2)),
        totalReceipts,
        totalItems,
        averageReceiptAmount,
      },
      topMarkets,
    };
  }
}