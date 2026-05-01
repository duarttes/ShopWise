/**
 * Product validation schemas.
 *
 * This file centralizes validation rules related to product input.
 */

import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(150, "Name must contain at most 150 characters"),

  normalizedName: z
    .string()
    .trim()
    .min(2, "Normalized name must contain at least 2 characters")
    .max(150, "Normalized name must contain at most 150 characters"),

  brand: z
    .string()
    .trim()
    .max(100, "Brand must contain at most 100 characters")
    .optional(),

  category: z
    .string()
    .trim()
    .max(100, "Category must contain at most 100 characters")
    .optional(),

  unit: z
    .string()
    .trim()
    .max(30, "Unit must contain at most 30 characters")
    .optional(),
});

export const productIdParamSchema = z.object({
  id: z.string().uuid("Product id must be a valid UUID"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductIdParamInput = z.infer<typeof productIdParamSchema>;