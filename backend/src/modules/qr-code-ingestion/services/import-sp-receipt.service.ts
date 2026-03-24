/**
 * ImportSpReceiptService
 *
 * Fetches a São Paulo NFC-e public consultation page,
 * parses its contents and imports the result as a ShopWise receipt.
 *
 * Current strategy:
 * - fetch and parse the QR code page
 * - resolve products by normalized item names
 * - create or reuse market by CNPJ
 * - create receipt and price records through the existing receipt workflow
 *
 * MVP note:
 * this flow depends on the current São Paulo HTML parser and product matching quality.
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { resolveOrCreateProductByName } from "../../../shared/utils/resolve-or-create-product-by-name";
import { ImportSpReceiptDTO } from "../dtos/import-sp-receipt.dto";
import { FetchSpReceiptService } from "./fetch-sp-receipt.service";
import { CreateReceiptService } from "../../receipts/services/create-receipt.service";
import { ReceiptsRepository } from "../../receipts/repositories/receipts.repository";

export class ImportSpReceiptService {
  async execute(data: ImportSpReceiptDTO) {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
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
      throw new AppError("Could not identify issuer name from São Paulo receipt", 422);
    }

    if (!parsedReceipt.receiptInfo.issuedAt) {
      throw new AppError("Could not identify receipt issue date from São Paulo receipt", 422);
    }

    const existingReceipt = accessKey
      ? await prisma.receipt.findUnique({
          where: { externalCode: accessKey },
        })
      : null;

    if (existingReceipt) {
      throw new AppError("This São Paulo receipt has already been imported", 409);
    }

    const resolvedItems = await Promise.all(
    parsedReceipt.items.map(async (item) => {
        const resolved = await resolveOrCreateProductByName({
        rawName: item.nameRaw,
        unit: item.unit,
        });

        return {
        nameRaw: item.nameRaw,
        unit: item.unit ?? undefined,
        quantity: item.quantity ?? undefined,
        unitPrice: item.unitPrice ?? item.totalPrice ?? 0,
        totalPrice: item.totalPrice ?? undefined,
        productId: resolved.product.id,
        matchedBy: resolved.matchedBy,
        };
    })
    );

    const createReceiptService = new CreateReceiptService(new ReceiptsRepository());

    const importedReceipt = await createReceiptService.execute({
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
        cnpj: this.onlyDigits(parsedReceipt.issuer.cnpj),
        address: parsedReceipt.issuer.address ?? undefined,
        city: parsedReceipt.issuer.city ?? undefined,
        state: parsedReceipt.issuer.state ?? undefined,
      },
      items: resolvedItems.map((item) => ({
        nameRaw: item.nameRaw,
        unit: item.unit,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        productId: item.productId,
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
        receiptInfo: parsedReceipt.receiptInfo,
        itemsCount: parsedReceipt.items.length,
      },
      importSummary: {
        matchedItemsCount: resolvedItems.filter((item) => Boolean(item.productId)).length,
        unmatchedItemsCount: resolvedItems.filter((item) => !item.productId).length,
        unmatchedItems: resolvedItems
          .filter((item) => !item.productId)
          .map((item) => ({
            nameRaw: item.nameRaw,
          })),
      },
      importedReceipt,
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
   * Keeps only digits from document identifiers like CNPJ.
   */
  private onlyDigits(value?: string | null): string | undefined {
    if (!value) return undefined;

    const digits = value.replace(/\D/g, "");

    return digits || undefined;
  }
}