/**
 * SearchMarketsController
 *
 * Handles the HTTP request for searching markets.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { MarketsRepository } from "../repositories/markets.repository";
import { SearchMarketsService } from "../services/search-markets.service";

export async function searchMarketsController(
  request: Request,
  response: Response
): Promise<Response> {
  const query =
    typeof request.query.query === "string" ? request.query.query : undefined;

  const marketsRepository = new MarketsRepository();
  const searchMarketsService = new SearchMarketsService(marketsRepository);

  const markets = await searchMarketsService.execute(query);

  return response.status(200).json(
    buildSuccessResponse({
      message: "Markets retrieved successfully",
      data: markets,
    })
  );
}