/**
 * GetMultiMarketRecommendationController
 *
 * Handles the HTTP request for calculating a multi-market recommendation
 * for a shopping list.
 *
 * Optional query params:
 * - userLatitude
 * - userLongitude
 * - maxMarkets (currently capped at 3)
 *
 * Product strategy:
 * - free plan: maxMarkets = 2
 * - premium plan: maxMarkets = 3
 *
 * For now, we only prepare the technical support.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { RecommendationsRepository } from "../repositories/recommendations.repository";
import { GetMultiMarketRecommendationService } from "../services/get-multi-market-recommendation.service";

type getMultiMarketRecommendationService = {
  id : string;
};

const recommendationsRepository = new RecommendationsRepository();
const getMultiMarketRecommendationService =
  new GetMultiMarketRecommendationService(recommendationsRepository);

export async function getMultiMarketRecommendationController(
  request: Request<getMultiMarketRecommendationService>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

  const userLatitude = request.query.userLatitude
    ? Number(request.query.userLatitude)
    : undefined;

  const userLongitude = request.query.userLongitude
    ? Number(request.query.userLongitude)
    : undefined;

  const requestedMaxMarkets = typeof request.query.maxMarkets === "string"
      ? Number(request.query.maxMarkets)
      : undefined;  
    
  /**
   * Current technical cap:
   * - minimum: 1
   * - maximum: 3
   *
   * Future business rule:
   * - free => 2
   * - premium => 3
   */
  const maxMarketsToCompare =
    requestedMaxMarkets == null || Number.isNaN(requestedMaxMarkets)
      ? 2
      : Math.min(Math.max(requestedMaxMarkets, 1), 3);

  const result = await getMultiMarketRecommendationService.execute(id, {
    userLatitude,
    userLongitude,
    maxMarketsToCompare,
  });

  return response.status(200).json(
    buildSuccessResponse({
      message: "Multi-market recommendation generated successfully",
      data: result,
    })
  );
}