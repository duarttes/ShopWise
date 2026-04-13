/**
 * ImportSpReceiptService
 *
 * Imports a São Paulo NFC-e public consultation page
 * and persists it as a ShopWise receipt.
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { CreateReceiptService } from "../../receipts/services/create-receipt.service";
import { ReceiptsRepository } from "../../receipts/repositories/receipts.repository";
import { ImportSpReceiptInput } from "../schemas/import-sp-receipt.schema";
import { FetchSpReceiptService } from "./fetch-sp-receipt.service";

export class ImportSpReceiptService {
  async execute(data: ImportSpReceiptInput) {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const fetchSpReceiptService = new FetchSpReceiptService();

    const fetched = await fetchSpReceiptService.execute({
      url: data.url,
    });

    const parsedReceipt = fetched.receipt;
    const accessKey = parsedReceipt.receiptInfo.accessKey;

    if (accessKey) {
      const existingReceipt = await prisma.receipt.findUnique({
        where: { externalCode: accessKey },
        select: {
          id: true,
          externalCode: true,
          purchasedAt: true,
        },
      });

      if (existingReceipt) {
        throw new AppError("This receipt has already been imported", 409);
      }
    }

    const receiptsRepository = new ReceiptsRepository();
    const createReceiptService = new CreateReceiptService(receiptsRepository);

    const validItems = parsedReceipt.items
      .filter((item) => item.unitPrice !== null)
      .map((item) => ({
        nameRaw: item.nameRaw,
        unit: item.unit ?? undefined,
        quantity: item.quantity ?? undefined,
        unitPrice: item.unitPrice as number,
        totalPrice: item.totalPrice ?? undefined,
      }));

    if (validItems.length === 0) {
      throw new AppError("No valid receipt items were found for import", 400);
    }

    const purchasedAt = parsedReceipt.receiptInfo.issuedAt
      ? new Date(parsedReceipt.receiptInfo.issuedAt).toISOString()
      : new Date().toISOString();

    const totalAmount =
      parsedReceipt.totals.amountToPay ??
      parsedReceipt.totals.totalAmount;

    if (totalAmount == null) {
      throw new AppError("Could not determine receipt total amount", 400);
    }

    const result = await createReceiptService.execute({
      userId: data.userId,
      market: {
        name: parsedReceipt.issuer.name ?? "Unknown market",
        cnpj: parsedReceipt.issuer.cnpj ?? undefined,
        address: parsedReceipt.issuer.address ?? undefined,
        city: parsedReceipt.issuer.city ?? undefined,
        state: parsedReceipt.issuer.state ?? undefined,
      },
      externalCode: accessKey ?? undefined,
      sourceType: "IMPORTED",
      totalAmount,
      purchasedAt,
      parsingScore: parsedReceipt.parsing.confidenceScore,
      parsingWarnings: parsedReceipt.parsing.warnings,
      items: validItems,
    });

    return {
      user,
      importSource: {
        state: "São Paulo",
        url: data.url,
        accessKey,
      },
      receipt: result.receipt,
      ingestion: result.ingestion,
      parsing: parsedReceipt.parsing,
      preview: {
        issuer: parsedReceipt.issuer,
        totals: parsedReceipt.totals,
        payments: parsedReceipt.payments,
        receiptInfo: parsedReceipt.receiptInfo,
        itemsCount: parsedReceipt.items.length,
      },
    };
  }
}