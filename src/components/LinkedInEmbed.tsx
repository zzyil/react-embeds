import React, { useMemo } from "react";
import { EmbedCard } from "./EmbedCard";
import { PlatformBranding, PLATFORM_COLORS } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import { getCardContainerStyle, getCardHoverStyles, getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { CardLayout, useCardLayout } from "./CardLayout";

export type LinkedInEmbedProps = {
    url: string;
    width?: number | string;
    maxWidth?: number | string;
    height?: number;
    collapsed?: boolean;
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
    /**
     * Alignment of the iframe within the container.
     */
    iframeAlignment?: "center" | "left" | "right";
    /**
     * Optional custom width for the embed.
     */
    /**
     * Maximum height for the embed. If contents exceed this, it will scroll.
     */
    maxHeight?: number | string;
    constrainWidthByEmbed?: boolean;
    cardLayout?: CardLayout;
};

const DEFAULT_HEIGHT = 670;

const buildLinkedInEmbedUrl = (rawUrl: string, collapsed: boolean) => {
    try {
        const parsed = new URL(rawUrl);
        if (!parsed.hostname.includes("linkedin.com")) return null;

        if (parsed.pathname.startsWith("/embed/")) {
            const embedUrl = new URL(parsed.toString());
            embedUrl.searchParams.set("collapsed", collapsed ? "1" : "0");
            return embedUrl.toString();
        }

        let urnType: "share" | "activity" | "ugcPost" = "share";
        let postId: string | undefined = undefined;

        const urnMatch = rawUrl.match(/urn:li:(share|activity|ugcPost):(\d+)/);
        if (urnMatch) {
            urnType = urnMatch[1] as "share" | "activity" | "ugcPost";
            postId = urnMatch[2];
        }

        if (!postId) {
            const activityMatch = rawUrl.match(/activity-(\d+)/);
            if (activityMatch) {
                urnType = "activity";
                postId = activityMatch[1];
            }
        }

        if (!postId) {
            const ugcMatch = rawUrl.match(/ugcPost-(\d+)/);
            if (ugcMatch) {
                urnType = "ugcPost";
                postId = ugcMatch[1];
            }
        }

        if (!postId) return null;

        const embedUrl = new URL(`https://www.linkedin.com/embed/feed/update/urn:li:${urnType}:${postId}`);
        embedUrl.searchParams.set("collapsed", collapsed ? "1" : "0");
        return embedUrl.toString();
    } catch {
        return null;
    }
};

export const LinkedInEmbed: React.FC<LinkedInEmbedProps> = ({
    url,
    width = 504,
    maxWidth = "100%",
    height = DEFAULT_HEIGHT,
    collapsed = true,
    theme = "light",
    linkTarget = "_blank",
    linkBehavior = "cta",
    showCTA = true,
    ctaLabel = "View on LinkedIn",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    ctaAlignment = "left",
    showBranding = true,
    disableCard = false,
    iframeAlignment = "center",
    maxHeight,
    constrainWidthByEmbed = false,
    className,
    style,
    cardLayout
}) => {
    const embedUrl = useMemo(() => buildLinkedInEmbedUrl(url, collapsed), [url, collapsed]);
    const cardHover = getCardHoverStyles(theme);
    const ctaHover = getCtaHoverStyles(theme);
    const ctaBaseStyle = getCtaStyle(theme);
    const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.linkedin : "currentColor";
    const resolvedLayout = useCardLayout(cardLayout) ?? "classic";
    const statusMessage = !url
        ? "No URL provided."
        : embedUrl
            ? undefined
            : "Invalid LinkedIn post URL.";

    if (!embedUrl) {
        return (
            <EmbedCard
                provider="LinkedIn"
                href={url}
                status="error"
                statusMessage={statusMessage}
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

    const alignmentMargin =
        iframeAlignment === "center"
            ? "0 auto"
            : iframeAlignment === "right"
                ? "0 0 0 auto"
                : "0 auto 0 0";

    return (
        <div
            className={className}
            style={{
                width: constrainWidthByEmbed ? "fit-content" : "100%",
                maxWidth: constrainWidthByEmbed ? width : maxWidth || "100%",
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
                    <PlatformBranding provider="LinkedIn" theme={theme} />
                )}
                <div style={{
                    width: "100%",
                    maxHeight: maxHeight,
                    overflow: maxHeight ? "auto" : "visible"
                }}>
                    <iframe
                        title="LinkedIn embed"
                        src={embedUrl}
                        width="100%"
                        height={height}
                        style={{
                            border: 0,
                            display: "block",
                            borderRadius: 12,
                            background: theme === 'dark' ? "#000000" : "#ffffff",
                            width: "100%",
                            maxWidth: 504, // Enforce LinkedIn's default width
                            margin: alignmentMargin, // Apply alignment to the iframe itself
                            boxSizing: "border-box"
                        }}
                        loading="lazy"
                        allowFullScreen
                    />
                </div>
                {resolvedLayout === "modern" && showBranding && (
                    <PlatformBranding provider="LinkedIn" theme={theme} />
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
                            backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.linkedin : ctaBaseStyle.backgroundColor,
                            borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.linkedin : ctaBaseStyle.borderColor,
                            color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                        }}
                        onMouseEnter={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.linkedin;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.linkedin;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.hover.transform;
                        }}
                        onMouseLeave={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.linkedin;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.linkedin;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.rest.transform;
                        }}
                    >
                        {ctaLabelIconPosition === "before" && ctaLabelIcon && (
                            <PlatformIcon platform="linkedin" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                        <span>{ctaLabel}</span>
                        {ctaLabelIconPosition === "after" && ctaLabelIcon && (
                            <PlatformIcon platform="linkedin" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                    </a>
                )}
            </div>
        </div>
    );
};
