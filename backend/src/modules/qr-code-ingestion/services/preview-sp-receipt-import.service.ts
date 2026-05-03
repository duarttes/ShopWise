/**
 * PreviewSpReceiptImportService
 *
 * Generates a preview for importing a São Paulo NFC-e receipt
 * without persisting any data.
 *
 * Responsibilities:
 * - validate user existence
 * - fetch and parse the São Paulo NFC-e page
 * - simulate product resolution
 * - indicate which products already exist
 * - indicate which products would be auto-created
 * - detect duplicate receipt by access key when possible
 * - expose parser confidence and warnings
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { normalizeProductName } from "../../../shared/utils/normalize-product-name";
import { resolveProductByName } from "../../../shared/utils/resolve-product-by-name";
import { PreviewSpReceiptImportDTO } from "../dtos/preview-sp-receipt-import.dto";
import { FetchSpReceiptService } from "./fetch-sp-receipt.service";

export class PreviewSpReceiptImportService {
  async execute(data: PreviewSpReceiptImportDTO) {
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

    const existingReceipt = accessKey
      ? await prisma.receipt.findUnique({
          where: { externalCode: accessKey },
          select: {
            id: true,
            externalCode: true,
            purchasedAt: true,
          },
        })
      : null;
    
        // Busca mercado existente pelo CNPJ
        const cnpj = parsedReceipt.issuer.cnpj?.replace(/\D/g, '') ?? null;

        const existingMarket = cnpj
          ? await prisma.market.findFirst({
              where: { cnpj: { contains: cnpj } },
              select: {
                id: true,
                name: true,
                displayName: true,
              },
            })
          : null;

    const resolvedItems = await Promise.all(
      parsedReceipt.items.map(async (item) => {
        const matchedProduct = await resolveProductByName(item.nameRaw);
        const normalizedName = normalizeProductName(item.nameRaw);

        return {
          nameRaw: item.nameRaw,
          normalizedName,
          unit: item.unit ?? null,
          quantity: item.quantity ?? null,
          unitPrice: item.unitPrice ?? null,
          totalPrice: item.totalPrice ?? null,
          productResolution: matchedProduct
            ? {
                status: "matched_existing",
                product: {
                  id: matchedProduct.id,
                  name: matchedProduct.name,
                  normalizedName: matchedProduct.normalizedName,
                  category: matchedProduct.category,
                  brand: matchedProduct.brand,
                  unit: matchedProduct.unit,
                },
              }
            : {
                status: "will_auto_create",
                product: {
                  name: item.nameRaw.trim(),
                  normalizedName,
                  category: null,
                  brand: null,
                  unit: item.unit ?? null,
                },
              },
        };
      })
    );

    const matchedItemsCount = resolvedItems.filter(
      (item) => item.productResolution.status === "matched_existing"
    ).length;

    const autoCreateItemsCount = resolvedItems.filter(
      (item) => item.productResolution.status === "will_auto_create"
    ).length;

    const confidenceScore = parsedReceipt.parsing.confidenceScore;

    const importReadiness =
      confidenceScore >= 80
        ? "ready"
        : confidenceScore >= 60
        ? "warning"
        : "blocked";

    return {
      user,
      importSource: {
        state: "São Paulo",
        url: data.url,
        accessKey,
      },
      duplicateCheck: {
        alreadyImported: Boolean(existingReceipt),
        existingReceipt,
      },
      preview: {
        issuer: parsedReceipt.issuer,
        totals: parsedReceipt.totals,
        payments: parsedReceipt.payments,
        receiptInfo: parsedReceipt.receiptInfo,
        parsing: parsedReceipt.parsing,
        itemsCount: parsedReceipt.items.length,
        items: resolvedItems,
      },
      // Adiciona no objeto de retorno, junto com duplicateCheck:
      market: existingMarket
        ? {
            id: existingMarket.id,
            name: existingMarket.name,
            displayName: existingMarket.displayName,
          }
        : null,
      summary: {
        matchedItemsCount,
        autoCreateItemsCount,
        totalItems: resolvedItems.length,
      },
      importDecision: {
        readiness: importReadiness,
        confidenceScore,
      },
      warnings: [
        ...parsedReceipt.parsing.warnings,
        ...(existingReceipt ? ["This receipt appears to have already been imported."] : []),
        ...(autoCreateItemsCount > 0
          ? [
              `${autoCreateItemsCount} item(s) do not match existing products and would be auto-created.`,
            ]
          : []),
      ],
    };
  }
}