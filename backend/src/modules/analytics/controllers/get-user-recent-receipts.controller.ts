/**
 * GetUserRecentReceiptsController
 *
 * Handles the HTTP request for retrieving a user's recent receipts.
 */

import { Request, Response } from "express";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserRecentReceiptsService } from "../services/get-user-recent-receipts.service";

type getUserRecentReceiptsService = {
    userId: string;
}

const analyticsRepository = new AnalyticsRepository();
const getUserRecentReceiptsService = new GetUserRecentReceiptsService(
    analyticsRepository
);

export async function getUserRecentReceiptsController(
  request: Request<getUserRecentReceiptsService>,
  response: Response
): Promise<Response> {
  const { userId } = request.params;



  const result = await getUserRecentReceiptsService.execute(userId);

  return response.status(200).json(result);
}