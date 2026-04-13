/**
 * ImportSpReceiptController
 *
 * Handles the HTTP request for importing a São Paulo NFC-e
 * public consultation page as a ShopWise receipt.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { importSpReceiptSchema } from "../schemas/import-sp-receipt.schema";
import { PreviewSpReceiptImportService } from "../services/import-sp-receipt.service";

export async function importSpReceiptController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = importSpReceiptSchema.parse(request.body);

  ensureSameUser(request.user!.id, data.userId);

  const importSpReceiptService = new PreviewSpReceiptImportService();
  const result = await importSpReceiptService.execute(data);

  return response.status(201).json(
    buildSuccessResponse({
      message: "São Paulo receipt imported successfully",
      data: result,
    })
  );
}