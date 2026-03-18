import { Request, Response } from "express";
import { MarketsRepository } from "../repositories/markets.repository";
import { GetMarketByIdService } from "../services/get-market-by-id.service";

type GetMarketByIdParams = {
  id: string;
};

const marketsRepository = new MarketsRepository();
const getMarketByIdService = new GetMarketByIdService(marketsRepository);

export async function getMarketByIdController(
  request: Request<GetMarketByIdParams>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

  const market = await getMarketByIdService.execute(id);

  return response.status(200).json(market);
}