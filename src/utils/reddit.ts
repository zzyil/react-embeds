export type RedditMedia = {
  type: "image" | "video" | "link";
  url: string;
  alt?: string;
  poster?: string;
};

export type RedditPollOption = {
  text: string;
  vote_count?: number;
  id: string;
};

export type RedditPollData = {
  options: RedditPollOption[];
  total_vote_count: number;
  voting_end_timestamp: number;
  is_prediction: boolean;
};

export type RedditPost = {
  title: string;
  subreddit: string;
  author: string;
  selftext: string;
  createdUtc: number;
  score: number;
  numComments: number;
  permalink: string;
  url: string;
  isNsfw: boolean;
  isSpoiler: boolean;
  media?: RedditMedia;
  pollData?: RedditPollData;
  isRemoved: boolean;
};

// Helper functions restored
export function extractRedditPostId(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    const hostname = url.hostname.replace(/^www\./, "");
    const parts = url.pathname.split("/").filter(Boolean);

    if (hostname === "redd.it" && parts[0]) {
      return parts[0];
    }

    const commentsIndex = parts.indexOf("comments");
    if (commentsIndex !== -1 && parts[commentsIndex + 1]) {
      return parts[commentsIndex + 1] ?? null;
    }
  } catch {
    return null;
  }

  return null;
}

export function buildRedditJsonUrl(postId: string): string {
  return `https://www.reddit.com/comments/${postId}.json?raw_json=1`;
}

export function normalizeRedditLink(permalink: string): string {
  if (!permalink) return "";
  if (permalink.startsWith("http")) return permalink;
  return `https://www.reddit.com${permalink}`;
}

export function extractSubredditFromUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const rIndex = parts.indexOf("r");
    if (rIndex !== -1 && parts[rIndex + 1]) {
      return `r/${parts[rIndex + 1]}`;
    }
  } catch {
    // ignore
  }
  return "r/unknown";
}

export function pickRedditMedia(post: Record<string, unknown>): RedditMedia | undefined {
  // Prefer Reddit-hosted videos
  const secureMedia = post.secure_media as
    | { reddit_video?: { fallback_url?: string; preview_url?: string; poster_url?: string } }
    | undefined;
  const redditVideo = secureMedia?.reddit_video;
  const videoUrl =
    (redditVideo?.fallback_url as string | undefined) ||
    (redditVideo?.preview_url as string | undefined);

  if (videoUrl) {
    return {
      type: "video",
      url: videoUrl,
      poster: typeof redditVideo?.poster_url === "string" ? redditVideo.poster_url : undefined,
      alt: typeof post.title === "string" ? post.title : "Reddit video"
    };
  }

  // Check for Link Post
  if (post.post_hint === "link") {
    const thumbnail = typeof post.thumbnail === "string" ? post.thumbnail : undefined;

    // Try to get high-res preview
    const preview = post.preview as
      | { images?: Array<{ resolutions?: Array<{ url?: string; width: number; height: number }> }> }
      | undefined;
    const resolutions = preview?.images?.[0]?.resolutions;
    // Pick the largest resolution available, or the last one
    const bestPreview = resolutions ? resolutions[resolutions.length - 1]?.url : undefined;
    const highResPoster = bestPreview ? decodeHtmlEntities(bestPreview) : undefined;

    // Use high-res if available, otherwise thumbnail
    const posterUrl = highResPoster || (thumbnail && thumbnail.startsWith("http") ? thumbnail : undefined);

    const url = typeof post.url === "string" ? post.url : "";
    if (url) {
      return {
        type: "link",
        url: url,
        poster: posterUrl,
        alt: typeof post.title === "string" ? post.title : "External link"
      };
    }
  }

  const preview = post.preview as
    | { images?: Array<{ resolutions?: Array<{ url?: string }> }> }
    | undefined;
  const images = preview?.images?.[0]?.resolutions;
  const lastImage = images && images[images.length - 1]?.url;
  if (lastImage) {
    return {
      type: "image",
      url: decodeHtmlEntities(lastImage),
      alt: typeof post.title === "string" ? post.title : "Reddit post image"
    };
  }

  const thumbnail = typeof post.thumbnail === "string" ? post.thumbnail : "";
  if (thumbnail && thumbnail.startsWith("http")) {
    return {
      type: "image",
      url: thumbnail,
      alt: typeof post.title === "string" ? post.title : "Reddit post thumbnail"
    };
  }

  return undefined;
}

// ... (previous code)

export function pickRedditPoll(post: Record<string, unknown>): RedditPollData | undefined {
  let pollData = post.poll_data as RedditPollData | undefined;

  // Check crosspost if main post doesn't have poll data
  if (!pollData && Array.isArray(post.crosspost_parent_list)) {
    const parent = post.crosspost_parent_list[0] as Record<string, unknown>;
    pollData = parent?.poll_data as RedditPollData | undefined;
  }

  if (!pollData) {
    if (JSON.stringify(post).includes("poll_data")) {
      console.warn("[RedditEmbed] poll_data key found in JSON but extraction failed.", post);
    }
    return undefined;
  }

  return {
    options: Array.isArray(pollData.options) ? pollData.options : [],
    total_vote_count: typeof pollData.total_vote_count === 'number' ? pollData.total_vote_count : 0,
    voting_end_timestamp: typeof pollData.voting_end_timestamp === 'number' ? pollData.voting_end_timestamp : 0,
    is_prediction: Boolean(pollData.is_prediction),
  };
}

export function cleanRedditSelftext(selftext: string): string {
  if (!selftext) return "";
  // Remove any "[View Poll](...)" link, deeper than just specific reddit domain
  return selftext.replace(/\[View Poll\]\([^)]+\)/gi, "").trim();
}

export function isRedditPostRemoved(post: Record<string, unknown>): boolean {
  // ...
  const removedBy = post.removed_by_category;
  const selftext = typeof post.selftext === "string" ? post.selftext : "";
  const title = typeof post.title === "string" ? post.title : "";
  const author = typeof post.author === "string" ? post.author : "";

  return Boolean(
    removedBy ||
    selftext === "[removed]" ||
    selftext === "[deleted]" ||
    title === "[removed]" ||
    title === "[deleted]" ||
    author === "[deleted]"
  );
}

export function getRedditPostType(post: RedditPost): "Image" | "Video" | "Text" | "Poll" | "Link" | "AMA" {
  // AMA Detection
  const subreddit = post.subreddit.toLowerCase();
  const title = post.title.toLowerCase();
  if (subreddit === "r/iama" || title.includes("ama") || title.includes("ask me anything")) {
    return "AMA";
  }

  // Poll
  if (post.pollData) {
    return "Poll";
  }

  // Media Types
  if (post.media) {
    if (post.media.type === "video") return "Video";
    if (post.media.type === "image") return "Image";
    if (post.media.type === "link") return "Link";
  }

  // Default
  return "Text";
}

function decodeHtmlEntities(input: string): string {
  return input.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
