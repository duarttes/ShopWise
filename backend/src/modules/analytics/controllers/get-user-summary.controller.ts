/**
 * GetUserSummaryController
 *
 * Handles the HTTP request for retrieving a user's dashboard summary.
 */

import { Request, Response } from "express";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserSummaryService } from "../services/get-user-summary.service";

type getUserSummaryService = {
    userId: string;
}

const analyticsRepository = new AnalyticsRepository();
const getUserSummaryService = new GetUserSummaryService(analyticsRepository);

export async function getUserSummaryController(
  request: Request<getUserSummaryService>,
  response: Response
): Promise<Response> {
  const { userId } = request.params;

  const result = await getUserSummaryService.execute(userId);

  return response.status(200).json(result);
}