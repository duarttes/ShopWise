/**
 * CreateReceiptItemDTO
 *
 * Represents a single line item inside a receipt creation request.
 */
export interface CreateReceiptItemDTO {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  unit?: string | null;
  productCode?: string | null;
  ean?: string | null;
  categoryHint?: string | null;
}

/**
 * CreateReceiptMarketDTO
 *
 * Represents the market payload used during receipt creation.
 * The service may find an existing market or create a new one.
 */
export interface CreateReceiptMarketDTO {
  name: string;
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}


export interface CreateReceiptPaymentDTO {
  method: string;
  amount: number;
}

/**
 * CreateReceiptDTO
 *
 * Represents the full payload required to create a receipt.
 */
export interface CreateReceiptDTO {
  userId: string;
  externalCode?: string;
  sourceType?: "MANUAL" | "QR_CODE" | "IMPORTED";
  totalAmount: number;
  purchasedAt: string;
  parsingScore?: number | null;
  parsingWarnings?: string[];
  market: {
    name: string;
    displayName?: string;
    cnpj?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
  };
  items: {
    nameRaw: string;
    unit?: string;
    quantity?: number;
    unitPrice: number;
    totalPrice?: number;
    productId?: string;
  }[];
}