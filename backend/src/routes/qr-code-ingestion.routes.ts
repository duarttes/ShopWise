/**
 * QR code ingestion routes.
 *
 * Registers QR code parsing and import endpoints.
 */

import { Router } from "express";
import { fetchSpReceiptController } from "../modules/qr-code-ingestion/controllers/fetch-sp-receipt.controller";
import { importSpReceiptController } from "../modules/qr-code-ingestion/controllers/import-sp-receipt.controller";
import { parseQrCodeController } from "../modules/qr-code-ingestion/controllers/parse-qr-code.controller";
import { ensureAuthenticated } from "../shared/middlewares/ensure-authenticated.middleware";

const qrCodeIngestionRoutes = Router();

qrCodeIngestionRoutes.post("/parse", ensureAuthenticated, parseQrCodeController);

qrCodeIngestionRoutes.post(
  "/fetch-sp-receipt",
  ensureAuthenticated,
  fetchSpReceiptController
);

qrCodeIngestionRoutes.post(
  "/import-sp-receipt",
  ensureAuthenticated,
  importSpReceiptController
);

export default qrCodeIngestionRoutes;