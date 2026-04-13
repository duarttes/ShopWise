/**
 * Receipt validation schemas.
 *
 * This file centralizes validation rules related to receipt creation input.
 */

import { z } from "zod";

const createReceiptItemSchema = z.object({
  nameRaw: z
    .string()
    .trim()
    .min(1, "Item name must not be empty")
    .max(255, "Item name must contain at most 255 characters"),

  unit: z
    .string()
    .trim()
    .max(30, "Unit must contain at most 30 characters")
    .optional(),

  quantity: z.number().positive("Quantity must be greater than zero").optional(),

  unitPrice: z.number().positive("Unit price must be greater than zero"),

  totalPrice: z.number().positive("Total price must be greater than zero").optional(),

  productId: z.string().uuid("Product id must be a valid UUID").optional(),
});

const createReceiptMarketSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Market name must contain at least 2 characters")
    .max(150, "Market name must contain at most 150 characters"),

  displayName: z
    .string()
    .trim()
    .min(2, "Market display name must contain at least 2 characters")
    .max(150, "Market display name must contain at most 150 characters")
    .optional(),
  cnpj: z
    .string()
    .trim()
    .min(14, "CNPJ must contain at least 14 characters")
    .max(18, "CNPJ must contain at most 18 characters")
    .optional(),

  address: z
    .string()
    .trim()
    .max(255, "Address must contain at most 255 characters")
    .optional(),

  city: z
    .string()
    .trim()
    .max(100, "City must contain at most 100 characters")
    .optional(),

  state: z
    .string()
    .trim()
    .max(2, "State must contain at most 2 characters")
    .optional(),

  zipCode: z
    .string()
    .trim()
    .max(20, "Zip code must contain at most 20 characters")
    .optional(),

  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const createReceiptSchema = z.object({
  userId: z.string().uuid("User id must be a valid UUID"),

  market: createReceiptMarketSchema,

  externalCode: z
    .string()
    .trim()
    .max(100, "External code must contain at most 100 characters")
    .optional(),

  sourceType: z.enum(["MANUAL", "QR_CODE", "IMPORTED"]).optional(),

  totalAmount: z.number().positive("Total amount must be greater than zero"),

  purchasedAt: z.string().datetime("Purchased at must be a valid ISO datetime string"),

  items: z
    .array(createReceiptItemSchema)
    .min(1, "A receipt must contain at least one item"),
});

export type CreateReceiptInput = z.infer<typeof createReceiptSchema>;