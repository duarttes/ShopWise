/**
 * São Paulo receipt preview validation schema.
 */

import { z } from "zod";

export const previewSpReceiptImportSchema = z.object({
  userId: z.string().uuid("User id must be a valid UUID"),

  url: z
    .string()
    .trim()
    .url("URL must be valid")
    .min(1, "URL is required"),
});

export type PreviewSpReceiptImportInput = z.infer<
  typeof previewSpReceiptImportSchema
>;