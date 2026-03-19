/**
 * Authentication validation schemas.
 *
 * Centralizes validation rules for auth requests.
 */

import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name must contain at most 100 characters"),

  email: z
    .string()
    .trim()
    .email("Email must be valid")
    .max(150, "Email must contain at most 150 characters"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters")
    .max(100, "Password must contain at most 100 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email must be valid"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;