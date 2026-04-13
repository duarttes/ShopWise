/**
 * GeocodeMarketController
 *
 * Handles the HTTP request for geocoding a market address.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { MarketsRepository } from "../repositories/markets.repository";
import { GeocodeMarketService } from "../services/geocode-market.service";

type geocodeMarketService = {
  id: string;
};

const marketsRepository = new MarketsRepository();
const geocodeMarketService = new GeocodeMarketService(marketsRepository);

export async function geocodeMarketController(
  request: Request<geocodeMarketService>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

  const result = await geocodeMarketService.execute(id);

  return response.status(200).json(
    buildSuccessResponse({
      message: "Market geocoded successfully",
      data: {
        ...result,
        market: {
          ...result.market,
          displayName: result.market.displayName ?? result.market.name,
        },
      },
    })
  );
}