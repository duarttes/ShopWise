/**
 * ListProductsController
 *
 * Handles the HTTP request for listing all products.
 */

import { Request, Response } from "express";
import { ProductsRepository } from "../repositories/products.repository";
import { ListProductsService } from "../services/list-products.service";

export async function listProductsController(
  _request: Request,
  response: Response
): Promise<Response> {
  const productsRepository = new ProductsRepository();
  const listProductsService = new ListProductsService(productsRepository);

  const products = await listProductsService.execute();

  return response.status(200).json(products);
}