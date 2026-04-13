/**
 * GetProductPriceHistoryController
 *
 * Handles the HTTP request for retrieving product price history.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { productIdParamSchema } from "../schemas/product.schema";
import { ProductsRepository } from "../repositories/products.repository";
import { GetProductPriceHistoryService } from "../services/get-product-price-history.service";

export async function getProductPriceHistoryController(
  request: Request,
  response: Response
): Promise<Response> {
  const { id } = productIdParamSchema.parse(request.params);

  const productsRepository = new ProductsRepository();
  const getProductPriceHistoryService = new GetProductPriceHistoryService(
    productsRepository
  );

  const result = await getProductPriceHistoryService.execute(id);

  return response.status(200).json(
    buildSuccessResponse({
      message: "Product price history retrieved successfully",
      data: result,
    })
  );
}