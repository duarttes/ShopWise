/**
 * Market validation schemas.
 *
 * This file centralizes validation rules related to markets.
 */

import { z } from "zod";

export const createMarketSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Market name must contain at least 2 characters")
    .max(150, "Market name must contain at most 150 characters"),

  displayName: z
    .string()
    .trim()
    .min(2, "Display name must contain at least 2 characters")
    .max(150, "Display name must contain at most 150 characters")
    .optional(),

  cnpj: z.string().trim().max(20).optional(),
  address: z.string().trim().max(255).optional(),
  city: z.string().trim().max(100).optional(),
  state: z.string().trim().max(10).optional(),
  zipCode: z.string().trim().max(20).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type CreateMarketInput = z.infer<typeof createMarketSchema>;