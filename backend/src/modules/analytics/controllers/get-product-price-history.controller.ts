/**
 * GetProductPriceHistoryController
 *
 * Handles the HTTP request for retrieving the price history of a product.
 */

import { Request, Response } from "express";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetProductPriceHistoryService } from "../services/get-product-price-history.service";

type getProductPriceHistoryService = {
    productId: string;
}

const analyticsRepository = new AnalyticsRepository();
const getProductPriceHistoryService = new GetProductPriceHistoryService(
analyticsRepository
);


export async function getProductPriceHistoryController(
  request: Request<getProductPriceHistoryService>,
  response: Response
): Promise<Response> {
  const { productId } = request.params;

  const result = await getProductPriceHistoryService.execute(productId);

  return response.status(200).json(result);
}