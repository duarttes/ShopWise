/**
 * Express type augmentation.
 *
 * Adds authenticated user information to the Express Request object.
 */

import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}