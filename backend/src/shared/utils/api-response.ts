/**
 * API response helpers.
 *
 * Centralizes standardized success response shapes used across the application.
 */

export interface SuccessResponseParams<T> {
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
}

export function buildSuccessResponse<T>({
  message,
  data,
  meta,
}: SuccessResponseParams<T>) {
  return {
    success: true,
    message: message ?? null,
    data,
    meta: meta ?? null,
  };
}