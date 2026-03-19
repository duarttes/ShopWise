/**
 * GetUserRecentReceiptsService
 *
 * Returns the most recent receipts created by a user.
 * Supports optional date range filtering and custom limits.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

interface DateRangeFilter {
  startDate?: Date;
  endDate?: Date;
}

export class GetUserRecentReceiptsService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async execute(userId: string, limit = 10, filters?: DateRangeFilter) {
    const user = await this.analyticsRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const safeLimit = limit < 1 ? 10 : Math.min(limit, 50);

    const receipts = await this.analyticsRepository.findRecentUserReceipts(
      userId,
      safeLimit,
      filters
    );

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
      totalReceipts: receipts.length,
      receipts: receipts.map((receipt) => ({
        id: receipt.id,
        totalAmount: receipt.totalAmount,
        purchasedAt: receipt.purchasedAt,
        sourceType: receipt.sourceType,
        market: {
          id: receipt.market.id,
          name: receipt.market.name,
          city: receipt.market.city,
          state: receipt.market.state,
        },
        itemsCount: receipt.items.length,
      })),
    };
  }
}