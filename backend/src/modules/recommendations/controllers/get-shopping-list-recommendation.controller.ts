/**
 * GetShoppingListRecommendationController
 *
 * Handles the HTTP request for calculating recommendations for a shopping list.
 *
 * Optional query params:
 * - userLatitude
 * - userLongitude
 * - strategy: balanced | cheapest | closest
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { RecommendationsRepository } from "../repositories/recommendations.repository";
import { GetShoppingListRecommendationService } from "../services/get-shopping-list-recommendation.service";

type getShoppingListRecommendationService = {
  id: string;
}

  const recommendationsRepository = new RecommendationsRepository();
  const getShoppingListRecommendationService =
    new GetShoppingListRecommendationService(recommendationsRepository);

export async function getShoppingListRecommendationController(
  request: Request<getShoppingListRecommendationService>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

  const userLatitude = request.query.userLatitude
    ? Number(request.query.userLatitude)
    : undefined;

  const userLongitude = request.query.userLongitude
    ? Number(request.query.userLongitude)
    : undefined;

  const strategy =
    typeof request.query.strategy === "string"
      ? request.query.strategy
      : undefined;

  const recommendation = await getShoppingListRecommendationService.execute(id, {
    userLatitude,
    userLongitude,
    strategy:
      strategy === "cheapest" || strategy === "closest" || strategy === "balanced"
        ? strategy
        : undefined,
  });

  return response.status(200).json(
    buildSuccessResponse({
      message: "Recommendation generated successfully",
      data: recommendation,
    })
  );
}