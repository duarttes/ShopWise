/**
 * GetUserRecentReceiptsController
 *
 * Handles the HTTP request for retrieving a user's recent receipts.
 * Supports a custom result limit through query params.
 */

import { Request, Response } from "express";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserRecentReceiptsService } from "../services/get-user-recent-receipts.service";
import { ensureSameUser } from "../../../shared/utils/authorization";

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

  ensureSameUser(request.user!.id, userId);

  const limit =
    typeof request.query.limit === "string"
      ? Number(request.query.limit)
      : undefined;

  const result = await getUserRecentReceiptsService.execute(userId, limit);

  return response.status(200).json(result);
}