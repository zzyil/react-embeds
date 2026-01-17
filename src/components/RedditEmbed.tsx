import React, { useEffect, useMemo, useState } from "react";
import { EmbedBadge, EmbedCard, EmbedMetaItem } from "./EmbedCard";
import type { CardLayout } from "./CardLayout";
import { compactNumber, formatDate, truncateText } from "../utils/format";
import {
  RedditPost,
  buildRedditJsonUrl,
  extractRedditPostId,
  extractSubredditFromUrl,
  isRedditPostRemoved,
  normalizeRedditLink,
  pickRedditMedia,
  pickRedditPoll,
  cleanRedditSelftext,
  getRedditPostType
} from "../utils/reddit";

export type RedditEmbedProps = {
  url: string;
  maxBodyLength?: number;

  // Display configuration
  showTitle?: boolean;
  showSubreddit?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showBody?: boolean;
  showMedia?: boolean;
  showUpvotes?: boolean;
  showCommentCount?: boolean;
  showPostType?: boolean;
  showBranding?: boolean;
  showCTA?: boolean;
  ctaLabel?: string;
  ctaLabelIcon?: boolean;
  ctaLabelIconPosition?: "before" | "after";
  ctaUsePlatformColor?: boolean;
  ctaUsePlatformIconColor?: boolean;
  disableCard?: boolean;
  theme?: "light" | "dark";
  width?: string | number;
  maxWidth?: string | number;
  cardLayout?: CardLayout;

  // Link behavior
  linkBehavior?: "card" | "title" | "cta" | "none";
  linkTarget?: "_blank" | "_self" | "_parent" | "_top";

  className?: string;
  style?: React.CSSProperties;
};

type EmbedState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "removed"; data: RedditPost }
  | { status: "ok"; data: RedditPost };

export function RedditEmbed({
  url,
  maxBodyLength = 220,

  // Defaults: show everything
  showTitle = true,
  showSubreddit = true,
  showAuthor = true,
  showDate = true,
  showBody = true,
  showMedia = true,
  showUpvotes = true,
  showCommentCount = true,
  showPostType = true,
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on Reddit",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  theme,
  width,
  maxWidth,
  cardLayout,

  // Link behavior
  linkBehavior = "cta",
  linkTarget = "_blank",

  className,
  style
}: RedditEmbedProps) {
  const postId = useMemo(() => extractRedditPostId(url), [url]);
  const jsonUrl = useMemo(() => (postId ? buildRedditJsonUrl(postId) : ""), [postId]);
  const [state, setState] = useState<EmbedState>({ status: "loading" });

  useEffect(() => {
    if (!jsonUrl) {
      setState({ status: "error", error: "Invalid Reddit URL." });
      return;
    }

    const controller = new AbortController();

    async function load() {
      try {
        setState({ status: "loading" });
        const payload = await fetchRedditPayload({
          primaryUrl: jsonUrl,
          postUrl: url,
          postId,

          signal: controller.signal
        });

        const post =
          payload.kind === "listing"
            ? mapListingToPost(payload.listing)
            : mapOEmbedToPost(payload.oembed, url);



        if (post.isRemoved) {
          setState({ status: "removed", data: post });
        } else {
          setState({ status: "ok", data: post });
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setState({ status: "error", error: (error as Error).message || "Unknown error." });
      }
    }

    load();

    return () => controller.abort();
  }, [jsonUrl, postId]);

  if (state.status === "loading") {
    return (
      <EmbedCard
        provider="Reddit"
        status="loading"
      theme={theme}
      className={className}
      style={style}
      width={width}
      maxWidth={maxWidth}
      disableCard={disableCard}
      showBranding={showBranding}
      layout={cardLayout}
    />
  );
  }

  if (state.status === "error") {
    return (
      <EmbedCard
        provider="Reddit"
        status="error"
        statusMessage={state.error}
        href={url}
      theme={theme}
      className={className}
      style={style}
      width={width}
      maxWidth={maxWidth}
      disableCard={disableCard}
      showBranding={showBranding}
      layout={cardLayout}
    />
  );
  }

  const post = state.data;
  const badges: EmbedBadge[] = [];

  const postType = getRedditPostType(post);
  const typeBadgeTone: "accent" | "muted" | "alert" = (postType === "AMA" || postType === "Poll" || postType === "Video") ? "accent" : "muted";

  if (showPostType) {
    badges.push({ label: postType, tone: typeBadgeTone });
  }

  if (post.isNsfw) badges.push({ label: "NSFW", tone: "alert" });
  if (post.isSpoiler) badges.push({ label: "Spoiler", tone: "accent" });

  const footerMeta: EmbedMetaItem[] = [];

  if (showUpvotes) {
    footerMeta.push({ label: "Score", value: compactNumber(post.score) });
  }
  if (showCommentCount) {
    footerMeta.push({ label: "Comments", value: compactNumber(post.numComments) });
  }

  const trimmedBody = post.selftext ? truncateText(post.selftext, maxBodyLength) : "";
  const link = normalizeRedditLink(post.permalink || post.url || url);

  return (
    <EmbedCard
      provider={showBranding ? "Reddit" : ""}
      title={showTitle ? post.title : undefined}
      subtitle={showSubreddit ? post.subreddit : undefined}
      author={showAuthor ? post.author : undefined}
      timestamp={showDate ? formatDate(post.createdUtc) : undefined}
      body={showBody ? trimmedBody : undefined}
      media={showMedia ? post.media : undefined}
      pollData={showMedia ? post.pollData : undefined}
      badges={badges}
      footerMeta={footerMeta}
      href={linkBehavior !== "none" ? link : undefined}
      ctaLabel={showCTA && linkBehavior === "cta" ? ctaLabel : undefined}
      ctaLabelIcon={ctaLabelIcon}
      ctaLabelIconPosition={ctaLabelIconPosition}
      ctaUsePlatformColor={ctaUsePlatformColor}
      ctaUsePlatformIconColor={ctaUsePlatformIconColor}
      linkBehavior={linkBehavior}
      linkTarget={linkTarget}
      disableCard={disableCard}
      theme={theme}
      layout={cardLayout}
      width={width}
      maxWidth={maxWidth}
      status={state.status}
      statusMessage={
        state.status === "removed" ? "The post was removed or deleted." : undefined
      }
      className={className}
      style={style}
    />
  );
}

import { fetchJsonp } from "../utils/jsonp";

// ... (existing imports)

async function fetchRedditPayload({
  primaryUrl,
  postUrl,
  postId,

  signal
}: {
  primaryUrl: string;
  postUrl: string;
  postId: string | null;

  signal: AbortSignal;
}): Promise<
  | { kind: "listing"; listing: Array<Record<string, unknown>> }
  | { kind: "oembed"; oembed: RedditOEmbed }
> {
  const targets: string[] = [];
  if (primaryUrl) targets.push(primaryUrl);

  let lastError = "Unable to reach Reddit.";

  for (const target of targets) {
    try {
      const response = await fetch(target, { signal });
      if (!response.ok) {
        lastError =
          response.status === 403 || response.status === 429
            ? "Reddit blocked the request (403/429)."
            : `Reddit responded with ${response.status}`;
        continue;
      }

      const payload = (await response.json()) as unknown;
      if (!Array.isArray(payload)) {
        lastError = "Unexpected response from Reddit.";
        continue;
      }

      return { kind: "listing", listing: payload as Array<Record<string, unknown>> };
    } catch (error) {
      if ((error as Error).name === "AbortError") throw error;

      // If fetch failed (likely CORS), try JSONP as a fallback for the primary URL
      // We only try JSONP on the direct Reddit URL, not the proxy
      if (
        (target === primaryUrl) &&
        typeof window !== "undefined"
      ) {
        try {
          // Attempt JSONP
          const jsonpPayload = await fetchJsonp<unknown>(target, "jsonp");
          if (!Array.isArray(jsonpPayload)) {
            lastError = "Unexpected JSONP response from Reddit.";
            continue; // Try next target or fall through
          }
          return { kind: "listing", listing: jsonpPayload as Array<Record<string, unknown>> };
        } catch (jsonpError) {
          console.warn("[RedditEmbed] JSONP failed:", jsonpError);
          // Continue to next target (e.g. proxy) or error
        }
      }

      if (error instanceof TypeError) {
        lastError = "Reddit blocked the request (CORS).";
      } else {
        lastError = (error as Error).message;
      }
    }
  }

  // Fallback to oEmbed...
  if (postUrl) {
    try {
      const oembedUrl = `https://www.reddit.com/oembed?url=${encodeURIComponent(postUrl)}`;
      const response = await fetch(oembedUrl, { signal });
      if (response.ok) {
        const oembed = (await response.json()) as RedditOEmbed;
        return { kind: "oembed", oembed };
      }
      lastError = `Reddit oEmbed responded with ${response.status}`;
    } catch (error) {
      if ((error as Error).name === "AbortError") throw error;
      lastError = (error as Error).message;
    }
  }

  throw new Error(lastError);
}

type RedditOEmbed = {
  title?: string;
  author_name?: string;
  provider_url?: string;
  thumbnail_url?: string;
};

function mapListingToPost(listing: Array<Record<string, unknown>>): RedditPost {
  const node = listing?.[0] as
    | { data?: { children?: Array<{ data?: Record<string, unknown> }> } }
    | undefined;
  const postData = node?.data?.children?.[0]?.data as Record<string, unknown> | undefined;
  if (!postData) {
    throw new Error("Unable to read the post data.");
  }

  return {
    title: typeof postData.title === "string" ? postData.title : "Untitled Reddit post",
    subreddit:
      typeof postData.subreddit_name_prefixed === "string"
        ? postData.subreddit_name_prefixed
        : "r/unknown",
    author: typeof postData.author === "string" ? `u/${postData.author}` : "u/unknown",
    selftext: typeof postData.selftext === "string" ? cleanRedditSelftext(postData.selftext) : "",
    createdUtc: typeof postData.created_utc === "number" ? postData.created_utc : 0,
    score: typeof postData.score === "number" ? postData.score : 0,
    numComments: typeof postData.num_comments === "number" ? postData.num_comments : 0,
    permalink: typeof postData.permalink === "string" ? postData.permalink : "",
    url: typeof postData.url === "string" ? postData.url : "",
    isNsfw: Boolean(postData.over_18),
    isSpoiler: Boolean(postData.spoiler),
    media: pickRedditMedia(postData),
    pollData: pickRedditPoll(postData),
    isRemoved: isRedditPostRemoved(postData)
  };
}

function mapOEmbedToPost(oembed: RedditOEmbed, originalUrl: string): RedditPost {
  return {
    title: oembed.title || "Reddit post",
    subreddit: extractSubredditFromUrl(originalUrl),
    author: oembed.author_name ? `u/${oembed.author_name}` : "u/unknown",
    selftext: "",
    createdUtc: 0,
    score: 0,
    numComments: 0,
    permalink: originalUrl,
    url: originalUrl,
    isNsfw: false,
    isSpoiler: false,
    media: oembed.thumbnail_url
      ? { type: "image", url: oembed.thumbnail_url, alt: oembed.title }
      : undefined,
    isRemoved: false
  };
}
