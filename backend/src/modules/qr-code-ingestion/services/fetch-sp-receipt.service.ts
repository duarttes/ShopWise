import { AppError } from "../../../shared/errors/app-error";
import { parseSpNfceQrCode } from "../parsers/sp-nfce-qr-code.parser";
import { parseSpNfceHtml } from "../parsers/sp-nfce-html.parser";
import { FetchSpReceiptDTO } from "../dtos/fetch-sp-receipt.dto";

export class FetchSpReceiptService {
  async execute(data: FetchSpReceiptDTO) {
    const qrCodeData = parseSpNfceQrCode(data.url);

    const response = await fetch(data.url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 ShopWise/1.0",
      },
    });

    if (!response.ok) {
      throw new AppError(
        `Could not fetch São Paulo NFC-e page. HTTP status: ${response.status}`,
        502
      );
    }

    const html = await response.text();

    if (!html || html.trim().length === 0) {
      throw new AppError("Fetched HTML is empty", 502);
    }

    const parsedReceipt = parseSpNfceHtml(html);

    return {
      qrCode: qrCodeData,
      receipt: parsedReceipt,
    };
  }
}