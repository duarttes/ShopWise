/**
 * User validation schemas.
 *
 * This file centralizes validation rules related to user input.
 */

import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name must contain at most 100 characters"),

  email: z
    .string()
    .email("Email must be valid")
    .max(150, "Email must contain at most 150 characters"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;