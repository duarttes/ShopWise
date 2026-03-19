/**
 * Receipts routes.
 *
 * This file registers all HTTP endpoints related to receipts.
 */

import { Router } from "express";
import { createReceiptController } from "../modules/receipts/controllers/create-receipt.controller";
import { getReceiptByIdController } from "../modules/receipts/controllers/get-receipt-by-id.controller";
import { listReceiptsController } from "../modules/receipts/controllers/list-receipts.controller";
import { ensureAuthenticated } from "../shared/middlewares/ensure-authenticated.middleware";

const receiptsRoutes = Router();

receiptsRoutes.post("/", ensureAuthenticated, createReceiptController);
receiptsRoutes.get("/", ensureAuthenticated, listReceiptsController);
receiptsRoutes.get("/:id", ensureAuthenticated, getReceiptByIdController);

export default receiptsRoutes;