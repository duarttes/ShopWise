/**
 * ListProductsController
 *
 * Handles the HTTP request for listing all products.
 * Supports filtering by category.
 */

import { Request, Response } from "express";
import { ProductsRepository } from "../repositories/products.repository";
import { ListProductsService } from "../services/list-products.service";

export async function listProductsController(
  request: Request,
  response: Response
): Promise<Response> {
  const category =
    typeof request.query.category === "string"
      ? request.query.category
      : undefined;

  const productsRepository = new ProductsRepository();
  const listProductsService = new ListProductsService(productsRepository);

  const products = await listProductsService.execute(category);

  return response.status(200).json(products);
}