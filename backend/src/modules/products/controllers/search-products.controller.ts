/**
 * SearchProductsController
 *
 * Handles the HTTP request for searching products.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { ProductsRepository } from "../repositories/products.repository";
import { SearchProductsService } from "../services/search-products.service";

export async function searchProductsController(
  request: Request,
  response: Response
): Promise<Response> {
  const query =
    typeof request.query.query === "string" ? request.query.query : undefined;

  const productsRepository = new ProductsRepository();
  const searchProductsService = new SearchProductsService(productsRepository);

  const products = await searchProductsService.execute(query);

  return response.status(200).json(
    buildSuccessResponse({
      message: "Products retrieved successfully",
      data: products,
    })
  );
}