/**
 * São Paulo NFC-e QR code parser.
 *
 * This parser handles QR code URLs in the São Paulo public NFC-e consultation format.
 *
 * Example:
 * https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=ACCESS_KEY|VERSION|ENVIRONMENT|EMISSION_TYPE|HASH
 *
 * Current responsibilities:
 * - validate the expected URL structure
 * - extract the query parameter "p"
 * - split the pipe-separated payload
 * - expose the most important parsed values
 *
 * Future responsibilities:
 * - integrate with HTML fetching and receipt page parsing
 * - support more São Paulo page variations if needed
 */

import { AppError } from "../../../shared/errors/app-error";
import { ParsedQrCodePayload } from "./qr-code-parser.types";

export function parseSpNfceQrCode(url: string): ParsedQrCodePayload {
  const parsedUrl = new URL(url);

  const rawQueryValue = parsedUrl.searchParams.get("p");

  if (!rawQueryValue) {
    throw new AppError(
      'São Paulo QR code URL must contain the "p" query parameter',
      400
    );
  }

  const rawSegments = rawQueryValue.split("|");

  const [
    accessKey = null,
    version = null,
    environment = null,
    emissionType = null,
    hash = null,
  ] = rawSegments;

  return {
    stateCode: "35",
    stateName: "São Paulo",
    parser: "sp-nfce-qr-code.parser",
    sourceUrl: url,
    consultationUrl: `${parsedUrl.origin}${parsedUrl.pathname}`,
    accessKey,
    environment,
    version,
    rawQueryValue,
    rawSegments,
    metadata: {
      emissionType,
      hash,
      host: parsedUrl.host,
      pathname: parsedUrl.pathname,
    },
  };
}