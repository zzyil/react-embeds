import { extractTweetId, normalizeTwitterUrl } from "../../src/utils/twitter";

describe("twitter utilities", () => {
  it("extracts tweet ids", () => {
    expect(extractTweetId("https://twitter.com/jack/status/20")).toBe("20");
    expect(extractTweetId("https://x.com/jack/status/20"))
      .toBe("20");
  });

  it("normalizes twitter/x urls", () => {
    expect(normalizeTwitterUrl("https://x.com/jack/status/20"))
      .toBe("https://x.com/jack/status/20");
    expect(normalizeTwitterUrl("not-a-url")).toBe("not-a-url");
  });
});
