/**
 * Authentication middleware.
 *
 * Protects routes that require a valid JWT access token.
 * If the token is valid, the authenticated user is attached to request.user.
 */

import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { verifyToken } from "../utils/jwt";

export function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Authorization token is missing", 401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Authorization token is invalid", 401);
  }

  const decoded = verifyToken(token);

  request.user = {
    id: decoded.sub,
    email: decoded.email,
  };

  next();
}