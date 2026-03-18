/**
 * CreateReceiptService
 *
 * Handles the full receipt creation workflow.
 *
 * Responsibilities:
 * - validate business preconditions
 * - ensure the user exists
 * - find or create the market
 * - create the receipt
 * - create receipt items
 * - create price records for each matched item
 *
 * Matching strategy in the MVP:
 * - if productId is provided in the payload, use it
 * - otherwise, normalize the raw item name and try to find a product
 *   by normalizedName
 *
 * This keeps receipt ingestion flexible while still allowing price history
 * and recommendations to work for matched products.
 */

import { Receipt } from "../../../../generated/prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { normalizeProductName } from "../../../shared/utils/normalize-product-name";
import { CreateReceiptDTO } from "../dtos/create-receipt.dto";
import { ReceiptsRepository } from "../repositories/receipts.repository";

export class CreateReceiptService {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute(data: CreateReceiptDTO): Promise<Receipt> {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
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
     * Resolve product connections before creating the receipt.
     * This makes it possible to attach products even when the client
     * does not explicitly send productId.
     */
    const resolvedItems = await Promise.all(
      data.items.map(async (item) => {
        let resolvedProductId = item.productId;

        if (!resolvedProductId) {
          const normalizedName = normalizeProductName(item.nameRaw);

          const matchedProduct = await prisma.product.findUnique({
            where: {
              normalizedName,
            },
          });

          if (matchedProduct) {
            resolvedProductId = matchedProduct.id;
          }
        }

        return {
          ...item,
          resolvedProductId,
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
        items: true,
      },
    });

    if (!createdReceipt) {
      throw new AppError("Receipt could not be loaded after creation", 500);
    }

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
      }
    }

    return receipt;
  }
}