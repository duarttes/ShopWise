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
 * Parsing strategy:
 * 1. Prefer structured HTML extraction for issuer and items
 * 2. Fallback to normalized text regex when needed
 *
 * Notes:
 * - São Paulo NFC-e pages can vary in layout
 * - item code may be numeric or alphanumeric
 * - units may vary: KG, UN, UNID, PACOTE, CX, etc.
 * - duplicated receipt lines must be preserved
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

function sanitizeItemName(rawName: string): string {
  return decodeHtmlEntities(rawName.trim()) ?? rawName.trim();
}

function looksLikeValidItem(item: ParsedReceiptItem): boolean {
  if (!item.nameRaw || item.nameRaw.length < 2) {
    return false;
  }

  if (
    item.nameRaw.includes("DOCUMENTO AUXILIAR") ||
    item.nameRaw.startsWith("CNPJ:") ||
    item.nameRaw.startsWith("Chave de acesso")
  ) {
    return false;
  }

  if (item.unitPrice == null && item.totalPrice == null) {
    return false;
  }

  return true;
}

/**
 * Structured issuer extraction for layouts where:
 * - name is in #u20
 * - following .text blocks contain CNPJ and address
 */
function extractIssuerInfoFromHtml($: cheerio.CheerioAPI) {
  const rawName = $("#u20").first().text().trim() || null;

  const textBlocks = $(".txtCenter .text")
    .map((_, el) => normalizeText($(el).text()))
    .get()
    .filter(Boolean);

  const cnpjBlock =
    textBlocks.find((text) => text.toUpperCase().includes("CNPJ")) ?? null;

  const addressBlock =
    textBlocks.find((text) => !text.toUpperCase().includes("CNPJ")) ?? null;

  const cnpj = cnpjBlock
    ? extractWithRegex(cnpjBlock, /CNPJ:\s*([\d./-]+)/i)
    : null;

  const address = decodeHtmlEntities(addressBlock);
  const name = decodeHtmlEntities(rawName);

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
 * Text fallback for issuer extraction.
 */
function extractIssuerInfoFromText(normalizedText: string) {
  const nameMatch = normalizedText.match(
    /DOCUMENTO AUXILIAR DA NOTA FISCAL DE CONSUMIDOR ELETRÔNICA\s+(.*?)\s+CNPJ:/i
  );

  const cnpjMatch = normalizedText.match(/CNPJ:\s*([\d./-]+)/i);

  let addressMatch = normalizedText.match(
    /CNPJ:\s*[\d./-]+\s+(.*?,\s*SP)(?=\s+[A-ZÀ-Ú0-9].*?\(Código:\s*[A-Z0-9]+\)|\s+Qtd\.\s*total de itens:)/i
  );

  if (!addressMatch) {
    const fallbackMatch = normalizedText.match(
      /CNPJ:\s*[\d./-]+\s+(.*?)(?=\s+[A-ZÀ-Ú0-9].*?\(Código:\s*[A-Z0-9]+\)|\s+Qtd\.\s*total de itens:)/i
    );

    if (fallbackMatch?.[1]) {
      const addressUntilState = fallbackMatch[1].match(/^(.*?,\s*SP)/i);

      if (addressUntilState?.[1]) {
        addressMatch = [
          addressUntilState[0],
          addressUntilState[1],
        ] as RegExpMatchArray;
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

function extractIssuerInfo(
  $: cheerio.CheerioAPI,
  normalizedText: string
): ParsedSpReceiptPage["issuer"] {
  const htmlIssuer = extractIssuerInfoFromHtml($);

  if (htmlIssuer.name || htmlIssuer.cnpj || htmlIssuer.address) {
    return htmlIssuer;
  }

  return extractIssuerInfoFromText(normalizedText);
}

/**
 * Extract items from the structured HTML table used in this layout.
 *
 * Important:
 * - duplicated rows must be preserved
 * - no deduplication should happen here
 */
function extractItemsFromHtmlTable($: cheerio.CheerioAPI): ParsedReceiptItem[] {
  const items: ParsedReceiptItem[] = [];

  $("#tabResult tr").each((_, row) => {
    const rowEl = $(row);

    const nameRaw = sanitizeItemName(
      rowEl.find(".txtTit").first().text().trim()
    );

    if (!nameRaw) {
      return;
    }

    const codeText = normalizeText(rowEl.find(".RCod").text());
    const quantityText = normalizeText(rowEl.find(".Rqtd").text());
    const unitText = normalizeText(rowEl.find(".RUN").text());
    const unitPriceText = normalizeText(rowEl.find(".RvlUnit").text());
    const totalPriceText = normalizeText(rowEl.find(".valor").first().text());

    const code =
      extractWithRegex(codeText, /Código:\s*([A-Z0-9]+)/i) ?? null;

    const quantity =
      parseBrazilianNumber(
        extractWithRegex(quantityText, /Qtde\.\:\s*([\d.,]+)/i)
      ) ?? null;

    const unit =
      extractWithRegex(unitText, /UN\:\s*([A-Z0-9]+)/i) ?? null;

    const unitPrice =
      parseBrazilianNumber(
        extractWithRegex(unitPriceText, /Vl\.\s*Unit\.\:\s*([\d.,]+)/i)
      ) ?? null;

    const totalPrice = parseBrazilianNumber(totalPriceText);

    const item: ParsedReceiptItem = {
      nameRaw,
      code,
      quantity,
      unit,
      unitPrice,
      totalPrice,
    };

    if (looksLikeValidItem(item)) {
      items.push(item);
    }
  });

  return items;
}

/**
 * Generic structured HTML fallback.
 *
 * Important:
 * - duplicated rows must be preserved
 * - no deduplication should happen here
 */
function extractItemsFromHtmlCandidates($: cheerio.CheerioAPI): ParsedReceiptItem[] {
  const items: ParsedReceiptItem[] = [];
  const candidateTexts = new Set<string>();

  const candidateSelectors = ["table tr", ".item", ".produto", ".prod", "li", "div"];

  for (const selector of candidateSelectors) {
    $(selector).each((_, element) => {
      const text = normalizeText($(element).text());

      if (!text) return;
      if (!text.includes("(Código:")) return;
      if (!text.includes("Qtde.:")) return;

      candidateTexts.add(text);
    });
  }

  for (const text of candidateTexts) {
    const structuredMatch = text.match(
      /(.*?)\s*\(Código:\s*([A-Z0-9]+)\s*\)\s*Qtde\.\:\s*([\d.,]+)\s*UN\:\s*([A-Z0-9]+)\s*Vl\.\s*Unit\.\:\s*([\d.,]+)\s*Vl\.\s*Total\s*([\d.,]+)/i
    );

    if (!structuredMatch) {
      continue;
    }

    const item: ParsedReceiptItem = {
      nameRaw: sanitizeItemName(structuredMatch[1] ?? ""),
      code: structuredMatch[2]?.trim() ?? null,
      quantity: parseBrazilianNumber(structuredMatch[3]),
      unit: structuredMatch[4]?.trim() ?? null,
      unitPrice: parseBrazilianNumber(structuredMatch[5]),
      totalPrice: parseBrazilianNumber(structuredMatch[6]),
    };

    if (looksLikeValidItem(item)) {
      items.push(item);
    }
  }

  return items;
}

/**
 * Text fallback for items.
 * Supports alphanumeric codes and variable units.
 *
 * Important:
 * - duplicated rows must be preserved
 * - no deduplication should happen here
 */
const ITEM_REGEX =
  /(.*?)\s*\(Código:\s*([A-Z0-9]+)\s*\)\s*Qtde\.\:\s*([\d.,]+)\s*UN\:\s*([A-Z0-9]+)\s*Vl\.\s*Unit\.\:\s*([\d.,]+)\s*Vl\.\s*Total\s*([\d.,]+)(?=\s+.*?\(Código:\s*[A-Z0-9]+\s*\)|\s+Qtd\.\s*total de itens:|$)/gi;

function extractItemsFromText(normalizedText: string): ParsedReceiptItem[] {
  const items: ParsedReceiptItem[] = [];
  const regex = new RegExp(ITEM_REGEX);

  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(normalizedText)) !== null) {
    const item: ParsedReceiptItem = {
      nameRaw: sanitizeItemName(match[1] ?? ""),
      code: match[2]?.trim() ?? null,
      quantity: parseBrazilianNumber(match[3]),
      unit: match[4]?.trim() ?? null,
      unitPrice: parseBrazilianNumber(match[5]),
      totalPrice: parseBrazilianNumber(match[6]),
    };

    if (looksLikeValidItem(item)) {
      items.push(item);
    }
  }

  return items;
}

function extractItems(
  $: cheerio.CheerioAPI,
  normalizedText: string
): ParsedReceiptItem[] {
  const tableItems = extractItemsFromHtmlTable($);

  if (tableItems.length > 0) {
    return tableItems;
  }

  const candidateHtmlItems = extractItemsFromHtmlCandidates($);

  if (candidateHtmlItems.length > 0) {
    return candidateHtmlItems;
  }

  return extractItemsFromText(normalizedText);
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

  const issuer = extractIssuerInfo($, normalizedText);
  const items = extractItems($, normalizedText);

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