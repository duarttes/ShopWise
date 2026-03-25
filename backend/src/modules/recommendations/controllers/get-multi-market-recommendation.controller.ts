/**
 * GetMultiMarketRecommendationController
 *
 * Handles the HTTP request for calculating a multi-market recommendation
 * for a shopping list.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { RecommendationsRepository } from "../repositories/recommendations.repository";
import { GetMultiMarketRecommendationService } from "../services/get-multi-market-recommendation.service";

type getMultiMarketRecommendationService = {
  id: string;
};

const recommendationsRepository = new RecommendationsRepository();
const getMultiMarketRecommendationService =
  new GetMultiMarketRecommendationService(recommendationsRepository);

export async function getMultiMarketRecommendationController(
  request: Request<getMultiMarketRecommendationService>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

  const result = await getMultiMarketRecommendationService.execute(id);

  return response.status(200).json(
    buildSuccessResponse({
      message: "Multi-market recommendation generated successfully",
      data: result,
    })
  );
}