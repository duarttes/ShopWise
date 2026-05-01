import { describe, expect, it } from "vitest";
import { GetProductMarketComparisonService } from "../../src/modules/products/services/get-product-market-comparison.service";

describe("GetProductMarketComparisonService", () => {
  it("should rank markets by latest observed price", async () => {
    const repository = {
      findMarketComparisonByProductId: async () => ({
        id: "product-1",
        name: "Arroz 5kg",
        normalizedName: "arroz 5kg",
        brand: "CAMIL",
        category: "Groceries",
        unit: "UN",
        priceRecords: [
          {
            id: "r1",
            price: 32.9,
            observedAt: new Date("2026-04-10T10:00:00.000Z"),
            market: {
              id: "market-1",
              name: "Atacadão",
              displayName: "Atacadão",
              city: "São Paulo",
              state: "SP",
            },
          },
          {
            id: "r2",
            price: 34.5,
            observedAt: new Date("2026-04-08T10:00:00.000Z"),
            market: {
              id: "market-1",
              name: "Atacadão",
              displayName: "Atacadão",
              city: "São Paulo",
              state: "SP",
            },
          },
          {
            id: "r3",
            price: 31.4,
            observedAt: new Date("2026-04-09T10:00:00.000Z"),
            market: {
              id: "market-2",
              name: "Assaí",
              displayName: "Assaí",
              city: "São Paulo",
              state: "SP",
            },
          },
        ],
      }),
    };

    const service = new GetProductMarketComparisonService(
      repository as never
    );

    const result = await service.execute("product-1");

    expect(result.summary.marketsCount).toBe(2);
    expect(result.summary.bestMarket?.name).toBe("Assaí");
    expect(result.summary.bestMarket?.latestPrice).toBe(31.4);
    expect(result.summary.worstMarket?.name).toBe("Atacadão");
    expect(result.summary.worstMarket?.latestPrice).toBe(32.9);
    expect(result.summary.priceSpread).toBe(1.5);

    expect(result.markets[0]).toMatchObject({
      rank: 1,
      latestPrice: 31.4,
      market: {
        name: "Assaí",
      },
    });

    expect(result.markets[1]).toMatchObject({
      rank: 2,
      latestPrice: 32.9,
      market: {
        name: "Atacadão",
      },
    });
  });

  it("should return an empty comparison when the product has no price records", async () => {
    const repository = {
      findMarketComparisonByProductId: async () => ({
        id: "product-1",
        name: "Feijão",
        normalizedName: "feijao",
        brand: null,
        category: null,
        unit: null,
        priceRecords: [],
      }),
    };

    const service = new GetProductMarketComparisonService(
      repository as never
    );

    const result = await service.execute("product-1");

    expect(result.summary.marketsCount).toBe(0);
    expect(result.summary.bestMarket).toBeNull();
    expect(result.markets).toEqual([]);
  });
});