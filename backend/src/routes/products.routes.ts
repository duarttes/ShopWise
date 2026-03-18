/**
 * Products routes.
 *
 * This file registers all HTTP endpoints related to products.
 */

import { Router } from "express";
import { createProductController } from "../modules/products/controllers/create-product.controller";
import { getProductByIdController } from "../modules/products/controllers/get-product-by-id.controller";
import { listProductsController } from "../modules/products/controllers/list-products.controller";

const productsRoutes = Router();

productsRoutes.post("/", createProductController);
productsRoutes.get("/", listProductsController);
productsRoutes.get("/:id", getProductByIdController);

export default productsRoutes;