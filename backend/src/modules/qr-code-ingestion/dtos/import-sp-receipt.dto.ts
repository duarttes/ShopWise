/**
 * ImportSpReceiptDTO
 *
 * Represents the payload required to fetch, parse and import
 * a São Paulo NFC-e public consultation page as a ShopWise receipt.
 */
export interface ImportSpReceiptDTO {
  userId: string;
  url: string;
}