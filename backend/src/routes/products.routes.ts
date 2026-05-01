/**
 * Products routes.
 *
 * This file registers all HTTP endpoints related to products.
 */

import { Router } from "express";
import { createProductController } from "../modules/products/controllers/create-product.controller";
import { getProductByIdController } from "../modules/products/controllers/get-product-by-id.controller";
import { getProductMarketComparisonController } from "../modules/products/controllers/get-product-market-comparison.controller";
import { listProductsController } from "../modules/products/controllers/list-products.controller";
import { searchProductsController } from "../modules/products/controllers/search-products.controller";

const productsRoutes = Router();

productsRoutes.get("/search", searchProductsController);
productsRoutes.get("/:id/market-comparison", getProductMarketComparisonController);
productsRoutes.post("/", createProductController);
productsRoutes.get("/", listProductsController);
productsRoutes.get("/:id", getProductByIdController);

export default productsRoutes;