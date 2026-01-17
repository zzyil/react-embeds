import React, { useEffect, useMemo, useState, useId } from "react";
import { EmbedCard } from "./EmbedCard";
import { getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { PlatformIcon } from "./PlatformIcons";
import { PLATFORM_COLORS } from "./PlatformBranding";
import { compactNumber } from "../utils/format";
import { CardLayout } from "./CardLayout";

export type MastodonEmbedProps = {
    url: string;
    width?: number | string;
    maxWidth?: number | string;
    maxHeight?: number;
    theme?: "light" | "dark";
    renderMode?: "card" | "oembed";
    linkTarget?: "_blank" | "_self" | "_parent" | "_top";
    linkBehavior?: "card" | "title" | "cta" | "none";
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    showBranding?: boolean;
    showAuthor?: boolean;
    showHandle?: boolean;
    showDate?: boolean;
    showBody?: boolean;
    showMedia?: boolean;
    showFavorites?: boolean;
    showReblogs?: boolean;
    showReplies?: boolean;
    maxBodyLength?: number;
    disableCard?: boolean;
    className?: string;
    style?: React.CSSProperties;
    oembedProxyUrl?: string;
    cardLayout?: CardLayout;
};

type EmbedState =
    | { status: "loading" }
    | { status: "error"; error: string }
    | { status: "ok"; html: string }
    | { status: "ok"; card: MastodonCardData };

const DEFAULT_PROXY = "/api/mastodon-oembed";

type MastodonCardData = {
    authorName: string;
    authorHandle: string;
    contentHtml: string;
    contentText: string;
    createdAt: string;
    media?: {
        type: "image" | "video";
        url: string;
        alt?: string;
        poster?: string;
    };
    favorites: number;
    reblogs: number;
    replies: number;
};

const applyMastodonTheme = (html: string, embedTheme: "light" | "dark") => {
    return html.replace(/data-embed-url="([^"]+)"/i, (_match, url) => {
        try {
            const embedUrl = new URL(url);
            embedUrl.searchParams.set("theme", embedTheme);
            return `data-embed-url="${embedUrl.toString()}"`;
        } catch {
            return `data-embed-url="${url}"`;
        }
    });
};

const buildMastodonEmbedHtml = (statusUrl: string, embedTheme: "light" | "dark") => {
    const parsed = new URL(statusUrl);
    const cleanedPath = parsed.pathname.replace(/\/+$/, "");
    const embedUrl = new URL(`${cleanedPath}/embed`, parsed.origin);
    embedUrl.searchParams.set("theme", embedTheme);
    return `<blockquote class="mastodon-embed" data-embed-url="${embedUrl.toString()}"></blockquote><script data-allowed-prefixes="${parsed.origin}/" async src="${parsed.origin}/embed.js"></script>`;
};

const buildEmbedDocument = (html: string, id: string, theme: "light" | "dark") => {
    const borderColor = theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.08)";
    const background = theme === "dark" ? "#0b0b0c" : "#ffffff";
    return `<!doctype html><html><head><meta charset="utf-8"/><base target="_blank" />
<style>
html,body{margin:0;background:transparent;}
.mastodon-embed{
  max-width:100%!important;
  border:1px solid ${borderColor}!important;
  background:${background}!important;
  border-radius:12px!important;
  overflow:hidden!important;
}
</style></head><body>${html}
<script>
const report = () => {
  const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  window.parent && window.parent.postMessage({ type: "mastodon-embed-height", id: "${id}", height }, "*");
};
const delayReport = () => setTimeout(report, 300);
window.addEventListener("load", delayReport);
if (window.ResizeObserver) {
  const observer = new ResizeObserver(delayReport);
  observer.observe(document.body);
} else {
  setInterval(report, 500);
}
</script></body></html>`;
};

const extractStatusId = (statusUrl: string) => {
    const match = statusUrl.match(/\/(\d+)(?:[/?#]|$)/);
    return match?.[1] ?? null;
};

const stripHtml = (html: string) => {
    if (!html) return "";
    if (typeof window !== "undefined") {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            return (doc.body?.textContent || "").replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
        } catch {
            // Fall back to regex stripping
        }
    }
    return html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .trim();
};

const ensureLinkTargets = (html: string) => {
    return html.replace(/<a\b([^>]*?)>/gi, (_match, attrs) => {
        let nextAttrs = attrs;
        if (!/target\s*=/.test(attrs)) {
            nextAttrs += ' target="_blank"';
        }
        if (!/rel\s*=/.test(attrs)) {
            nextAttrs += ' rel="noopener noreferrer"';
        }
        return `<a${nextAttrs}>`;
    });
};

export const MastodonEmbed: React.FC<MastodonEmbedProps> = ({
    url,
    width = "100%",
    maxWidth = "100%",
    maxHeight,
    theme = "light",
    renderMode = "card",
    linkTarget = "_blank",
    linkBehavior = "cta",
    showCTA = true,
    ctaLabel = "View on Mastodon",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    showBranding = true,
    showAuthor = true,
    showHandle = true,
    showDate = true,
    showBody = true,
    showMedia = true,
    showFavorites = true,
    showReblogs = true,
    showReplies = true,
    maxBodyLength = 500,
    disableCard = false,
    className,
    style,
    oembedProxyUrl = DEFAULT_PROXY,
    cardLayout
}) => {
    const reactId = useId();
    const embedId = useMemo(() => `mastodon-${reactId.replace(/[^a-z0-9]/gi, "")}`, [reactId]);
    const [state, setState] = useState<EmbedState>({ status: "loading" });
    const [embedHeight, setEmbedHeight] = useState<number>(320);
    const ctaHover = getCtaHoverStyles(theme);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            const data = event.data;
            if (!data || typeof data !== "object") return;
            if (data.type !== "mastodon-embed-height") return;
            if (data.id !== embedId) return;
            if (typeof data.height === "number" && data.height > 0) {
                const clamped = maxHeight ? Math.min(data.height, maxHeight) : data.height;
                setEmbedHeight(Math.min(Math.max(clamped, 200), 2000));
            }
        };
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, [embedId, maxHeight]);

    useEffect(() => {
        if (!url) {
            setState({ status: "error", error: "No URL provided." });
            return;
        }

        let cancelled = false;

        const fetchData = async () => {
            setState({ status: "loading" });
            try {
                const parsed = new URL(url);
                if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
                    throw new Error("Invalid URL protocol.");
                }

                if (renderMode === "oembed") {
                    const html = buildMastodonEmbedHtml(url, theme);
                    if (cancelled) return;
                    setState({ status: "ok", html });
                } else {
                    const statusId = extractStatusId(url);
                    if (!statusId) {
                        throw new Error("Invalid Mastodon status URL.");
                    }
                    const apiUrl = new URL(`/api/v1/statuses/${statusId}`, parsed.origin);
                    const response = await fetch(apiUrl.toString(), {
                        headers: { Accept: "application/json" }
                    });
                    if (!response.ok) {
                        throw new Error(`Mastodon API returned ${response.status}`);
                    }
                    const status = await response.json();
                    if (cancelled) return;

                    const account = status.account || {};
                    const contentHtmlRaw = `${status.spoiler_text ? `<p>${status.spoiler_text}</p>` : ""}${status.content || ""}`;
                    const contentHtml = ensureLinkTargets(contentHtmlRaw);
                    const contentText = stripHtml(contentHtml);
                    const createdAt = status.created_at
                        ? new Date(status.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        })
                        : "";
                    const attachment = Array.isArray(status.media_attachments) ? status.media_attachments[0] : undefined;
                    let media: MastodonCardData["media"];
                    if (attachment && showMedia) {
                        if (attachment.type === "image" && attachment.url) {
                            media = {
                                type: "image",
                                url: attachment.url,
                                alt: attachment.description || attachment.text_url || undefined
                            };
                        } else if ((attachment.type === "video" || attachment.type === "gifv") && attachment.url) {
                            media = {
                                type: "video",
                                url: attachment.url,
                                poster: attachment.preview_url || undefined
                            };
                        }
                    }

                    setState({
                        status: "ok",
                        card: {
                            authorName: account.display_name || account.username || "Mastodon",
                            authorHandle: account.acct || account.username || "",
                            contentHtml,
                            contentText,
                            createdAt,
                            media,
                            favorites: status.favourites_count || 0,
                            reblogs: status.reblogs_count || 0,
                            replies: status.replies_count || 0
                        }
                    });
                }
            } catch (error) {
                if (cancelled) return;
                setState({
                    status: "error",
                    error: error instanceof Error ? error.message : "Failed to load embed."
                });
            }
        };

        fetchData();
        return () => { cancelled = true; };
    }, [url, renderMode, showMedia, theme]);

    if (state.status !== "ok") {
        return (
            <EmbedCard
                provider="Mastodon"
                href={url}
                status={state.status === "error" ? "error" : "loading"}
                showCTA={showCTA}
                ctaLabel={ctaLabel}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                linkBehavior={linkBehavior}
                linkTarget={linkTarget}
                className={className}
                style={style}
                disableCard={disableCard}
                width={width}
                maxWidth={maxWidth}
                showBranding={showBranding}
                theme={theme}
                layout={cardLayout}
            />
        );
    }

    if (renderMode === "oembed" && "html" in state) {
        const themedHtml = applyMastodonTheme(state.html || "", theme);
        const srcDoc = buildEmbedDocument(themedHtml, embedId, theme);
        const wrapperStyle: React.CSSProperties = {
            width,
            maxWidth,
            ...style
        };

        return (
            <div className={className} style={{ ...wrapperStyle, display: "grid", gap: 12 }}>
                <iframe
                    title="Mastodon embed"
                    srcDoc={srcDoc}
                    width="100%"
                    height={embedHeight}
                    style={{
                        border: 0,
                        display: "block",
                        borderRadius: 12,
                        background: theme === "dark" ? "#0b0b0c" : "#ffffff"
                    }}
                    loading="lazy"
                    allowFullScreen
                />
                {showCTA && linkBehavior !== "none" && (
                    <a
                        href={url}
                        target={linkTarget}
                        rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
                        style={{
                            ...getCtaStyle(theme),
                            gap: 8,
                            backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.mastodon : getCtaStyle(theme).backgroundColor,
                            borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.mastodon : getCtaStyle(theme).borderColor,
                            color: ctaUsePlatformColor ? "#ffffff" : getCtaStyle(theme).color
                        }}
                        onMouseEnter={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.mastodon;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.mastodon;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.hover.transform;
                        }}
                        onMouseLeave={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.mastodon;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.mastodon;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.rest.transform;
                        }}
                    >
                        {ctaLabelIconPosition === "before" && ctaLabelIcon && (
                            <PlatformIcon
                                platform="mastodon"
                                size={14}
                                color={ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.mastodon : "currentColor"}
                                aria-hidden="true"
                                focusable="false"
                            />
                        )}
                        <span>{ctaLabel}</span>
                        {ctaLabelIconPosition === "after" && ctaLabelIcon && (
                            <PlatformIcon
                                platform="mastodon"
                                size={14}
                                color={ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.mastodon : "currentColor"}
                                aria-hidden="true"
                                focusable="false"
                            />
                        )}
                    </a>
                )}
            </div>
        );
    }

    if ("card" in state) {
        const { card } = state;
        const displayBody = maxBodyLength && card.contentText.length > maxBodyLength
            ? `${card.contentText.slice(0, maxBodyLength).trim()}…`
            : card.contentText;
        const useHtmlBody = showBody && (!maxBodyLength || card.contentText.length <= maxBodyLength);
        const footerMeta = [
            showFavorites ? { label: "Likes", value: compactNumber(card.favorites) } : null,
            showReblogs ? { label: "Reposts", value: compactNumber(card.reblogs) } : null,
            showReplies ? { label: "Replies", value: compactNumber(card.replies) } : null
        ].filter((item): item is { label: string; value: string } => Boolean(item?.value && item.value !== "0"));

        return (
            <EmbedCard
                provider={showBranding ? "Mastodon" : ""}
                href={linkBehavior !== "none" ? url : undefined}
                author={showAuthor ? card.authorName : undefined}
                subtitle={showHandle && card.authorHandle ? `@${card.authorHandle}` : undefined}
                timestamp={showDate ? card.createdAt : undefined}
                body={showBody && !useHtmlBody ? displayBody : undefined}
                bodyHtml={useHtmlBody ? card.contentHtml : undefined}
                media={card.media ? {
                    type: card.media.type,
                    url: card.media.url,
                    poster: card.media.poster,
                    alt: card.media.alt
                } : undefined}
                footerMeta={footerMeta}
                showCTA={showCTA}
                ctaLabel={showCTA && linkBehavior === "cta" ? ctaLabel : undefined}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                linkBehavior={linkBehavior}
                linkTarget={linkTarget}
                disableCard={disableCard}
                width={width}
                maxWidth={maxWidth}
                className={className}
                style={style}
                theme={theme}
                layout={cardLayout}
            />
        );
    }

    return null;
};
