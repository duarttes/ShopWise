/**
 * São Paulo NFC-e HTML parser.
 *
 * Parses the public consultation HTML returned by the São Paulo NFC-e portal.
 *
 * Current responsibilities:
 * - extract store identification
 * - extract items
 * - extract totals
 * - extract payment information
 * - extract issuance metadata
 *
 * MVP note:
 * this parser is intentionally defensive and text-based because
 * public tax portal HTML can change over time.
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

export function parseSpNfceHtml(html: string): ParsedSpReceiptPage {
  const $ = cheerio.load(html);
  const pageText = $.text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
  const lines = $("body")
    .text()
    .split("\n")
    .map((line) => line.replace(/\u00a0/g, " ").trim())
    .filter(Boolean);

  const issuerName = lines[1] ?? null;
  const cnpjLine = lines.find((line) => line.startsWith("CNPJ:")) ?? null;
  const addressLine =
    lines.find(
      (line) =>
        !line.startsWith("CNPJ:") &&
        line.includes("SP") &&
        line.includes(",") &&
        !line.includes("Qtde.:")
    ) ?? null;

  const cnpj = cnpjLine?.replace("CNPJ:", "").trim() ?? null;

  let city: string | null = null;
  let state: string | null = null;

  if (addressLine) {
    const addressParts = addressLine.split(",").map((part) => part.trim());
    city = addressParts[addressParts.length - 2] ?? null;
    state = addressParts[addressParts.length - 1] ?? null;
  }

  const itemNameIndexes: number[] = [];

  lines.forEach((line, index) => {
    if (line.includes("(Código:") && !line.startsWith("Chave de acesso")) {
      itemNameIndexes.push(index);
    }
  });

  const items: ParsedReceiptItem[] = itemNameIndexes.map((index) => {
    const itemLine = lines[index] ?? "";
    const detailLine = lines[index + 1] ?? "";
    const totalLine = lines[index + 2] ?? "";

    const nameRaw =
      itemLine.replace(/\(Código:\s*\d+\s*\)/i, "").trim() || itemLine.trim();

    const code = extractWithRegex(itemLine, /\(Código:\s*(\d+)\s*\)/i);

    const quantity = parseBrazilianNumber(
      extractWithRegex(detailLine, /Qtde\.\:(.*?)UN\:/i)
    );

    const unit = extractWithRegex(detailLine, /UN\:\s*([A-Z]+)/i);

    const unitPrice = parseBrazilianNumber(
      extractWithRegex(detailLine, /Vl\.\s*Unit\.\:\s*(.*?)Vl\.\s*Total/i)
    );

    const totalPrice = parseBrazilianNumber(totalLine);

    return {
      nameRaw,
      code,
      quantity,
      unit,
      unitPrice,
      totalPrice,
    };
  });

  const itemsCount = parseBrazilianNumber(
    extractWithRegex(pageText, /Qtd\.\s*total de itens:\s*(\d+)/i)
  );

  const totalAmount = parseBrazilianNumber(
    extractWithRegex(pageText, /Valor total R\$\:\s*([\d.,]+)/i)
  );

  const discountsAmount = parseBrazilianNumber(
    extractWithRegex(pageText, /Descontos R\$\:\s*([\d.,]+)/i)
  );

  const amountToPay = parseBrazilianNumber(
    extractWithRegex(pageText, /Valor a pagar R\$\:\s*([\d.,]+)/i)
  );

  const changeAmount = parseBrazilianNumber(
    extractWithRegex(pageText, /Troco\s*([\d.,NaN]+)/i)
  );

  const issuedAt = extractWithRegex(
    pageText,
    /Número:\s*([\d]+)\s*Série:\s*([\d]+)\s*Emissão:\s*([^-\n]+)/
  );

  const number = extractWithRegex(pageText, /Número:\s*([\d]+)/i);
  const series = extractWithRegex(pageText, /Série:\s*([\d]+)/i);
  const protocol = extractWithRegex(
    pageText,
    /Protocolo de Autorização:\s*([\d]+)/
  );

  const accessKeyRaw = extractWithRegex(
    pageText,
    /Chave de acesso:\s*([\d\s]+)/
  );

  const accessKey = accessKeyRaw ? accessKeyRaw.replace(/\s+/g, "") : null;

  const environment = extractWithRegex(
    pageText,
    /(Ambiente de Produção|Ambiente de Homologação)/i
  );

  const payments: ParsedPayment[] = [];
  const paymentMatch = pageText.match(/Cartão de Crédito\s+([\d.,]+)/i);

  if (paymentMatch) {
    payments.push({
      method: "Cartão de Crédito",
      amount: parseBrazilianNumber(paymentMatch[1]),
    });
  }

  return {
    issuer: {
      name: issuerName,
      cnpj,
      address: addressLine,
      city,
      state,
    },
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