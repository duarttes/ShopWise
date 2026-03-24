/**
 * CreateProductController
 *
 * Handles the HTTP request for creating a new product.
 * This controller validates the request payload and delegates
 * the business logic to the service layer.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { ProductsRepository } from "../repositories/products.repository";
import { createProductSchema } from "../schemas/product.schema";
import { CreateProductService } from "../services/create-product.service";

export async function createProductController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = createProductSchema.parse(request.body);

  const productsRepository = new ProductsRepository();
  const createProductService = new CreateProductService(productsRepository);

  const product = await createProductService.execute(data);

  return response.status(201).json(
    buildSuccessResponse({
      message: "Product created successfully",
      data: product,
    })
  );
}