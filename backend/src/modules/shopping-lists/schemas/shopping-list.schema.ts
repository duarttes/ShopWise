/**
 * Shopping list validation schemas.
 *
 * This file centralizes validation rules related to shopping lists and list items.
 */

import { z } from "zod";

export const createShoppingListSchema = z.object({
  userId: z.string().uuid("User id must be a valid UUID"),

  name: z
    .string()
    .trim()
    .min(2, "List name must contain at least 2 characters")
    .max(120, "List name must contain at most 120 characters"),
});

export const addShoppingListItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Item name must not be empty")
    .max(150, "Item name must contain at most 150 characters"),

  quantity: z.number().positive("Quantity must be greater than zero").optional(),

  unit: z
    .string()
    .trim()
    .max(30, "Unit must contain at most 30 characters")
    .optional(),

  productId: z.string().uuid("Product id must be a valid UUID").optional(),
});

export type CreateShoppingListInput = z.infer<typeof createShoppingListSchema>;
export type AddShoppingListItemInput = z.infer<typeof addShoppingListItemSchema>;