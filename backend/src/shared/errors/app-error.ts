/**
 * AppError
 *
 * Custom application error used to return controlled HTTP errors.
 * This helps us avoid leaking raw internal errors to API consumers.
 */
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}