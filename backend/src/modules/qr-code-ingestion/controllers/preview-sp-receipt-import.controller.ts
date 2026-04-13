/**
 * PreviewSpReceiptImportController
 *
 * Handles the HTTP request for previewing a São Paulo NFC-e
 * import without saving any data.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { previewSpReceiptImportSchema } from "../schemas/preview-sp-receipt-import.schema";
import { PreviewSpReceiptImportService } from "../services/preview-sp-receipt-import.service";

export async function previewSpReceiptImportController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = previewSpReceiptImportSchema.parse(request.body);

  ensureSameUser(request.user!.id, data.userId);

  const previewSpReceiptImportService = new PreviewSpReceiptImportService();
  const result = await previewSpReceiptImportService.execute(data);

  return response.status(200).json(
    buildSuccessResponse({
      message: "São Paulo receipt import preview generated successfully",
      data: result,
    })
  );
}