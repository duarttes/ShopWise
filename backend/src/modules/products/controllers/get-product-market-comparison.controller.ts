/**
 * GetProductMarketComparisonController
 *
 * Handles the HTTP request for retrieving market comparison data for a product.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { ProductsRepository } from "../repositories/products.repository";
import { productIdParamSchema } from "../schemas/product.schema";
import { GetProductMarketComparisonService } from "../services/get-product-market-comparison.service";

export async function getProductMarketComparisonController(
  request: Request,
  response: Response
): Promise<Response> {
  const { id } = productIdParamSchema.parse(request.params);

  const productsRepository = new ProductsRepository();
  const getProductMarketComparisonService =
    new GetProductMarketComparisonService(productsRepository);

  const result = await getProductMarketComparisonService.execute(id);

  return response.status(200).json(
    buildSuccessResponse({
      message: "Product market comparison retrieved successfully",
      data: result,
    })
  );
}