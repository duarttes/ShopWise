/**
 * Market validation schemas.
 *
 * This file centralizes validation rules related to market input.
 */

import { z } from "zod";

export const createMarketSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(150, "Name must contain at most 150 characters"),

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

export type CreateMarketInput = z.infer<typeof createMarketSchema>;