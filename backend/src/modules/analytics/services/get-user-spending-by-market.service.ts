/**
 * GetUserSpendingByMarketService
 *
 * Aggregates user spending grouped by market.
 * Supports optional date range filtering.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

interface DateRangeFilter {
  startDate?: Date;
  endDate?: Date;
}

export class GetUserSpendingByMarketService {
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

    const spendingMap = new Map<
      string,
      {
        marketId: string;
        marketName: string;
        city: string | null;
        state: string | null;
        totalSpent: number;
        receiptsCount: number;
      }
    >();

    for (const receipt of receipts) {
      const existing = spendingMap.get(receipt.marketId);

      if (!existing) {
        spendingMap.set(receipt.marketId, {
          marketId: receipt.marketId,
          marketName: receipt.market.displayName ?? receipt.market.name,
          city: receipt.market.city ?? null,
          state: receipt.market.state ?? null,
          totalSpent: receipt.totalAmount,
          receiptsCount: 1,
        });

        continue;
      }

      existing.totalSpent += receipt.totalAmount;
      existing.receiptsCount += 1;
    }

    const markets = Array.from(spendingMap.values())
      .map((market) => ({
        ...market,
        totalSpent: Number(market.totalSpent.toFixed(2)),
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
      totalMarkets: markets.length,
      markets,
    };
  }
}