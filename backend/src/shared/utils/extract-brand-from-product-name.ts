/**
 * extractBrandFromProductName
 *
 * Tries to infer a brand from a raw product name using simple heuristics.
 * This is intentionally conservative to avoid obviously wrong brands.
 */

const IGNORED_PREFIX_TOKENS = new Set([
  "REFRIG",
  "BEB",
  "BEBIDA",
  "SUCO",
  "LEITE",
  "ARROZ",
  "FEIJAO",
  "MACARRAO",
  "BISCOITO",
  "BISC",
  "TORRADA",
  "MINI",
  "CAFE",
  "CHA",
  "AGUA",
  "DET",
  "SABAO",
  "AMAC",
  "PAPEL",
  "ALCOOL",
  "MOLHO",
  "EXTRATO",
  "FARINHA",
  "ACUCAR",
  "SAL",
  "OLEO",
]);

const SIZE_OR_MEASURE_PATTERN =
  /^(\d+([.,]\d+)?(KG|G|GR|L|LT|ML|UN|UND|UNID)|\d+)$/i;

export function extractBrandFromProductName(
  rawName: string
): string | undefined {
  const tokens = rawName
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (tokens.length < 2) {
    return undefined;
  }

  const candidate = tokens.find((token) => {
    const upper = token.toUpperCase();

    if (upper.length < 3) {
      return false;
    }

    if (IGNORED_PREFIX_TOKENS.has(upper)) {
      return false;
    }

    if (SIZE_OR_MEASURE_PATTERN.test(upper)) {
      return false;
    }

    return true;
  });

  if (!candidate) {
    return undefined;
  }

  const normalizedCandidate = candidate.toUpperCase();

  if (normalizedCandidate.length < 3) {
    return undefined;
  }

  return normalizedCandidate;
}