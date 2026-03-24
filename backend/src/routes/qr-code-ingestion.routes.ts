/**
 * QR code ingestion routes.
 *
 * Registers QR code parsing endpoints.
 */

import { Router } from "express";
import { parseQrCodeController } from "../modules/qr-code-ingestion/controllers/parse-qr-code.controller";
import { ensureAuthenticated } from "../shared/middlewares/ensure-authenticated.middleware";

const qrCodeIngestionRoutes = Router();

qrCodeIngestionRoutes.post("/parse", ensureAuthenticated, parseQrCodeController);

export default qrCodeIngestionRoutes;