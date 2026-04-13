/**
 * Pagination utilities.
 *
 * This file centralizes pagination parsing and response metadata formatting.
 */

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export function parsePagination(
  page?: string,
  limit?: string
): PaginationParams {
  const parsedPage = Number(page ?? 1);
  const parsedLimit = Number(limit ?? 10);

  const safePage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const safeLimit =
    Number.isNaN(parsedLimit) || parsedLimit < 1
      ? 10
      : Math.min(parsedLimit, 100);

  const skip = (safePage - 1) * safeLimit;

  return {
    page: safePage,
    limit: safeLimit,
    skip,
  };
}

export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number
) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}