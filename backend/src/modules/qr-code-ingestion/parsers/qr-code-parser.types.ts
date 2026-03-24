/**
 * QR code parser types.
 *
 * These shared types define the contract used by state-specific QR code parsers.
 */

export interface ParsedQrCodePayload {
  stateCode: string;
  stateName: string;
  parser: string;
  sourceUrl: string;
  consultationUrl: string;
  accessKey: string | null;
  environment: string | null;
  version: string | null;
  rawQueryValue: string | null;
  rawSegments: string[];
  metadata: Record<string, unknown>;
}