import React, { useEffect, useMemo, useRef, useState } from "react";
import { PlatformBranding, PLATFORM_COLORS } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import { getCardContainerStyle, getCardHoverStyles, getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { CardLayout, useCardLayout } from "./CardLayout";

export type ThreadsEmbedProps = {
    url: string;
    width?: number | string;
    maxWidth?: number | string;
    className?: string;
    style?: React.CSSProperties;
    theme?: "light" | "dark";
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    ctaAlignment?: "left" | "center" | "right";
    showBranding?: boolean;
    disableCard?: boolean;
    cardLayout?: CardLayout;
};

let threadsScriptPromise: Promise<void> | null = null;

const loadThreadsScript = () => {
    if (typeof document === "undefined") return Promise.resolve();
    if (!threadsScriptPromise) {
        threadsScriptPromise = new Promise<void>((resolve) => {
            const existing = document.querySelector<HTMLScriptElement>('script[src*="threads.net/embed.js"]');
            if (existing) {
                resolve();
                return;
            }
            const script = document.createElement("script");
            script.src = "https://www.threads.net/embed.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.body.appendChild(script);
        });
    }
    return threadsScriptPromise;
};

const cleanThreadsUrl = (rawUrl: string) => {
    try {
        const parsed = new URL(rawUrl);
        parsed.search = "";
        parsed.hash = "";
        return parsed.toString();
    } catch {
        return rawUrl.split("?")[0];
    }
};

export const ThreadsEmbed: React.FC<ThreadsEmbedProps> = ({
    url,
    width = "100%",
    maxWidth = 540,
    className,
    style,
    theme = "light",
    showCTA = true,
    ctaLabel = "View on Threads",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    ctaAlignment = "left",
    showBranding = true,
    disableCard = false,
    cardLayout
}) => {
    const [ready, setReady] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cleanedUrl = useMemo(() => cleanThreadsUrl(url), [url]);
    const cardHover = getCardHoverStyles(theme);
    const ctaHover = getCtaHoverStyles(theme);
    const ctaBaseStyle = getCtaStyle(theme);
    const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.threads : "currentColor";
    const resolvedLayout = useCardLayout(cardLayout) ?? "classic";

    useEffect(() => {
        let cancelled = false;
        loadThreadsScript().then(() => {
            if (cancelled) return;
            setReady(true);
            const win = window as unknown as {
                instgrm?: { Embeds?: { process?: () => void } };
                threads?: { Embed?: { process?: () => void } };
            };
            win.instgrm?.Embeds?.process?.();
            win.threads?.Embed?.process?.();
        });
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!ready || !containerRef.current) return;
        const win = window as unknown as {
            instgrm?: { Embeds?: { process?: () => void } };
            threads?: { Embed?: { process?: () => void } };
        };
        win.instgrm?.Embeds?.process?.();
        win.threads?.Embed?.process?.();
        const container = containerRef.current;
        const syncLayout = () => {
            const iframe = container.querySelector<HTMLIFrameElement>("iframe");
            const blockquote = container.querySelector<HTMLQuoteElement>("blockquote");
            if (iframe) {
                iframe.style.width = "100%";
                iframe.style.maxWidth = "100%";
                iframe.style.display = "block";
                iframe.style.boxSizing = "border-box";
            }
            if (iframe && blockquote) {
                blockquote.style.display = "none";
            }
        };
        syncLayout();
        const observer = new MutationObserver(syncLayout);
        observer.observe(container, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [ready, cleanedUrl]);

    useEffect(() => {
        const metaPayload = {
            provider: "Threads",
            title: null,
            subtitle: null,
            author: null,
            handle: null,
            timestamp: null,
            body: null,
            media: null,
            href: cleanedUrl,
            width,
            maxWidth,
            theme,
            showCTA
        };
    }, [cleanedUrl, maxWidth, showCTA, theme, url, width]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                width,
                maxWidth,
                display: "grid",
                gap: 12,
                ...style
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
                {resolvedLayout === "classic" && showBranding && (
                    <PlatformBranding provider="Threads" theme={theme} />
                )}
                <blockquote
                    className="text-post-media"
                    data-text-post-permalink={cleanedUrl}
                    data-text-post-version="0"
                    style={{
                        margin: 0,
                        padding: 0,
                        border: "none"
                    }}
                >
                    <a
                        href={cleanedUrl}
                        style={{
                            ...getCtaStyle(theme),
                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                            lineHeight: 1.1,
                            width: "100%"
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on Threads
                    </a>
                </blockquote>
                {resolvedLayout === "modern" && showBranding && (
                    <PlatformBranding provider="Threads" theme={theme} />
                )}
                {showCTA && (
                    <a
                        href={cleanedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            ...ctaBaseStyle,
                            gap: 8,
                            justifySelf: ctaAlignment === "center" ? "center" : ctaAlignment === "right" ? "end" : "start",
                            backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.threads : ctaBaseStyle.backgroundColor,
                            borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.threads : ctaBaseStyle.borderColor,
                            color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                        }}
                        onMouseEnter={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.threads;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.threads;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.hover.transform;
                        }}
                        onMouseLeave={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.threads;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.threads;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.rest.transform;
                        }}
                    >
                        {ctaLabelIconPosition === "before" && ctaLabelIcon && (
                            <PlatformIcon platform="threads" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                        <span>{ctaLabel}</span>
                        {ctaLabelIconPosition === "after" && ctaLabelIcon && (
                            <PlatformIcon platform="threads" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                    </a>
                )}
            </div>
        </div>
    );
};
