/**
 * ImportSpReceiptService
 *
 * Fetches a São Paulo NFC-e public consultation page,
 * parses its contents and imports the result as a ShopWise receipt.
 *
 * Responsibilities:
 * - validate user existence
 * - fetch and parse the São Paulo NFC-e page
 * - prevent duplicate import by access key
 * - delegate receipt creation to CreateReceiptService
 *
 * Important:
 * - product resolution / auto-creation is handled by CreateReceiptService
 * - market creation / reuse is handled by CreateReceiptService
 * - market geocoding is handled by CreateReceiptService
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { CreateReceiptService } from "../../receipts/services/create-receipt.service";
import { ReceiptsRepository } from "../../receipts/repositories/receipts.repository";
import { ImportSpReceiptDTO } from "../dtos/import-sp-receipt.dto";
import { FetchSpReceiptService } from "./fetch-sp-receipt.service";

export class ImportSpReceiptService {
  async execute(data: ImportSpReceiptDTO) {
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
    const accessKey = fetched.qrCode.accessKey;

    if (!parsedReceipt.issuer.name) {
      throw new AppError(
        "Could not identify issuer name from São Paulo receipt",
        422
      );
    }

    if (!parsedReceipt.receiptInfo.issuedAt) {
      throw new AppError(
        "Could not identify receipt issue date from São Paulo receipt",
        422
      );
    }

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
        throw new AppError("This São Paulo receipt has already been imported", 409);
      }
    }

    const createReceiptService = new CreateReceiptService(
      new ReceiptsRepository()
    );

    /**
     * Delegate all catalog/market logic to CreateReceiptService.
     * It already:
     * - resolves or creates products
     * - creates/reuses markets
     * - geocodes markets when possible
     * - creates price records
     */
    const created = await createReceiptService.execute({
      userId: data.userId,
      externalCode: accessKey ?? undefined,
      sourceType: "QR_CODE",
      totalAmount:
        parsedReceipt.totals.totalAmount ??
        parsedReceipt.totals.amountToPay ??
        0,
      purchasedAt: this.parseIssuedAtToIso(parsedReceipt.receiptInfo.issuedAt),
      market: {
        name: parsedReceipt.issuer.name,
        displayName: parsedReceipt.issuer.name,
        cnpj: this.onlyDigits(parsedReceipt.issuer.cnpj),
        address: parsedReceipt.issuer.address ?? undefined,
        city: parsedReceipt.issuer.city ?? undefined,
        state: parsedReceipt.issuer.state ?? undefined,
      },
      items: parsedReceipt.items.map((item) => ({
        nameRaw: item.nameRaw,
        unit: item.unit ?? undefined,
        quantity: item.quantity ?? undefined,
        unitPrice: item.unitPrice ?? item.totalPrice ?? 0,
        totalPrice: item.totalPrice ?? undefined,
      })),
    });

    return {
      importSource: {
        state: "São Paulo",
        url: data.url,
        accessKey,
      },
      parsed: {
        issuer: parsedReceipt.issuer,
        totals: parsedReceipt.totals,
        payments: parsedReceipt.payments,
        receiptInfo: parsedReceipt.receiptInfo,
        itemsCount: parsedReceipt.items.length,
      },
      importedReceipt: created,
    };
  }

  /**
   * Converts the São Paulo issuedAt string format into an ISO string.
   * Expected example: 24/03/2026 10:26:59
   */
  private parseIssuedAtToIso(value: string): string {
    const normalized = value.trim();

    const match = normalized.match(
      /(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/
    );

    if (!match) {
      throw new AppError("Could not parse São Paulo receipt issue date", 422);
    }

    const [, day, month, year, hour, minute, second] = match;

    return `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
  }

  /**
   * Keeps only digits from identifiers like CNPJ.
   */
  private onlyDigits(value?: string | null): string | undefined {
    if (!value) return undefined;

    const digits = value.replace(/\D/g, "");

    return digits || undefined;
  }
}