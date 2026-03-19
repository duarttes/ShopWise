/**
 * GetProductLatestPricesController
 *
 * Handles the HTTP request for retrieving the latest known prices of a product.
 */

import { Request, Response } from "express";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { GetProductLatestPricesService } from "../services/get-product-latest-prices.service";

type getProductLatestPricesService = {
    productId: string;
}

const analyticsRepository = new AnalyticsRepository();
const getProductLatestPricesService = new GetProductLatestPricesService(
analyticsRepository
);

export async function getProductLatestPricesController(
  request: Request<getProductLatestPricesService>,
  response: Response
): Promise<Response> {
  const { productId } = request.params;

  const result = await getProductLatestPricesService.execute(productId);

  return response.status(200).json(result);
}