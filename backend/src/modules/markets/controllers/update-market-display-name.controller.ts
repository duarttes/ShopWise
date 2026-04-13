/**
 * UpdateMarketDisplayNameController
 *
 * Handles the HTTP request for updating a market display name.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { MarketsRepository } from "../repositories/markets.repository";
import { updateMarketDisplayNameSchema } from "../schemas/update-market-display-name.schema";
import { UpdateMarketDisplayNameService } from "../services/update-market-display-name.service";

type updateMarketDisplayNameService = {
  id: string;
};

  const marketsRepository = new MarketsRepository();
  const updateMarketDisplayNameService = new UpdateMarketDisplayNameService(
    marketsRepository
  );

export async function updateMarketDisplayNameController(
  request: Request<updateMarketDisplayNameService>,
  response: Response
): Promise<Response> {
  const { id } = request.params;
  const data = updateMarketDisplayNameSchema.parse(request.body);


  const market = await updateMarketDisplayNameService.execute(id, data);

  return response.status(200).json(
    buildSuccessResponse({
      message: "Market display name updated successfully",
      data: {
        ...market,
        displayName: market.displayName ?? market.name,
      },
    })
  );
}