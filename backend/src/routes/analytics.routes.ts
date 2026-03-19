/**
 * Analytics routes.
 *
 * This file registers analytics and product intelligence endpoints.
 */

import { Router } from "express";
import { getProductLatestPricesController } from "../modules/analytics/controllers/get-product-latest-prices.controller";
import { getProductPriceHistoryController } from "../modules/analytics/controllers/get-product-price-history.controller";
import { getUserMonthlySpendingController } from "../modules/analytics/controllers/get-user-monthly-spending.controller";
import { getUserMostExpensiveProductsController } from "../modules/analytics/controllers/get-user-most-expensive-products.controller";
import { getUserRecentReceiptsController } from "../modules/analytics/controllers/get-user-recent-receipts.controller";
import { getUserSpendingByCategoryController } from "../modules/analytics/controllers/get-user-spending-by-category.controller";
import { getUserSpendingByMarketController } from "../modules/analytics/controllers/get-user-spending-by-market.controller";
import { getUserSummaryController } from "../modules/analytics/controllers/get-user-summary.controller";
import { getUserTopProductsController } from "../modules/analytics/controllers/get-user-top-products.controller";
import { ensureAuthenticated } from "../shared/middlewares/ensure-authenticated.middleware";

const analyticsRoutes = Router();

analyticsRoutes.get(
  "/products/:productId/price-history",
  getProductPriceHistoryController
);

analyticsRoutes.get(
  "/products/:productId/latest-prices",
  getProductLatestPricesController
);

analyticsRoutes.get(
  "/users/:userId/summary",
  ensureAuthenticated,
  getUserSummaryController
);

analyticsRoutes.get(
  "/users/:userId/spending-by-market",
  ensureAuthenticated,
  getUserSpendingByMarketController
);

analyticsRoutes.get(
  "/users/:userId/recent-receipts",
  ensureAuthenticated,
  getUserRecentReceiptsController
);

analyticsRoutes.get(
  "/users/:userId/monthly-spending",
  ensureAuthenticated,
  getUserMonthlySpendingController
);

analyticsRoutes.get(
  "/users/:userId/spending-by-category",
  ensureAuthenticated,
  getUserSpendingByCategoryController
);

analyticsRoutes.get(
  "/users/:userId/top-products",
  ensureAuthenticated,
  getUserTopProductsController
);

analyticsRoutes.get(
  "/users/:userId/most-expensive-products",
  ensureAuthenticated,
  getUserMostExpensiveProductsController
);

export default analyticsRoutes;