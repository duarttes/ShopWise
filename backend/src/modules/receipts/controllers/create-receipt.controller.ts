/**
 * CreateReceiptController
 *
 * Handles the HTTP request for creating a new receipt.
 * This controller validates the request payload and delegates
 * the business logic to the service layer.
 *
 * Ownership rule:
 * the authenticated user can only create receipts for themselves.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { createReceiptSchema } from "../schemas/receipt.schema";
import { ReceiptsRepository } from "../repositories/receipts.repository";
import { CreateReceiptService } from "../services/create-receipt.service";

export async function createReceiptController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = createReceiptSchema.parse(request.body);

  ensureSameUser(request.user!.id, data.userId);

  const receiptsRepository = new ReceiptsRepository();
  const createReceiptService = new CreateReceiptService(receiptsRepository);

  const result = await createReceiptService.execute(data);

  return response.status(201).json(
    buildSuccessResponse({
      message: "Receipt created successfully",
      data: result,
    })
  );
}