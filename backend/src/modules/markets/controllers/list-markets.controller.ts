/**
 * ListMarketsController
 *
 * Handles the HTTP request for listing all markets.
 * Supports filtering by city.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { MarketsRepository } from "../repositories/markets.repository";
import { ListMarketsService } from "../services/list-markets.service";

export async function listMarketsController(
  request: Request,
  response: Response
): Promise<Response> {
  const city =
    typeof request.query.city === "string" ? request.query.city : undefined;

  const marketsRepository = new MarketsRepository();
  const listMarketsService = new ListMarketsService(marketsRepository);

  const markets = await listMarketsService.execute(city);

  return response.status(200).json(
    buildSuccessResponse({
      message: "Markets retrieved successfully",
      data: markets,
    })
  );
}