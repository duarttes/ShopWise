/**
 * GetUserSummaryService
 *
 * Builds a basic dashboard summary for a user.
 * This summary is intended to support the first version of the ShopWise dashboard.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

export class GetUserSummaryService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async execute(userId: string) {
    const user = await this.analyticsRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const receipts = await this.analyticsRepository.findUserReceipts(userId);

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