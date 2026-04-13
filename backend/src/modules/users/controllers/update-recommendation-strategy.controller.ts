/**
 * UpdateRecommendationStrategyController
 *
 * Handles the HTTP request for updating the authenticated user's
 * default recommendation strategy.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { updateRecommendationStrategySchema } from "../schemas/update-recommendation-strategy.schema";
import { UsersRepository } from "../repositories/users.repository";
import { UpdateRecommendationStrategyService } from "../services/update-recommendation-strategy.service";

export async function updateRecommendationStrategyController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = updateRecommendationStrategySchema.parse(request.body);

  const usersRepository = new UsersRepository();
  const updateRecommendationStrategyService =
    new UpdateRecommendationStrategyService(usersRepository);

  const user = await updateRecommendationStrategyService.execute(
    request.user!.id,
    data
  );

  return response.status(200).json(
    buildSuccessResponse({
      message: "Recommendation strategy updated successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        recommendationStrategy:
          user.recommendationStrategy ?? "balanced",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  );
}