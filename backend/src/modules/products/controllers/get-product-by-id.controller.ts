/**
 * GetProductByIdController
 *
 * Handles the HTTP request for retrieving a product by id.
 */

import { Request, Response } from "express";
import { ProductsRepository } from "../repositories/products.repository";
import { GetProductByIdService } from "../services/get-product-by-id.service";

type getProductByIdParams = {
  id: string;
};

 const productsRepository = new ProductsRepository();
const getProductByIdService = new GetProductByIdService(productsRepository);


export async function getProductByIdController(
  request: Request<getProductByIdParams>,
  response: Response
): Promise<Response> {
  const { id } = request.params;


  const product = await getProductByIdService.execute(id);

  return response.status(200).json(product);
}