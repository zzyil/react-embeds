import {
  extractIdFromUrl,
  extractRumbleEmbedIdFromUrl,
  isRumbleEmbedUrl,
  isValidRumbleUrl
} from "../../src/utils/rumble";

describe("rumble utilities", () => {
  it("detects valid rumble urls", () => {
    expect(isValidRumbleUrl("https://rumble.com/vabc123-example.html")).toBe(true);
    expect(isValidRumbleUrl("not-a-url")).toBe(false);
  });

  it("detects embed urls", () => {
    expect(isRumbleEmbedUrl("https://rumble.com/embed/vabc123/"))
      .toBe(true);
    expect(isRumbleEmbedUrl("https://player.rumble.com/vabc123/"))
      .toBe(true);
    expect(isRumbleEmbedUrl("https://rumble.com/vabc123-example.html"))
      .toBe(false);
  });

  it("extracts embed ids", () => {
    expect(extractRumbleEmbedIdFromUrl("https://rumble.com/embed/vabc123/"))
      .toBe("vabc123");
    expect(extractRumbleEmbedIdFromUrl("https://player.rumble.com/abc123/"))
      .toBe("vabc123");
  });

  it("extracts ids from public urls", () => {
    expect(extractIdFromUrl("https://rumble.com/vabc123-example.html"))
      .toBe("vabc123");
  });
});
