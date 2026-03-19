/**
 * GetUserRecentReceiptsService
 *
 * Returns the most recent receipts created by a user.
 * This endpoint is useful for recent activity sections in the dashboard.
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

export class GetUserRecentReceiptsService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async execute(userId: string) {
    const user = await this.analyticsRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const receipts = await this.analyticsRepository.findRecentUserReceipts(userId);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
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