/**
 * Analytics routes.
 *
 * This file registers analytics and product intelligence endpoints.
 */

import { Router } from "express";
import { getProductLatestPricesController } from "../modules/analytics/controllers/get-product-latest-prices.controller";
import { getProductPriceHistoryController } from "../modules/analytics/controllers/get-product-price-history.controller";
import { getUserRecentReceiptsController } from "../modules/analytics/controllers/get-user-recent-receipts.controller";
import { getUserSpendingByMarketController } from "../modules/analytics/controllers/get-user-spending-by-market.controller";
import { getUserSummaryController } from "../modules/analytics/controllers/get-user-summary.controller";

const analyticsRoutes = Router();

analyticsRoutes.get(
  "/products/:productId/price-history",
  getProductPriceHistoryController
);

analyticsRoutes.get(
  "/products/:productId/latest-prices",
  getProductLatestPricesController
);

analyticsRoutes.get("/users/:userId/summary", getUserSummaryController);
analyticsRoutes.get(
  "/users/:userId/spending-by-market",
  getUserSpendingByMarketController
);
analyticsRoutes.get(
  "/users/:userId/recent-receipts",
  getUserRecentReceiptsController
);

export default analyticsRoutes;