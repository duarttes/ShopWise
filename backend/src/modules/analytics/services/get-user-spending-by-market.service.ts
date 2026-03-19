/**
 * GetUserSpendingByMarketService
 *
 * Aggregates user spending grouped by market.
 * This endpoint is useful for dashboard charts and user spending insights.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

export class GetUserSpendingByMarketService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async execute(userId: string) {
    const user = await this.analyticsRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const receipts = await this.analyticsRepository.findUserReceipts(userId);

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
          marketName: receipt.market.name,
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
      totalMarkets: markets.length,
      markets,
    };
  }
}