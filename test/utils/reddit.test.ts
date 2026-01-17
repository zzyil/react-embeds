import {
  buildRedditJsonUrl,
  extractRedditPostId,
  extractSubredditFromUrl,
  normalizeRedditLink
} from "../../src/utils/reddit";

describe("reddit utilities", () => {
  it("extracts post ids from reddit urls", () => {
    expect(
      extractRedditPostId("https://www.reddit.com/r/reactjs/comments/abc123/example_title/")
    ).toBe("abc123");
  });

  it("builds json urls and normalizes permalinks", () => {
    expect(buildRedditJsonUrl("abc123")).toBe(
      "https://www.reddit.com/comments/abc123.json?raw_json=1"
    );
    expect(normalizeRedditLink("/r/reactjs/comments/abc123/example/"))
      .toBe("https://www.reddit.com/r/reactjs/comments/abc123/example/");
  });

  it("extracts subreddit names", () => {
    expect(extractSubredditFromUrl("https://www.reddit.com/r/reactjs/comments/abc123/example/"))
      .toBe("r/reactjs");
  });
});
