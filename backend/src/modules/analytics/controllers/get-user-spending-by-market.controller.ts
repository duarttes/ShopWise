/**
 * GetUserSpendingByMarketController
 *
 * Handles the HTTP request for retrieving a user's spending grouped by market.
 */

import { Request, Response } from "express";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserSpendingByMarketService } from "../services/get-user-spending-by-market.service";
import { ensureSameUser } from "../../../shared/utils/authorization";

type getUserSpendingByMarketService = {
    userId: string;
}

const analyticsRepository = new AnalyticsRepository();
const getUserSpendingByMarketService = new GetUserSpendingByMarketService(
    analyticsRepository
);

export async function getUserSpendingByMarketController(
  request: Request<getUserSpendingByMarketService>,
  response: Response
): Promise<Response> {
  const { userId } = request.params;

  ensureSameUser(request.user!.id, userId);

  const result = await getUserSpendingByMarketService.execute(userId);

  return response.status(200).json(result);
}