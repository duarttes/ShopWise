/**
 * GetShoppingListRecommendationController
 *
 * Handles the HTTP request for calculating recommendations for a shopping list.
 * Optional query params:
 * - userLatitude
 * - userLongitude
 */

import { Request, Response } from "express";
import { RecommendationsRepository } from "../repositories/recommendations.repository";
import { GetShoppingListRecommendationService } from "../services/get-shopping-list-recommendation.service";
import { buildSuccessResponse } from "../../../shared/utils/api-response";

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

  const recommendation = await getShoppingListRecommendationService.execute(id, {
    userLatitude,
    userLongitude,
  });

return response.status(200).json(
    buildSuccessResponse({
      message: "Recommendation generated successfully",
      data: recommendation,
    })
  );
}