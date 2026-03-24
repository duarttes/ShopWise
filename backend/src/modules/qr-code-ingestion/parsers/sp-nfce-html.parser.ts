/**
 * São Paulo NFC-e HTML parser.
 *
 * Parses the public consultation HTML returned by the São Paulo NFC-e portal.
 *
 * Current responsibilities:
 * - extract issuer/store identification
 * - extract receipt items
 * - extract totals
 * - extract payment information
 * - extract issuance metadata
 *
 * Important notes:
 * - public tax portal HTML may change over time
 * - this parser is intentionally defensive and text-based
 * - parsing is focused on the visible receipt content, not page layout scripts
 */

import * as cheerio from "cheerio";

interface ParsedReceiptItem {
  nameRaw: string;
  code: string | null;
  quantity: number | null;
  unit: string | null;
  unitPrice: number | null;
  totalPrice: number | null;
}

interface ParsedPayment {
  method: string;
  amount: number | null;
}

export interface ParsedSpReceiptPage {
  issuer: {
    name: string | null;
    cnpj: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
  };
  items: ParsedReceiptItem[];
  totals: {
    itemsCount: number | null;
    totalAmount: number | null;
    discountsAmount: number | null;
    amountToPay: number | null;
    changeAmount: number | null;
  };
  payments: ParsedPayment[];
  receiptInfo: {
    number: string | null;
    series: string | null;
    issuedAt: string | null;
    protocol: string | null;
    accessKey: string | null;
    environment: string | null;
  };
}

function parseBrazilianNumber(value?: string | null): number | null {
  if (!value) return null;

  const cleaned = value
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  if (!cleaned) return null;

  const parsed = Number(cleaned);

  return Number.isNaN(parsed) ? null : parsed;
}

function extractWithRegex(text: string, regex: RegExp): string | null {
  const match = text.match(regex);
  return match?.[1]?.trim() ?? null;
}

function normalizeText(value: string): string {
  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(value?: string | null): string | null {
  if (!value) return null;

  const $ = cheerio.load(`<div>${value}</div>`);
  return $("div").text().trim() || null;
}

function extractCityAndState(addressLine?: string | null): {
  city: string | null;
  state: string | null;
} {
  if (!addressLine) {
    return {
      city: null,
      state: null,
    };
  }

  const parts = addressLine
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 2) {
    return {
      city: null,
      state: null,
    };
  }

  return {
    city: parts[parts.length - 2] ?? null,
    state: parts[parts.length - 1] ?? null,
  };
}

/**
 * Extracts issuer information directly from the full normalized text.
 *
 * Strategy:
 * - name is captured between the NFC-e title and the CNPJ
 * - address is captured between CNPJ and the end of ", SP"
 *
 * This is intentionally state-specific for São Paulo.
 */
function extractIssuerInfo(normalizedText: string) {
  const nameMatch = normalizedText.match(
    /DOCUMENTO AUXILIAR DA NOTA FISCAL DE CONSUMIDOR ELETRÔNICA\s+(.*?)\s+CNPJ:/i
  );

  const cnpjMatch = normalizedText.match(/CNPJ:\s*([\d./-]+)/i);

  /**
   * Primary address extraction:
   * capture from CNPJ to the first explicit ", SP"
   */
  let addressMatch = normalizedText.match(
    /CNPJ:\s*[\d./-]+\s+(.*?,\s*SP)(?=\s+[A-ZÀ-Ú0-9].*?\(Código:\s*\d+\)|\s+Qtd\.\s*total de itens:)/i
  );

  /**
   * Fallback:
   * capture everything after CNPJ until the first item block,
   * then trim the address until ", SP".
   */
  if (!addressMatch) {
    const fallbackMatch = normalizedText.match(
      /CNPJ:\s*[\d./-]+\s+(.*?)(?=\s+[A-ZÀ-Ú0-9].*?\(Código:\s*\d+\)|\s+Qtd\.\s*total de itens:)/i
    );

    if (fallbackMatch?.[1]) {
      const addressUntilState = fallbackMatch[1].match(/^(.*?,\s*SP)/i);

      if (addressUntilState?.[1]) {
        addressMatch = [addressUntilState[0], addressUntilState[1]] as RegExpMatchArray;
      }
    }
  }

  const name = decodeHtmlEntities(nameMatch?.[1]?.trim() ?? null);
  const cnpj = cnpjMatch?.[1]?.trim() ?? null;
  const address = decodeHtmlEntities(addressMatch?.[1]?.trim() ?? null);

  const { city, state } = extractCityAndState(address);

  return {
    name,
    cnpj,
    address,
    city,
    state,
  };
}

/**
 * Item regex over the full normalized text.
 *
 * Expected visible pattern:
 * <ITEM NAME> (Código: 123)
 * Qtde.: 1,0000 UN: KG Vl. Unit.: 5,99 Vl. Total 5,99
 */
const ITEM_REGEX =
  /(.*?)\s*\(Código:\s*(\d+)\s*\)\s*Qtde\.\:\s*([\d.,]+)\s*UN\:\s*([A-Z]+)\s*Vl\.\s*Unit\.\:\s*([\d.,]+)\s*Vl\.\s*Total\s*([\d.,]+)(?=\s+.*?\(Código:\s*\d+\s*\)|\s+Qtd\.\s*total de itens:|$)/gi;

/**
 * Cleans the first item when the regex captures header/address text before it.
 *
 * Example problematic capture:
 * "... AMERICANA , SP MAMAO FORMOSA Kg"
 *
 * This function keeps only:
 * "MAMAO FORMOSA Kg"
 */
function sanitizeItemName(rawName: string): string {
  let cleaned = rawName.trim();

  /**
   * If the capture still contains the NFC-e header, cut everything before the last
   * occurrence of ", SP ".
   */
  if (
    cleaned.includes("DOCUMENTO AUXILIAR") ||
    cleaned.includes("CNPJ:") ||
    cleaned.includes(", SP ")
  ) {
    const afterStateMatch = cleaned.match(/.*?,\s*SP\s+(.*)$/i);

    if (afterStateMatch?.[1]) {
      cleaned = afterStateMatch[1].trim();
    }
  }

  return decodeHtmlEntities(cleaned) ?? cleaned;
}

function extractItems(normalizedText: string): ParsedReceiptItem[] {
  const items: ParsedReceiptItem[] = [];
  const regex = new RegExp(ITEM_REGEX);

  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(normalizedText)) !== null) {
    const rawName = match[1]?.trim() ?? null;
    const code = match[2]?.trim() ?? null;
    const quantity = parseBrazilianNumber(match[3]);
    const unit = match[4]?.trim() ?? null;
    const unitPrice = parseBrazilianNumber(match[5]);
    const totalPrice = parseBrazilianNumber(match[6]);

    if (!rawName) {
      continue;
    }

    const nameRaw = sanitizeItemName(rawName);

    if (!nameRaw || nameRaw.startsWith("CNPJ:")) {
      continue;
    }

    items.push({
      nameRaw,
      code,
      quantity,
      unit,
      unitPrice,
      totalPrice,
    });
  }

  return items;
}

function extractPayments(normalizedText: string): ParsedPayment[] {
  const payments: ParsedPayment[] = [];

  const paymentPatterns = [
    "Cartão de Crédito",
    "Cartão de Débito",
    "Dinheiro",
    "PIX",
    "Vale Alimentação",
    "Vale Refeição",
  ];

  for (const method of paymentPatterns) {
    const regex = new RegExp(`${method}\\s+([\\d.,]+)`, "i");
    const match = normalizedText.match(regex);

    if (match) {
      payments.push({
        method,
        amount: parseBrazilianNumber(match[1]),
      });
    }
  }

  return payments;
}

export function parseSpNfceHtml(html: string): ParsedSpReceiptPage {
  const $ = cheerio.load(html);

  $("script, style, noscript").remove();

  const bodyText = $("body").text().replace(/\u00a0/g, " ");
  const normalizedText = normalizeText(bodyText);

  const issuer = extractIssuerInfo(normalizedText);
  const items = extractItems(normalizedText);

  const number = extractWithRegex(normalizedText, /Número:\s*([\d]+)/i);
  const series = extractWithRegex(normalizedText, /Série:\s*([\d]+)/i);

  const issuedAtMatch = normalizedText.match(
    /Emissão:\s*(\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2})/i
  );
  const issuedAt = issuedAtMatch?.[1]?.trim() ?? null;

  const protocol = extractWithRegex(
    normalizedText,
    /Protocolo de Autorização:\s*([\d]+)/i
  );

  const accessKeyRaw = extractWithRegex(
    normalizedText,
    /Chave de acesso:\s*([\d\s]+)/i
  );
  const accessKey = accessKeyRaw ? accessKeyRaw.replace(/\s+/g, "") : null;

  const environment = extractWithRegex(
    normalizedText,
    /(Ambiente de Produção|Ambiente de Homologação)/i
  );

  const itemsCount = parseBrazilianNumber(
    extractWithRegex(normalizedText, /Qtd\.\s*total de itens:\s*(\d+)/i)
  );

  const totalAmount = parseBrazilianNumber(
    extractWithRegex(normalizedText, /Valor total R\$\:\s*([\d.,]+)/i)
  );

  const discountsAmount = parseBrazilianNumber(
    extractWithRegex(normalizedText, /Descontos R\$\:\s*([\d.,]+)/i)
  );

  const amountToPay = parseBrazilianNumber(
    extractWithRegex(normalizedText, /Valor a pagar R\$\:\s*([\d.,]+)/i)
  );

  const changeAmount = parseBrazilianNumber(
    extractWithRegex(normalizedText, /Troco\s*([\d.,]+)/i)
  );

  const payments = extractPayments(normalizedText);

  return {
    issuer,
    items,
    totals: {
      itemsCount,
      totalAmount,
      discountsAmount,
      amountToPay,
      changeAmount,
    },
    payments,
    receiptInfo: {
      number,
      series,
      issuedAt,
      protocol,
      accessKey,
      environment,
    },
  };
}