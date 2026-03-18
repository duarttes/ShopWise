/**
 * ListMarketsController
 *
 * Handles the HTTP request for listing all markets.
 */

import { Request, Response } from "express";
import { MarketsRepository } from "../repositories/markets.repository";
import { ListMarketsService } from "../services/list-markets.service";

export async function listMarketsController(
  _request: Request,
  response: Response
): Promise<Response> {
  const marketsRepository = new MarketsRepository();
  const listMarketsService = new ListMarketsService(marketsRepository);

  const markets = await listMarketsService.execute();

  return response.status(200).json(markets);
}