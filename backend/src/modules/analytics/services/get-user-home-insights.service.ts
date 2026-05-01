/**
 * GetUserHomeInsightsService
 *
 * Builds a compact home dashboard with:
 * - current month spending summary
 * - most used market in the month
 * - lowest recent prices for products the user actually bought
 * - biggest recent price increases for those products
 */

import { AppError } from "../../../shared/errors/app-error";
import { AnalyticsRepository } from "../repositories/analytics.repository";

type LatestProductPriceSnapshot = {
  productId: string;
  productName: string;
  brand: string | null;
  category: string | null;
  marketId: string;
  marketName: string;
  price: number;
  observedAt: Date;
};

type ProductPriceIncreaseSnapshot = LatestProductPriceSnapshot & {
  previousPrice: number;
  previousObservedAt: Date;
  increaseAmount: number;
  increasePercentage: number;
};

export class GetUserHomeInsightsService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async execute(userId: string) {
    const user = await this.analyticsRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { startOfMonth, endOfMonth } = this.getCurrentMonthRange();

    const monthReceipts = await this.analyticsRepository.findUserReceipts(userId, {
      startDate: startOfMonth,
      endDate: endOfMonth,
    });

    const totalSpent = Number(
      monthReceipts.reduce((sum, r) => sum + r.totalAmount, 0).toFixed(2)
    );
    const receiptsCount = monthReceipts.length;
    const marketsCount = new Set(monthReceipts.map((r) => r.marketId)).size;

    // Se não há dados no mês, usa histórico completo para insights
    const insightReceipts = monthReceipts.length > 0
      ? monthReceipts
      : await this.analyticsRepository.findUserReceipts(userId, {});

    const topMarket = this.getTopMarket(insightReceipts);

    const productIds = Array.from(
      new Set(
        insightReceipts.flatMap((receipt) =>
          receipt.items
            .filter((item) => Boolean(item.productId))
            .map((item) => item.productId as string)
        )
      )
    );

    const priceRecords = await this.analyticsRepository.findPriceRecordsForProducts(
      productIds
    );

    const groupedByProduct = new Map<string, typeof priceRecords>();

    for (const record of priceRecords) {
      const existing = groupedByProduct.get(record.productId) ?? [];
      existing.push(record);
      groupedByProduct.set(record.productId, existing);
    }

    const lowestRecentPrices: LatestProductPriceSnapshot[] = [];
    const biggestRecentIncreases: ProductPriceIncreaseSnapshot[] = [];

    for (const [productId, records] of groupedByProduct.entries()) {
      const latestRecord = records[0];
      if (!latestRecord) continue;

      lowestRecentPrices.push({
        productId,
        productName: latestRecord.product.name,
        brand: latestRecord.product.brand,
        category: latestRecord.product.category,
        marketId: latestRecord.market.id,
        marketName: latestRecord.market.displayName ?? latestRecord.market.name,
        price: latestRecord.price,
        observedAt: latestRecord.observedAt,
      });

      const previousRecord = records[1];
      if (!previousRecord) continue;

      const increaseAmount = Number(
        (latestRecord.price - previousRecord.price).toFixed(2)
      );
      if (increaseAmount <= 0) continue;

      const increasePercentage =
        previousRecord.price > 0
          ? Number(
              (((latestRecord.price - previousRecord.price) / previousRecord.price) * 100).toFixed(2)
            )
          : 0;

      biggestRecentIncreases.push({
        productId,
        productName: latestRecord.product.name,
        brand: latestRecord.product.brand,
        category: latestRecord.product.category,
        marketId: latestRecord.market.id,
        marketName: latestRecord.market.displayName ?? latestRecord.market.name,
        price: latestRecord.price,
        observedAt: latestRecord.observedAt,
        previousPrice: previousRecord.price,
        previousObservedAt: previousRecord.observedAt,
        increaseAmount,
        increasePercentage,
      });
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      month: {
        reference: `${startOfMonth.getUTCFullYear()}-${String(
          startOfMonth.getUTCMonth() + 1
        ).padStart(2, "0")}`,
        startDate: startOfMonth,
        endDate: endOfMonth,
        totalSpent,
        receiptsCount,
        marketsCount,
      },
      topMarket,
      priceHighlights: {
        lowestRecentPrices: lowestRecentPrices
          .sort((a, b) => a.price - b.price)
          .slice(0, 5),
        biggestRecentIncreases: biggestRecentIncreases
          .sort((a, b) => b.increaseAmount - a.increaseAmount)
          .slice(0, 5),
      },
    };
  }

  private getTopMarket(
    receipts: Array<{
      marketId: string;
      totalAmount: number;
      market: {
        id: string;
        name: string;
        displayName: string | null;
      };
    }>
  ) {
    if (receipts.length === 0) {
      return null;
    }

    const usage = new Map<
      string,
      {
        id: string;
        name: string;
        visits: number;
        totalSpent: number;
      }
    >();

    for (const receipt of receipts) {
      const existing = usage.get(receipt.marketId);

      if (!existing) {
        usage.set(receipt.marketId, {
          id: receipt.market.id,
          name: receipt.market.displayName ?? receipt.market.name,
          visits: 1,
          totalSpent: receipt.totalAmount,
        });
        continue;
      }

      existing.visits += 1;
      existing.totalSpent = Number(
        (existing.totalSpent + receipt.totalAmount).toFixed(2)
      );
    }

    return Array.from(usage.values()).sort((a, b) => {
      if (b.visits !== a.visits) {
        return b.visits - a.visits;
      }

      return b.totalSpent - a.totalSpent;
    })[0];
  }

  private getCurrentMonthRange() {
    const now = new Date();

    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0)
    );

    const endOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999)
    );

    return {
      startOfMonth,
      endOfMonth,
    };
  }
}