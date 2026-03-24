/**
 * FetchSpReceiptController
 *
 * Handles the HTTP request for fetching and parsing
 * the São Paulo NFC-e public consultation page.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { fetchSpReceiptSchema } from "../schemas/fetch-sp-receipt.schema";
import { FetchSpReceiptService } from "../services/fetch-sp-receipt.service";

export async function fetchSpReceiptController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = fetchSpReceiptSchema.parse(request.body);

  const fetchSpReceiptService = new FetchSpReceiptService();
  const result = await fetchSpReceiptService.execute(data);

  return response.status(200).json(
    buildSuccessResponse({
      message: "São Paulo receipt fetched successfully",
      data: result,
    })
  );
}