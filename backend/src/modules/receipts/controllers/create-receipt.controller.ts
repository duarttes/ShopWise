/**
 * CreateReceiptController
 *
 * Handles the HTTP request for creating a new receipt.
 * This controller validates the request payload and delegates
 * the business logic to the service layer.
 */

import { Request, Response } from "express";
import { createReceiptSchema } from "../schemas/receipt.schema";
import { ReceiptsRepository } from "../repositories/receipts.repository";
import { CreateReceiptService } from "../services/create-receipt.service";

export async function createReceiptController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = createReceiptSchema.parse(request.body);

  const receiptsRepository = new ReceiptsRepository();
  const createReceiptService = new CreateReceiptService(receiptsRepository);

  const receipt = await createReceiptService.execute(data);

  return response.status(201).json(receipt);
}