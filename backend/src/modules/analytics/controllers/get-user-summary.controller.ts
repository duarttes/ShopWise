/**
 * GetUserSummaryController
 *
 * Handles the HTTP request for retrieving a user's dashboard summary.
 */

import { Request, Response } from "express";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserSummaryService } from "../services/get-user-summary.service";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { parseDateRange } from "../../../shared/utils/date-range";

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

  ensureSameUser(request.user!.id, userId);

    const { startDate, endDate } = parseDateRange(
    typeof request.query.startDate === "string"
      ? request.query.startDate
      : undefined,
    typeof request.query.endDate === "string"
      ? request.query.endDate
      : undefined
  );

  const result = await getUserSummaryService.execute(userId, {
    startDate,
    endDate,
  });
  
  return response.status(200).json(result);
}