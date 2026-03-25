/**
 * Recommendations routes.
 */

import { Router } from "express";
import { getMultiMarketRecommendationController } from "../modules/recommendations/controllers/get-multi-market-recommendation.controller";
import { getShoppingListRecommendationController } from "../modules/recommendations/controllers/get-shopping-list-recommendation.controller";

const recommendationsRoutes = Router();

recommendationsRoutes.get(
  "/shopping-lists/:id/recommendation",
  getShoppingListRecommendationController
);

recommendationsRoutes.get(
  "/shopping-lists/:id/multi-market-recommendation",
  getMultiMarketRecommendationController
);

export default recommendationsRoutes;