/**
 * Resource ownership utilities.
 *
 * Centralizes ownership validation for resources that belong to a specific user.
 */

import { AppError } from "../errors/app-error";

export function ensureResourceOwner(
  authenticatedUserId: string,
  resourceUserId: string
): void {
  if (authenticatedUserId !== resourceUserId) {
    throw new AppError("You are not allowed to access this resource", 403);
  }
}