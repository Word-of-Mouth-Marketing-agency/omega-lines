import { describe, expect, it } from "vitest";
import { localePrefix } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";

describe("localized routing", () => {
  it("keeps English unprefixed", () => {
    expect(localePrefix("en")).toBe("");
    expect(localizedPath("en", "/products")).toBe("/products");
  });

  it("prefixes French and German routes", () => {
    expect(localePrefix("fr")).toBe("/fr");
    expect(localizedPath("fr", "/products")).toBe("/fr/products");
    expect(localizedPath("de", "/contact")).toBe("/de/contact");
  });
});
