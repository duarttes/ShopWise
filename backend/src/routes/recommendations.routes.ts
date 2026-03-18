/**
 * Recommendations routes.
 *
 * This file registers recommendation-related HTTP endpoints.
 */

import { Router } from "express";
import { getShoppingListRecommendationController } from "../modules/recommendations/controllers/get-shopping-list-recommendation.controller";

const recommendationsRoutes = Router();

recommendationsRoutes.get(
  "/shopping-lists/:id/recommendation",
  getShoppingListRecommendationController
);

export default recommendationsRoutes;