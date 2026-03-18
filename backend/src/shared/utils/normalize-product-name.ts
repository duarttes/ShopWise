/**
 * normalizeProductName
 *
 * Converts a raw receipt item name into a simplified canonical form
 * that can be used for basic product matching in the MVP.
 *
 * Current strategy:
 * - trims whitespace
 * - converts to lowercase
 * - removes accents
 * - removes special characters
 * - collapses multiple spaces
 *
 * Future improvements may include:
 * - stop-word removal
 * - unit extraction
 * - brand extraction
 * - fuzzy matching
 */
export function normalizeProductName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
