/**
 * normalizeProductName
 *
 * Converts a raw receipt item name into a simplified canonical form
 * that can be used for product matching.
 *
 * Current strategy:
 * - trims whitespace
 * - converts to lowercase
 * - removes accents
 * - removes special characters
 * - collapses multiple spaces
 * - removes common unit/package noise
 * - removes duplicate spaces again
 *
 * This utility is intentionally heuristic-based for the MVP.
 */

const NOISE_TOKENS = new Set([
  "kg",
  "g",
  "gr",
  "grama",
  "gramas",
  "ml",
  "l",
  "lt",
  "un",
  "und",
  "unid",
  "unidade",
  "unidades",
  "pct",
  "pc",
  "pack",
  "bdj",
  "cx",
  "fr",
  "pet",
  "long",
  "life",
]);

export function normalizeProductName(value: string): string {
  const cleaned = value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tokens = cleaned
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => !NOISE_TOKENS.has(token))
    .filter((token) => !/^\d+(kg|g|ml|l|un)?$/.test(token))
    .filter((token) => !/^\d+$/.test(token));

  return tokens.join(" ").trim();
}