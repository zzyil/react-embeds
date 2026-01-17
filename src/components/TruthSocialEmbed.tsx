import React, { useEffect, useMemo, useState, useId } from "react";
import { EmbedCard } from "./EmbedCard";
import { PlatformBranding, PLATFORM_COLORS } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import { getCardContainerStyle, getCardHoverStyles, getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { CardLayout, useCardLayout } from "./CardLayout";

export type TruthSocialEmbedProps = {
    url: string;
    width?: number | string;
    maxWidth?: number | string;
    maxHeight?: number;
    theme?: "light" | "dark";
    linkTarget?: "_blank" | "_self" | "_parent" | "_top";
    linkBehavior?: "card" | "title" | "cta" | "none";
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    ctaAlignment?: "left" | "center" | "right";
    showBranding?: boolean;
    disableCard?: boolean;
    className?: string;
    style?: React.CSSProperties;
    oembedProxyUrl?: string;
    cardLayout?: CardLayout;
};

type EmbedState =
    | { status: "loading" }
    | { status: "error"; error: string }
    | { status: "ok"; html: string };

const DEFAULT_PROXY = "/api/truthsocial-oembed";

const buildTruthSocialEmbedHtml = (statusUrl: string) => {
    const normalizedUrl = statusUrl.replace("/posts/", "/");
    const embedUrl = `${normalizedUrl.replace(/\/+$/, "")}/embed`;
    return `<iframe src="${embedUrl}" class="truthsocial-embed" style="max-width: 100%; border: 0" width="600" allowfullscreen="allowfullscreen"></iframe><script src="https://truthsocial.com/embed.js" async="async"></script>`;
};

const buildEmbedDocument = (html: string, id: string, theme: "light" | "dark") => {
    // Basic styling to match Truth Social look or just clean embed
    const borderColor = theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.08)";
    const background = theme === "dark" ? "#0b0b0c" : "#ffffff";
    return `<!doctype html><html><head><meta charset="utf-8"/><base target="_blank" />
<style>
html,body{margin:0;padding:0;background:transparent;width:100%;}
body { display: flex; flex-direction: column; align-items: flex-start; }
.truthsocial-embed, iframe, blockquote {
  max-width: 100% !important;
  width: 100% !important;
  min-width: 100% !important;
  border: 1px solid ${borderColor} !important;
  background: ${background} !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  margin: 0 !important;
}
</style></head><body>${html}
<script>
const report = () => {
    // Check for the rendered element
    const el = document.body.firstElementChild; 
    let height = 0;
    if (el) {
        height = el.offsetHeight || el.scrollHeight;
    } else {
        height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    // Add a small buffer for borders/shadows if needed, or stick to exact
    if (height > 0) {
        window.parent && window.parent.postMessage({ type: "truthsocial-embed-height", id: "${id}", height }, "*");
    }
};
// Poll for height changes as dynamic content might load
const delayReport = () => setTimeout(report, 200);
window.addEventListener("load", delayReport);
// Also setup Observer
if (window.ResizeObserver) {
  const observer = new ResizeObserver(() => {
     // debounce slightly
     requestAnimationFrame(report);
  });
  observer.observe(document.body);
  if (document.body.firstElementChild) {
      observer.observe(document.body.firstElementChild);
  }
} else {
  setInterval(report, 500);
}
// Initial report
report();
</script></body></html>`;
};

export const TruthSocialEmbed: React.FC<TruthSocialEmbedProps> = ({
    url,
    width = "100%",
    maxWidth = "100%", // Full width by default as requested
    maxHeight,
    theme = "light",
    linkTarget = "_blank",
    linkBehavior = "cta",
    showCTA = true,
    ctaLabel = "View on Truth Social",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    ctaAlignment = "left",
    showBranding = true,
    disableCard = false,
    className,
    style,
    oembedProxyUrl = DEFAULT_PROXY,
    cardLayout
}) => {
    const reactId = useId();
    const embedId = useMemo(() => `truthsocial-${reactId.replace(/[^a-z0-9]/gi, "")}`, [reactId]);
    const [state, setState] = useState<EmbedState>({ status: "loading" });
    const [embedHeight, setEmbedHeight] = useState<number>(400);
    const cardHover = getCardHoverStyles(theme);
    const ctaHover = getCtaHoverStyles(theme);
    const ctaBaseStyle = getCtaStyle(theme);
    const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? "currentColor" : theme === "dark" ? "#ffffff" : "#000000";
    const resolvedLayout = useCardLayout(cardLayout) ?? "classic";

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            const data = event.data;
            if (!data || typeof data !== "object") return;
            if (data.type !== "truthsocial-embed-height") return;
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
                // Validate URL basic structure
                const parsed = new URL(url);
                if (!parsed.hostname.includes("truthsocial.com")) {
                    throw new Error("Invalid Truth Social URL.");
                }

                const html = buildTruthSocialEmbedHtml(url);
                if (cancelled) return;
                setState({ status: "ok", html });
            } catch (error) {
                if (cancelled) return;
                console.error("TruthSocial embed error:", error);
                setState({
                    status: "error",
                    error: error instanceof Error ? error.message : "Failed to load embed."
                });
            }
        };

        fetchData();
        return () => { cancelled = true; };
    }, [url]);

    if (state.status !== "ok") {
        return (
            <EmbedCard
                provider="Truth Social"
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
                layout={cardLayout}
            />
        );
    }

    const srcDoc = buildEmbedDocument(state.html || "", embedId, theme);

    return (

        <div
            className={className}
            style={{
                width,
                maxWidth,
                display: "grid",
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
                    <PlatformBranding provider="Truth Social" theme={theme} />
                )}
                <iframe
                    title="Truth Social embed"
                    srcDoc={srcDoc}
                    width="100%"
                    height={embedHeight}
                    style={{
                        border: 0,
                        display: "block",
                        borderRadius: 12,
                        background: theme === 'dark' ? "#000000" : "#ffffff",
                        width: "100%",
                        boxSizing: "border-box"
                    }}
                    loading="lazy"
                    allowFullScreen
                />
                {resolvedLayout === "modern" && showBranding && (
                    <PlatformBranding provider="Truth Social" theme={theme} />
                )}
                {showCTA && (
                    <a
                        href={url}
                        target={linkTarget}
                        rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
                        style={{
                            ...ctaBaseStyle,
                            gap: 8,
                            justifySelf: ctaAlignment === "center" ? "center" : ctaAlignment === "right" ? "end" : "start",
                            backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.truthSocial : ctaBaseStyle.backgroundColor,
                            borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.truthSocial : ctaBaseStyle.borderColor,
                            color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                        }}
                        onMouseEnter={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.truthSocial;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.truthSocial;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.hover.transform;
                        }}
                        onMouseLeave={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.truthSocial;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.truthSocial;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.rest.transform;
                        }}
                    >
                        {ctaLabelIconPosition === "before" && ctaLabelIcon && (
                            <PlatformIcon platform="truthSocial" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                        <span>{ctaLabel}</span>
                        {ctaLabelIconPosition === "after" && ctaLabelIcon && (
                            <PlatformIcon platform="truthSocial" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                    </a>
                )}
            </div>
        </div>
    );
};
