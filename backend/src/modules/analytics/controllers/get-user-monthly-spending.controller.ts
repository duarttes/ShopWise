/**
 * GetUserMonthlySpendingController
 *
 * Handles the HTTP request for retrieving monthly spending data.
 * Only the authenticated user can access their own data.
 * Supports optional date range filtering.
 */

import { Request, Response } from "express";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { parseDateRange } from "../../../shared/utils/date-range";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserMonthlySpendingService } from "../services/get-user-monthly-spending.service";

type getUserMonthlySpendingService = {
  userId: string;
}

  const analyticsRepository = new AnalyticsRepository();
  const getUserMonthlySpendingService = new GetUserMonthlySpendingService(
    analyticsRepository
  );

export async function getUserMonthlySpendingController(
  request: Request<getUserMonthlySpendingService>,
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

  const result = await getUserMonthlySpendingService.execute(userId, {
    startDate,
    endDate,
  });

  return response.status(200).json(result);
}