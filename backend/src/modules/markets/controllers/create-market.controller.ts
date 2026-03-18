/**
 * CreateMarketController
 *
 * Handles the HTTP request for creating a new market.
 * This controller validates the request payload and delegates
 * the business logic to the service layer.
 */

import { Request, Response } from "express";
import { MarketsRepository } from "../repositories/markets.repository";
import { createMarketSchema } from "../schemas/market.schema";
import { CreateMarketService } from "../services/create-market.service";

export async function createMarketController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = createMarketSchema.parse(request.body);

  const marketsRepository = new MarketsRepository();
  const createMarketService = new CreateMarketService(marketsRepository);

  const market = await createMarketService.execute(data);

  return response.status(201).json(market);
}