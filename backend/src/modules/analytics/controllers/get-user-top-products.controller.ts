/**
 * GetUserTopProductsController
 *
 * Handles the HTTP request for retrieving the user's top purchased products.
 * Only the authenticated user can access their own data.
 * Supports optional date range filtering.
 */

import { Request, Response } from "express";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { parseDateRange } from "../../../shared/utils/date-range";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetUserTopProductsService } from "../services/get-user-top-products.service";

type getUserTopProductsService = {
    userId: string;
}

  const analyticsRepository = new AnalyticsRepository();
  const getUserTopProductsService = new GetUserTopProductsService(
    analyticsRepository
  );


export async function getUserTopProductsController(
  request: Request<getUserTopProductsService>,
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

  const result = await getUserTopProductsService.execute(userId, {
    startDate,
    endDate,
  });

  return response.status(200).json(result);
}