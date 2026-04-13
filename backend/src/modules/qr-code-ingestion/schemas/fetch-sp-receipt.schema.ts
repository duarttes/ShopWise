/**
 * São Paulo receipt fetch validation schema.
 */

import { z } from "zod";

export const fetchSpReceiptSchema = z.object({
  url: z
    .string()
    .trim()
    .url("URL must be valid")
    .min(1, "URL is required"),
});

export type FetchSpReceiptInput = z.infer<typeof fetchSpReceiptSchema>;