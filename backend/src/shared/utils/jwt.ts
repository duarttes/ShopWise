import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

interface JwtPayload {
  sub: string;
  email: string;
}

function getJwtSecret(): Secret {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return secret;
}

function getJwtExpiresIn(): SignOptions["expiresIn"] {
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!expiresIn) {
    return "7d";
  }

  return expiresIn as SignOptions["expiresIn"];
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: getJwtExpiresIn(),
  });
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;

  return decoded;
}