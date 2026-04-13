/**
 * ParseQrCodeService
 *
 * Routes QR code URLs to the correct state-specific parser.
 *
 * Current strategy:
 * - detect the state based on host/path conventions
 * - call the parser for the detected state
 *
 * MVP note:
 * only São Paulo is supported at this stage.
 *
 * Future evolution:
 * - add parsers for other states
 * - add fallback strategies when host detection is ambiguous
 * - integrate page fetching and receipt extraction
 */

import { AppError } from "../../../shared/errors/app-error";
import { ParseQrCodeDTO } from "../dtos/parse-qr-code.dto";
import { parseSpNfceQrCode } from "../parsers/sp-nfce-qr-code.parser";

export class ParseQrCodeService {
  async execute(data: ParseQrCodeDTO) {
    const parsedUrl = new URL(data.url);
    const host = parsedUrl.host.toLowerCase();
    const pathname = parsedUrl.pathname.toLowerCase();

    /**
     * São Paulo NFC-e public consultation pattern.
     */
    const isSaoPauloNfce =
      host.includes("nfce.fazenda.sp.gov.br") &&
      pathname.includes("consultaqrcode.aspx");

    if (isSaoPauloNfce) {
      const parsed = parseSpNfceQrCode(data.url);

      return {
        supported: true,
        parsed,
      };
    }

    throw new AppError(
      "QR code URL format is not supported yet for this state",
      400
    );
  }
}