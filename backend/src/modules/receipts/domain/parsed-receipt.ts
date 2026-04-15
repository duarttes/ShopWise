export interface ParsedReceiptItem {
  description: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  totalPrice?: number;
  gtin?: string;
  brandText?: string;
}

export interface ParsedReceipt {
  accessKey: string;
  state?: string;
  url?: string;
  issuedAt?: string;
  storeName?: string;
  storeDocument?: string;
  total?: number;
  items: ParsedReceiptItem[];
}