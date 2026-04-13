/**
 * PreviewSpReceiptImportDTO
 *
 * Represents the payload required to generate a preview
 * for importing a São Paulo NFC-e receipt.
 */
export interface PreviewSpReceiptImportDTO {
  userId: string;
  url: string;
}