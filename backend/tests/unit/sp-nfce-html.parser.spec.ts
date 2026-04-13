/**
 * Regression tests for São Paulo NFC-e HTML parser.
 *
 * These tests protect real-world receipt layouts already validated
 * during development.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseSpNfceHtml } from "../../src/modules/qr-code-ingestion/parsers/sp-nfce-html.parser";

function loadFixture(fileName: string) {
  return readFileSync(
    join(process.cwd(), "tests", "fixtures", "sp-receipts", fileName),
    "utf-8"
  );
}

describe("parseSpNfceHtml", () => {
  it("should parse São Paulo receipt layout A correctly", () => {
    const html = loadFixture("sp-layout-a.html");

    const result = parseSpNfceHtml(html);

    expect(result.issuer.name).toBeTruthy();
    expect(result.issuer.cnpj).toBeTruthy();
    expect(result.totals.itemsCount).toBeGreaterThan(0);
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.receiptInfo.accessKey).toBeTruthy();

    expect(result.items.length).toBe(result.totals.itemsCount);
  });

  it("should parse São Paulo receipt layout B table structure correctly", () => {
    const html = loadFixture("sp-layout-b.html");

    const result = parseSpNfceHtml(html);

    expect(result.issuer.name).toBe("WMB SUPERMERCADOS DO BRASIL LTDA");
    expect(result.issuer.cnpj).toBe("00.063.960/0568-21");
    expect(result.issuer.city).toBe("Americana");
    expect(result.issuer.state).toBe("SP");

    expect(result.totals.itemsCount).toBe(52);
    expect(result.items.length).toBe(52);

    expect(result.items[0]).toMatchObject({
      nameRaw: "MINI TORRADAS 350GR",
      code: "S224895",
      quantity: 2,
      unit: "UNID",
      unitPrice: 17.48,
      totalPrice: 34.96,
    });

    expect(result.items[result.items.length - 1]).toMatchObject({
      nameRaw: "CJ PRATOS CHURRASCO",
      code: "S254669",
      quantity: 1,
      unit: "UNID",
      unitPrice: 150.08,
      totalPrice: 150.08,
    });

    expect(result.receiptInfo.number).toBe("27674");
    expect(result.receiptInfo.series).toBe("6");
    expect(result.receiptInfo.accessKey).toBe(
      "35251200063960056821650060000276741646028006"
    );
  });

  it("should preserve duplicated receipt lines when the same item appears more than once", () => {
    const html = loadFixture("sp-duplicate-item.html");

    const result = parseSpNfceHtml(html);

    expect(result.totals.itemsCount).toBeGreaterThan(0);
    expect(result.items.length).toBe(result.totals.itemsCount);

    const groupedBySignature = result.items.reduce<Record<string, number>>(
      (acc, item) => {
        const key = [
          item.nameRaw,
          item.code,
          item.quantity,
          item.unit,
          item.unitPrice,
          item.totalPrice,
        ].join("|");

        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      },
      {}
    );

    const duplicatedGroups = Object.values(groupedBySignature).filter(
      (count) => count > 1
    );

    expect(duplicatedGroups.length).toBeGreaterThan(0);
  });
});