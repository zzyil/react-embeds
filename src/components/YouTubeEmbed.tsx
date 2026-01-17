import React, { useEffect, useMemo, useRef, useState } from "react";
import { EmbedCard, EmbedMetaItem } from "./EmbedCard";
import { getCardContainerStyle, getCardHoverStyles, getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { CardLayout, useCardLayout } from "./CardLayout";
import { PLATFORM_COLORS } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import {
    extractYouTubeVideoId,
    normalizeYouTubeUrl,
    fetchYouTubeData,
    YouTubeData,
} from "../utils/youtube";

// ============================================================================
// YouTube IFrame Player API Types
// ============================================================================

declare global {
    interface Window {
        YT: typeof YT;
        onYouTubeIframeAPIReady: () => void;
    }
}

declare namespace YT {
    class Player {
        constructor(elementId: string | HTMLElement, options: PlayerOptions);
        destroy(): void;
        playVideo(): void;
        pauseVideo(): void;
        stopVideo(): void;
        getPlayerState(): number;
    }

    interface PlayerOptions {
        width?: number | string;
        height?: number | string;
        videoId?: string;
        playerVars?: PlayerVars;
        events?: PlayerEvents;
    }

    interface PlayerVars {
        autoplay?: 0 | 1;
        controls?: 0 | 1;
        disablekb?: 0 | 1;
        fs?: 0 | 1;
        iv_load_policy?: 1 | 3;
        modestbranding?: 0 | 1;
        playsinline?: 0 | 1;
        rel?: 0 | 1;
        origin?: string;
    }

    interface PlayerEvents {
        onReady?: (event: { target: Player }) => void;
        onStateChange?: (event: { data: number; target: Player }) => void;
        onError?: (event: { data: number; target: Player }) => void;
    }

    const PlayerState: {
        UNSTARTED: -1;
        ENDED: 0;
        PLAYING: 1;
        PAUSED: 2;
        BUFFERING: 3;
        CUED: 5;
    };
}

// ============================================================================
// YouTube API Loader
// ============================================================================

let apiLoadPromise: Promise<void> | null = null;
const apiReadyCallbacks: (() => void)[] = [];

function loadYouTubeAPI(): Promise<void> {
    if (apiLoadPromise) return apiLoadPromise;

    apiLoadPromise = new Promise((resolve) => {
        // If API already loaded
        if (window.YT && window.YT.Player) {
            resolve();
            return;
        }

        // Add callback
        apiReadyCallbacks.push(resolve);

        // Set up global callback
        const existingCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            existingCallback?.();
            apiReadyCallbacks.forEach(cb => cb());
            apiReadyCallbacks.length = 0;
        };

        // Check if script already exists
        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            script.async = true;
            document.body.appendChild(script);
        }
    });

    return apiLoadPromise;
}

// ============================================================================
// YouTubePlayer Component
// ============================================================================

type YouTubePlayerProps = {
    videoId: string;
    aspectRatio?: string;
    autoplay?: boolean;
    onReady?: () => void;
    onStateChange?: (state: number) => void;
    onError?: (errorCode: number) => void;
};

function YouTubePlayer({
    videoId,
    aspectRatio = "16/9",
    autoplay = false,
    onReady,
    onStateChange,
    onError
}: YouTubePlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YT.Player | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function initPlayer() {
            await loadYouTubeAPI();

            if (!mounted || !containerRef.current) return;

            // Clean up existing player
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }

            // Create new player
            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId,
                width: "100%",
                height: "100%",
                playerVars: {
                    autoplay: autoplay ? 1 : 0,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                    origin: window.location.origin,
                },
                events: {
                    onReady: () => {
                        setIsReady(true);
                        onReady?.();
                    },
                    onStateChange: (event) => {
                        onStateChange?.(event.data);
                    },
                    onError: (event) => {
                        onError?.(event.data);
                    }
                }
            });
        }

        initPlayer();

        return () => {
            mounted = false;
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [videoId, autoplay]);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                aspectRatio,
                backgroundColor: "#000",
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            <div
                ref={containerRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />
            {!isReady && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        fontSize: "14px",
                    }}
                >
                    Loading player...
                </div>
            )}
        </div>
    );
}

// ============================================================================
// YouTubeEmbed Component
// ============================================================================

export type YouTubeEmbedProps = {
    url: string;

    // Display configuration
    showTitle?: boolean;
    showAuthor?: boolean;
    showMedia?: boolean;
    showBranding?: boolean;
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    disableCard?: boolean;
    width?: string | number;
    maxWidth?: string | number;

    // Link behavior
    linkBehavior?: "card" | "title" | "cta" | "none";
    linkTarget?: "_blank" | "_self" | "_parent" | "_top";

    className?: string;
    style?: React.CSSProperties;
    theme?: "light" | "dark";
    cardLayout?: CardLayout;
};

type EmbedState =
    | { status: "loading" }
    | { status: "error"; error: string }
    | { status: "ok"; data: YouTubeData };

/**
 * Embed component for YouTube videos.
 * Fetches video metadata and uses the YouTube IFrame Player API for playback.
 *
 * @param props - Component configuration
 * @returns Embedded YouTube video player with metadata
 *
 * @example
 * ```tsx
 * <YouTubeEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" theme="dark" />
 * ```
 */
export function YouTubeEmbed({
    url,
    showTitle = true,
    showAuthor = true,
    showMedia = true,
    showBranding = true,
    showCTA = true,
    ctaLabel = "Watch on YouTube",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = true,
    ctaUsePlatformIconColor = false,
    disableCard = false,
    width = "100%",
    maxWidth = "100%",
    linkBehavior = "cta",
    linkTarget = "_blank",
    className,
    style,
    theme = "light",
    cardLayout,
}: YouTubeEmbedProps) {
    const videoId = useMemo(() => extractYouTubeVideoId(url), [url]);
    const [state, setState] = useState<EmbedState>({ status: "loading" });
    const link = useMemo(() => normalizeYouTubeUrl(url), [url]);
    const resolvedLayout = useCardLayout(cardLayout) ?? "modern";

    useEffect(() => {
        if (!videoId) {
            setState({ status: "error", error: "Invalid YouTube URL." });
            return;
        }

        let cancelled = false;

        async function fetchVideo() {
            setState({ status: "loading" });

            try {

                // Fetch metadata (oEmbed)
                const data = await fetchYouTubeData(videoId!);
                if (cancelled) return;

                if (cancelled) return;
                setState({ status: "ok", data });
            } catch (error) {
                if (cancelled) return;
                setState({
                    status: "error",
                    error: (error as Error).message || "Failed to load video.",
                });
            }
        }

        fetchVideo();

        return () => {
            cancelled = true;
        };
    }, [videoId, url]);

    // Loading state
    if (state.status === "loading") {
        return (
            <EmbedCard
                provider="YouTube"
                status="loading"
                className={className}
                style={{
                    ...style,
                    "--embed-accent": "#FF0000",
                } as React.CSSProperties}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                showBranding={showBranding}
                theme={theme}
                layout={resolvedLayout}
            />
        );
    }

    // Error state
    if (state.status === "error") {
        return (
            <EmbedCard
                provider="YouTube"
                status="error"
                statusMessage={state.error}
                href={link}
                className={className}
                style={{
                    ...style,
                    "--embed-accent": "#FF0000",
                } as React.CSSProperties}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                showBranding={showBranding}
                theme={theme}
                layout={resolvedLayout}
            />
        );
    }

    const video = state.data;
    const cardHover = getCardHoverStyles(theme);
    const ctaHover = getCtaHoverStyles(theme);
    const ctaBaseStyle = getCtaStyle(theme);
    const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.youtube : "currentColor";
    const mediaSection = showMedia && videoId ? (
        <YouTubePlayer
            videoId={videoId}
            aspectRatio="16/9"
        />
    ) : null;
    const brandingSection = showBranding ? (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: theme === "dark" ? "#ffffff" : "#FF0000",
                fontSize: "12px",
                fontWeight: 600,
            }}
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube
        </div>
    ) : null;
    const titleSection = showTitle && video.title ? (
        <h3
            style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 600,
                color: theme === "dark" ? "#fff" : "#0f0f0f",
                lineHeight: 1.3,
            }}
        >
            {video.title}
        </h3>
    ) : null;
    const authorSection = showAuthor && video.authorName ? (
        <p
            style={{
                margin: 0,
                fontSize: "13px",
                color: theme === "dark" ? "#aaa" : "#606060",
            }}
        >
            {video.authorName}
        </p>
    ) : null;
    const ctaSection = showCTA && linkBehavior === "cta" ? (
        <a
            href={link}
            target={linkTarget}
            rel="noopener noreferrer"
            style={{
                ...ctaBaseStyle,
                backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.youtube : ctaBaseStyle.backgroundColor,
                borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.youtube : ctaBaseStyle.borderColor,
                color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color,
                gap: 8
            }}
            onMouseEnter={(e) => {
                if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.youtube;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.youtube;
                    e.currentTarget.style.color = "#ffffff";
                } else {
                    e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                }
                e.currentTarget.style.transform = ctaHover.hover.transform;
            }}
            onMouseLeave={(e) => {
                if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.youtube;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.youtube;
                    e.currentTarget.style.color = "#ffffff";
                } else {
                    e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                }
                e.currentTarget.style.transform = ctaHover.rest.transform;
            }}
        >
            {ctaLabelIconPosition === "before" && ctaLabelIcon && (
                <PlatformIcon platform="youtube" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
            )}
            <span>{ctaLabel}</span>
            {ctaLabelIconPosition === "after" && ctaLabelIcon && (
                <PlatformIcon platform="youtube" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
            )}
        </a>
    ) : null;
    const metaSection = (
        <div style={{ padding: 0, display: "grid", gap: 6 }}>
            {brandingSection}
            {titleSection}
            {authorSection}
        </div>
    );

    // Default: Use YouTube IFrame Player API
    return (
        <div
            className={className}
            style={{
                width,
                maxWidth,
                ...style,
            }}
        >
            <div
                style={{
                    ...getCardContainerStyle(theme, disableCard)
                }}
                onMouseEnter={(e) => {
                    if (disableCard) return;
                    e.currentTarget.style.boxShadow = cardHover.hover.boxShadow;
                    e.currentTarget.style.transform = cardHover.hover.transform;
                }}
                onMouseLeave={(e) => {
                    if (disableCard) return;
                    e.currentTarget.style.boxShadow = cardHover.rest.boxShadow;
                    e.currentTarget.style.transform = cardHover.rest.transform;
                }}
            >
                {resolvedLayout === "modern" ? (
                    <>
                        {mediaSection}
                        {metaSection}
                        {ctaSection}
                    </>
                ) : (
                    <>
                        {metaSection}
                        {mediaSection}
                        {ctaSection}
                    </>
                )}
            </div>
        </div>
    );
}
