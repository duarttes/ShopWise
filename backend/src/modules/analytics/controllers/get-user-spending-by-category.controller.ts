/**
 * GetUserSpendingByCategoryController
 *
 * Handles the HTTP request for retrieving spending grouped by product category.
 * Only the authenticated user can access their own data.
 * Supports optional date range filtering.
 */

import { Request, Response } from "express";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { parseDateRange } from "../../../shared/utils/date-range";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserSpendingByCategoryService } from "../services/get-user-spending-by-category.service";


type getUserSpendingByCategoryService = {
    userId: string;
}

  const analyticsRepository = new AnalyticsRepository();
  const getUserSpendingByCategoryService =
    new GetUserSpendingByCategoryService(analyticsRepository);


export async function getUserSpendingByCategoryController(
  request: Request<getUserSpendingByCategoryService>,
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

  const result = await getUserSpendingByCategoryService.execute(userId, {
    startDate,
    endDate,
  });

  return response.status(200).json(result);
}