/**
 * GetUserSpendingByMarketController
 *
 * Handles the HTTP request for retrieving a user's spending grouped by market.
 */

import { Request, Response } from "express";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserSpendingByMarketService } from "../services/get-user-spending-by-market.service";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { parseDateRange } from "../../../shared/utils/date-range";

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

    const { startDate, endDate } = parseDateRange(
    typeof request.query.startDate === "string"
      ? request.query.startDate
      : undefined,
    typeof request.query.endDate === "string"
      ? request.query.endDate
      : undefined
  );

  const result = await getUserSpendingByMarketService.execute(userId, {
    startDate,
    endDate,
  });

  return response.status(200).json(result);
}