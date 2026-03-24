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
 *
 * Current known limitations:
 * - some pages may vary in item/payment layout
 * - multiple payment methods may require more advanced parsing later
 * - address parsing is heuristic-based
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

/**
 * Converts Brazilian-formatted currency/number strings to numbers.
 *
 * Examples:
 * - "131,92" -> 131.92
 * - "1.234,56" -> 1234.56
 * - "R$ 5,99" -> 5.99
 */
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

/**
 * Returns the first capture group of a regex, or null.
 */
function extractWithRegex(text: string, regex: RegExp): string | null {
  const match = text.match(regex);
  return match?.[1]?.trim() ?? null;
}

/**
 * Normalizes raw text from the HTML body.
 */
function normalizeText(value: string): string {
  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Attempts to extract city and state from a free-form address line.
 *
 * Current heuristic:
 * - split by comma
 * - use the last two segments as city and state when available
 */
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

  const stateCandidate = parts[parts.length - 1] ?? null;
  const cityCandidate = parts[parts.length - 2] ?? null;

  return {
    city: cityCandidate,
    state: stateCandidate,
  };
}

/**
 * Extracts issuer information using the main visible NFC-e block.
 *
 * Expected visible pattern:
 * DOCUMENTO AUXILIAR DA NOTA FISCAL DE CONSUMIDOR ELETRÔNICA
 * <ISSUER NAME>
 * CNPJ: <CNPJ>
 * <ADDRESS>
 * <FIRST ITEM OR TOTAL SECTION>
 */
function extractIssuerInfo(normalizedText: string) {
  const issuerBlockMatch = normalizedText.match(
    /DOCUMENTO AUXILIAR DA NOTA FISCAL DE CONSUMIDOR ELETRÔNICA\s+(.*?)\s+CNPJ:\s*([\d./-]+)\s+(.*?)\s+(?=(?:[A-ZÀ-Ú0-9].*?\(Código:)|Qtd\.\s*total de itens:)/i
  );

  const name = issuerBlockMatch?.[1]?.trim() ?? null;
  const cnpj = issuerBlockMatch?.[2]?.trim() ?? null;
  const address = issuerBlockMatch?.[3]?.trim() ?? null;

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
 * Extracts receipt items by scanning visible lines.
 *
 * Expected pattern for each item:
 * <ITEM NAME> (Código: 123)
 * Qtde.: 1,0000 UN: KG Vl. Unit.: 5,99
 * 5,99
 */
function extractItems(lines: string[]): ParsedReceiptItem[] {
  const items: ParsedReceiptItem[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const codeMatch = line.match(/^(.*?)\s*\(Código:\s*(\d+)\s*\)$/i);

    if (!codeMatch) {
      continue;
    }

    const nameRaw = codeMatch[1]?.trim() ?? null;
    const code = codeMatch[2]?.trim() ?? null;

    const detailLine = lines[i + 1] ?? "";
    const totalLine = lines[i + 2] ?? "";

    const quantity = parseBrazilianNumber(
      extractWithRegex(detailLine, /Qtde\.\:\s*([\d.,]+)/i)
    );

    const unit = extractWithRegex(detailLine, /UN\:\s*([A-Z]+)/i);

    const unitPrice = parseBrazilianNumber(
      extractWithRegex(detailLine, /Vl\.\s*Unit\.\:\s*([\d.,]+)/i)
    );

    /**
     * The line after the item details often contains only the item total.
     * Example: "5,99"
     */
    const totalPrice = parseBrazilianNumber(totalLine);

    if (nameRaw) {
      items.push({
        nameRaw,
        code,
        quantity,
        unit,
        unitPrice,
        totalPrice,
      });
    }
  }

  return items;
}

/**
 * Extracts payment methods from the normalized text.
 *
 * Current supported methods:
 * - Cartão de Crédito
 * - Cartão de Débito
 * - Dinheiro
 * - PIX
 * - Vale Alimentação
 * - Vale Refeição
 */
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

  /**
   * Remove script/style noise before text extraction.
   */
  $("script, style, noscript").remove();

  const bodyText = $("body").text().replace(/\u00a0/g, " ");
  const normalizedText = normalizeText(bodyText);

  /**
   * Build cleaned lines for item extraction and fallback heuristics.
   */
  const lines = bodyText
    .split("\n")
    .map((line) => normalizeText(line))
    .filter(Boolean)
    .filter((line) => {
      const lower = line.toLowerCase();

      return (
        !lower.startsWith("var ") &&
        !lower.includes("document.forms") &&
        !lower.includes("__dopostback") &&
        !lower.includes("javascript") &&
        !lower.includes("function(")
      );
    });

  const issuer = extractIssuerInfo(normalizedText);
  const items = extractItems(lines);

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