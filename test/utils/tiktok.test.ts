import { extractTikTokVideoId } from "../../src/utils/tiktok";

describe("tiktok utilities", () => {
  it("extracts video ids from tiktok urls", () => {
    expect(extractTikTokVideoId("https://www.tiktok.com/@scout2015/video/6718335390845095173"))
      .toBe("6718335390845095173");
  });

  it("returns null for invalid urls", () => {
    expect(extractTikTokVideoId("not-a-url")).toBeNull();
  });
});
