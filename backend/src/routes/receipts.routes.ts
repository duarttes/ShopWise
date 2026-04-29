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
import { ImportFromNfceController } from '../modules/receipts/controllers/import-from-nfce.controller';
const receiptsRoutes = Router();

receiptsRoutes.post("/", ensureAuthenticated, createReceiptController);
receiptsRoutes.get("/", ensureAuthenticated, listReceiptsController);
receiptsRoutes.get("/:id", ensureAuthenticated, getReceiptByIdController);
receiptsRoutes.post("/import-from-nfce", new ImportFromNfceController().handle);

export default receiptsRoutes;