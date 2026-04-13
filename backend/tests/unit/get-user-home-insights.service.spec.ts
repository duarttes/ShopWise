import { describe, expect, it } from "vitest";
import { GetUserHomeInsightsService } from "../../src/modules/analytics/services/get-user-home-insights.service";

describe("GetUserHomeInsightsService", () => {
  it("should return zeroed month summary when the user has no receipts in the current month", async () => {
    const repository = {
      findUserById: async () => ({
        id: "user-1",
        name: "Matheus",
        email: "matheus@email.com",
      }),
      findUserReceipts: async () => [],
      findPriceRecordsForProducts: async () => [],
    };

    const service = new GetUserHomeInsightsService(repository as never);

    const result = await service.execute("user-1");

    expect(result.month.totalSpent).toBe(0);
    expect(result.month.receiptsCount).toBe(0);
    expect(result.month.marketsCount).toBe(0);
    expect(result.topMarket).toBeNull();
    expect(result.priceHighlights.lowestRecentPrices).toEqual([]);
    expect(result.priceHighlights.biggestRecentIncreases).toEqual([]);
  });

  it("should calculate top market and price highlights from the user's bought products", async () => {
    const repository = {
      findUserById: async () => ({
        id: "user-1",
        name: "Matheus",
        email: "matheus@email.com",
      }),
      findUserReceipts: async () => [
        {
          id: "receipt-1",
          marketId: "market-1",
          totalAmount: 40,
          market: {
            id: "market-1",
            name: "Assai",
            displayName: "Assaí",
          },
          items: [
            {
              id: "item-1",
              productId: "product-1",
            },
            {
              id: "item-2",
              productId: "product-2",
            },
          ],
        },
        {
          id: "receipt-2",
          marketId: "market-1",
          totalAmount: 20,
          market: {
            id: "market-1",
            name: "Assai",
            displayName: "Assaí",
          },
          items: [
            {
              id: "item-3",
              productId: "product-1",
            },
          ],
        },
        {
          id: "receipt-3",
          marketId: "market-2",
          totalAmount: 35,
          market: {
            id: "market-2",
            name: "Atacadao",
            displayName: "Atacadão",
          },
          items: [
            {
              id: "item-4",
              productId: "product-3",
            },
          ],
        },
      ],
      findPriceRecordsForProducts: async () => [
        {
          id: "pr-1",
          productId: "product-1",
          price: 10,
          observedAt: new Date("2026-04-10T10:00:00.000Z"),
          product: {
            id: "product-1",
            name: "Arroz 5kg",
            brand: "CAMIL",
            category: "Groceries",
          },
          market: {
            id: "market-1",
            name: "Assai",
            displayName: "Assaí",
          },
        },
        {
          id: "pr-2",
          productId: "product-1",
          price: 8,
          observedAt: new Date("2026-04-01T10:00:00.000Z"),
          product: {
            id: "product-1",
            name: "Arroz 5kg",
            brand: "CAMIL",
            category: "Groceries",
          },
          market: {
            id: "market-2",
            name: "Atacadao",
            displayName: "Atacadão",
          },
        },
        {
          id: "pr-3",
          productId: "product-2",
          price: 6.5,
          observedAt: new Date("2026-04-09T10:00:00.000Z"),
          product: {
            id: "product-2",
            name: "Feijão 1kg",
            brand: "KICALDO",
            category: "Groceries",
          },
          market: {
            id: "market-1",
            name: "Assai",
            displayName: "Assaí",
          },
        },
        {
          id: "pr-4",
          productId: "product-2",
          price: 7,
          observedAt: new Date("2026-03-25T10:00:00.000Z"),
          product: {
            id: "product-2",
            name: "Feijão 1kg",
            brand: "KICALDO",
            category: "Groceries",
          },
          market: {
            id: "market-2",
            name: "Atacadao",
            displayName: "Atacadão",
          },
        },
        {
          id: "pr-5",
          productId: "product-3",
          price: 4.2,
          observedAt: new Date("2026-04-08T10:00:00.000Z"),
          product: {
            id: "product-3",
            name: "Macarrão",
            brand: null,
            category: "Groceries",
          },
          market: {
            id: "market-2",
            name: "Atacadao",
            displayName: "Atacadão",
          },
        },
      ],
    };

    const service = new GetUserHomeInsightsService(repository as never);

    const result = await service.execute("user-1");

    expect(result.month.totalSpent).toBe(95);
    expect(result.month.receiptsCount).toBe(3);
    expect(result.month.marketsCount).toBe(2);

    expect(result.topMarket).toMatchObject({
      id: "market-1",
      name: "Assaí",
      visits: 2,
      totalSpent: 60,
    });

    expect(result.priceHighlights.lowestRecentPrices[0]).toMatchObject({
      productId: "product-3",
      price: 4.2,
      marketName: "Atacadão",
    });

    expect(result.priceHighlights.biggestRecentIncreases[0]).toMatchObject({
      productId: "product-1",
      price: 10,
      previousPrice: 8,
      increaseAmount: 2,
      increasePercentage: 25,
    });
  });
});