import { compactNumber, formatDate, truncateText } from "../../src/utils/format";

describe("format utilities", () => {
  it("formats compact numbers using Intl", () => {
    const formatter = new Intl.NumberFormat(undefined, {
      notation: "compact",
      maximumFractionDigits: 1
    });
    expect(compactNumber(1200)).toBe(formatter.format(1200));
    expect(compactNumber(999)).toBe(formatter.format(999));
  });

  it("formats dates using Intl", () => {
    const epochSeconds = 1704067200; // 2024-01-01T00:00:00Z
    const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });
    expect(formatDate(epochSeconds)).toBe(formatter.format(new Date(epochSeconds * 1000)));
    expect(formatDate()).toBe("");
  });

  it("truncates text on word boundaries when possible", () => {
    expect(truncateText("short text", 20)).toBe("short text");
    expect(truncateText("this is a longer sentence", 10)).toBe("this is a...");
    expect(truncateText("superlongword", 6)).toBe("superl...");
  });
});
