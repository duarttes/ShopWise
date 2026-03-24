/**
 * Global error handler middleware.
 *
 * Responsibilities:
 * - handle known AppError instances
 * - return safe responses for unexpected errors
 * - avoid exposing internal stack traces in API responses
 * - standardize error response format
 */

import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error";

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
      issues: null,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      success: false,
      message: "Validation failed",
      issues: error.issues,
    });
  }

  console.error(error);

  return response.status(500).json({
    success: false,
    message: "Internal server error",
    issues: null,
  });
}