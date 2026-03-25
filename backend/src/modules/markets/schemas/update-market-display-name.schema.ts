/**
 * Market display name update validation schema.
 */

import { z } from "zod";

export const updateMarketDisplayNameSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must contain at least 2 characters")
    .max(150, "Display name must contain at most 150 characters"),
});

export type UpdateMarketDisplayNameInput = z.infer<
  typeof updateMarketDisplayNameSchema
>;