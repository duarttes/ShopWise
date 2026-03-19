/**
 * Analytics routes.
 *
 * This file registers analytics and product intelligence endpoints.
 */

import { Router } from "express";
import { getProductLatestPricesController } from "../modules/analytics/controllers/get-product-latest-prices.controller";
import { getProductPriceHistoryController } from "../modules/analytics/controllers/get-product-price-history.controller";

const analyticsRoutes = Router();

analyticsRoutes.get(
  "/products/:productId/price-history",
  getProductPriceHistoryController
);

analyticsRoutes.get(
  "/products/:productId/latest-prices",
  getProductLatestPricesController
);

export default analyticsRoutes;