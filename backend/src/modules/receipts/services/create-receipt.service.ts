/**
 * CreateReceiptService
 *
 * Handles the full receipt creation workflow.
 *
 * Responsibilities:
 * - validate business preconditions
 * - ensure the user exists
 * - prevent duplicate receipts by externalCode when available
 * - find or create the market
 * - resolve products for receipt items
 * - create the receipt
 * - create price records for matched items
 *
 * Matching strategy in the MVP:
 * - if productId is provided in the payload, use it
 * - otherwise, normalize the raw item name and try to find a product
 *   by normalizedName
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { normalizeProductName } from "../../../shared/utils/normalize-product-name";
import { CreateReceiptDTO } from "../dtos/create-receipt.dto";
import { ReceiptsRepository } from "../repositories/receipts.repository";

export class CreateReceiptService {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute(data: CreateReceiptDTO) {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (data.externalCode) {
      const existingReceipt = await this.receiptsRepository.findByExternalCode(
        data.externalCode
      );

      if (existingReceipt) {
        throw new AppError("A receipt with this external code already exists", 409);
      }
    }

    let market = null;

    if (data.market.cnpj) {
      market = await prisma.market.findUnique({
        where: { cnpj: data.market.cnpj },
      });
    }

    if (!market) {
      market = await prisma.market.create({
        data: {
          name: data.market.name,
          cnpj: data.market.cnpj,
          address: data.market.address,
          city: data.market.city,
          state: data.market.state,
          zipCode: data.market.zipCode,
          latitude: data.market.latitude,
          longitude: data.market.longitude,
        },
      });
    }

    /**
     * Resolve products before creating the receipt.
     * This lets the API report matching statistics and create price records
     * for matched items after persistence.
     */
    const resolvedItems = await Promise.all(
      data.items.map(async (item) => {
        let resolvedProductId = item.productId;
        let matchedBy: "payload" | "normalized_name" | null = null;

        if (resolvedProductId) {
          matchedBy = "payload";
        } else {
          const normalizedName = normalizeProductName(item.nameRaw);

          const matchedProduct = await prisma.product.findUnique({
            where: {
              normalizedName,
            },
          });

          if (matchedProduct) {
            resolvedProductId = matchedProduct.id;
            matchedBy = "normalized_name";
          }
        }

        return {
          ...item,
          resolvedProductId,
          matchedBy,
        };
      })
    );

    const receipt = await this.receiptsRepository.create({
      user: {
        connect: { id: data.userId },
      },
      market: {
        connect: { id: market.id },
      },
      externalCode: data.externalCode,
      sourceType: data.sourceType ?? "MANUAL",
      totalAmount: data.totalAmount,
      purchasedAt: new Date(data.purchasedAt),
      items: {
        create: resolvedItems.map((item) => ({
          nameRaw: item.nameRaw,
          unit: item.unit,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          ...(item.resolvedProductId
            ? {
                product: {
                  connect: { id: item.resolvedProductId },
                },
              }
            : {}),
        })),
      },
    });

    const createdReceipt = await prisma.receipt.findUnique({
      where: { id: receipt.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
        market: true,
      },
    });

    if (!createdReceipt) {
      throw new AppError("Receipt could not be loaded after creation", 500);
    }

    let priceRecordsCreated = 0;

    for (const item of createdReceipt.items) {
      if (item.productId) {
        await prisma.priceRecord.create({
          data: {
            product: {
              connect: { id: item.productId },
            },
            market: {
              connect: { id: market.id },
            },
            receiptItem: {
              connect: { id: item.id },
            },
            price: item.unitPrice,
            observedAt: new Date(data.purchasedAt),
          },
        });

        priceRecordsCreated += 1;
      }
    }

    const matchedItems = resolvedItems.filter((item) => Boolean(item.resolvedProductId));
    const unmatchedItems = resolvedItems.filter((item) => !item.resolvedProductId);

    return {
      receipt: createdReceipt,
      ingestion: {
        totalItems: resolvedItems.length,
        matchedItemsCount: matchedItems.length,
        unmatchedItemsCount: unmatchedItems.length,
        matchedItems: matchedItems.map((item) => ({
          nameRaw: item.nameRaw,
          productId: item.resolvedProductId,
          matchedBy: item.matchedBy,
        })),
        unmatchedItems: unmatchedItems.map((item) => ({
          nameRaw: item.nameRaw,
        })),
        priceRecordsCreated,
      },
    };
  }
}