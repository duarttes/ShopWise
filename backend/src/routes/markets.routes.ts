/**
 * Markets routes.
 *
 * This file registers all HTTP endpoints related to markets.
 */

import { Router } from "express";
import { createMarketController } from "../modules/markets/controllers/create-market.controller";
import { getMarketByIdController } from "../modules/markets/controllers/get-market-by-id.controller";
import { listMarketsController } from "../modules/markets/controllers/list-markets.controller";

const marketsRoutes = Router();

marketsRoutes.post("/", createMarketController);
marketsRoutes.get("/", listMarketsController);
marketsRoutes.get("/:id", getMarketByIdController);

export default marketsRoutes;