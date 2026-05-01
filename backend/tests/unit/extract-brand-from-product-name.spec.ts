import { describe, expect, it } from "vitest";
import { extractBrandFromProductName } from "../../src/shared/utils/extract-brand-from-product-name";

describe("extractBrandFromProductName", () => {
  it("should infer a likely brand token from a common receipt item name", () => {
    expect(extractBrandFromProductName("ARROZ CAMIL T1 5KG")).toBe("CAMIL");
    expect(extractBrandFromProductName("LEITE ITALAC INTEGRAL 1L")).toBe("ITALAC");
    expect(extractBrandFromProductName("REFRIG COCA COLA 2L")).toBe("COCA");
  });

  it("should return undefined when no safe brand candidate is found", () => {
    expect(extractBrandFromProductName("SAL 1KG")).toBeUndefined();
    expect(extractBrandFromProductName("AGUA 500ML")).toBeUndefined();
  });
});