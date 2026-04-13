/**
 * Date range utilities.
 *
 * Centralizes parsing and validation of optional date range filters.
 */

import { AppError } from "../errors/app-error";

export interface DateRangeParams {
  startDate?: Date;
  endDate?: Date;
}

export function parseDateRange(
  startDate?: string,
  endDate?: string
): DateRangeParams {
  const parsedStartDate = startDate ? new Date(startDate) : undefined;
  const parsedEndDate = endDate ? new Date(endDate) : undefined;

  if (parsedStartDate && Number.isNaN(parsedStartDate.getTime())) {
    throw new AppError("startDate must be a valid date", 400);
  }

  if (parsedEndDate && Number.isNaN(parsedEndDate.getTime())) {
    throw new AppError("endDate must be a valid date", 400);
  }

  if (parsedStartDate && parsedEndDate && parsedStartDate > parsedEndDate) {
    throw new AppError("startDate cannot be greater than endDate", 400);
  }

  return {
    startDate: parsedStartDate,
    endDate: parsedEndDate,
  };
}