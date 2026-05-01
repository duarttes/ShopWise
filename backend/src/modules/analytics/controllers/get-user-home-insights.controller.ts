/**
 * GetUserHomeInsightsController
 *
 * Handles the HTTP request for retrieving a compact home dashboard
 * for the authenticated user.
 */

import { Request, Response } from "express";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserHomeInsightsService } from "../services/get-user-home-insights.service";

const analyticsRepository = new AnalyticsRepository();
const getUserHomeInsightsService = new GetUserHomeInsightsService(
  analyticsRepository
);

export async function getUserHomeInsightsController(
  request: Request,
  response: Response
): Promise<Response> {
  const { userId } = request.params;

  const userIdString = Array.isArray(userId) ? userId[0] : userId;

  ensureSameUser(request.user!.id, userIdString);

  const result = await getUserHomeInsightsService.execute(userIdString);

  return response.status(200).json(
    buildSuccessResponse({
      message: "User home insights retrieved successfully",
      data: result,
    })
  );
}