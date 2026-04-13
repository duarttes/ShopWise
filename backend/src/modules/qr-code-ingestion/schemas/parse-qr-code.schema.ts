/**
 * QR code parsing validation schemas.
 *
 * This file centralizes validation rules for QR code parsing input.
 */

import { z } from "zod";

export const parseQrCodeSchema = z.object({
  url: z
    .string()
    .trim()
    .url("URL must be valid")
    .min(1, "URL is required"),
});

export type ParseQrCodeInput = z.infer<typeof parseQrCodeSchema>;