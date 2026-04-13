/**
 * Authorization utilities.
 *
 * Centralizes basic ownership checks used by authenticated endpoints.
 */

import { AppError } from "../errors/app-error";

export function ensureSameUser(authenticatedUserId: string, targetUserId: string): void {
  if (authenticatedUserId !== targetUserId) {
    throw new AppError("You are not allowed to access this resource", 403);
  }
}