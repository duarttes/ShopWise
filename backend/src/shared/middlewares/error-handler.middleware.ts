/**
 * Global error handler middleware.
 *
 * Responsibilities:
 * - handle known AppError instances
 * - return safe responses for unexpected errors
 * - avoid exposing internal stack traces in API responses
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
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation failed",
      issues: error.issues,
    });
  }

  console.error(error);

  return response.status(500).json({
    message: "Internal server error",
  });
}