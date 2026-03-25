/**
 * Markets routes.
 *
 * This file registers all HTTP endpoints related to markets.
 */

import { Router } from "express";
import { createMarketController } from "../modules/markets/controllers/create-market.controller";
import { getMarketByIdController } from "../modules/markets/controllers/get-market-by-id.controller";
import { listMarketsController } from "../modules/markets/controllers/list-markets.controller";
import { searchMarketsController } from "../modules/markets/controllers/search-markets.controller";
import { updateMarketDisplayNameController } from "../modules/markets/controllers/update-market-display-name.controller";

const marketsRoutes = Router();

marketsRoutes.get("/search", searchMarketsController);
marketsRoutes.post("/", createMarketController);
marketsRoutes.get("/", listMarketsController);
marketsRoutes.get("/:id", getMarketByIdController);
marketsRoutes.patch("/:id/display-name", updateMarketDisplayNameController);

export default marketsRoutes;