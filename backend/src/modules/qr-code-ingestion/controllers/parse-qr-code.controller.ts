/**
 * ParseQrCodeController
 *
 * Handles the HTTP request for parsing a receipt QR code URL.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { parseQrCodeSchema } from "../schemas/parse-qr-code.schema";
import { ParseQrCodeService } from "../services/parse-qr-code.service";

export async function parseQrCodeController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = parseQrCodeSchema.parse(request.body);

  const parseQrCodeService = new ParseQrCodeService();
  const result = await parseQrCodeService.execute(data);

  return response.status(200).json(
    buildSuccessResponse({
      message: "QR code parsed successfully",
      data: result,
    })
  );
}