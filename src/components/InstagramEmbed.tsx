import React from "react";
import { EmbedCard } from "./EmbedCard";
import { PlatformBranding, PLATFORM_COLORS } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import { getCardContainerStyle, getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { CardLayout, useCardLayout } from "./CardLayout";

export type InstagramEmbedProps = {
  url: string;
  width?: string | number;
  maxWidth?: string | number;
  className?: string;
  style?: React.CSSProperties;
  theme?: "light" | "dark";
  /** Layout controls for the official Instagram iframe embed. */
  iframeAlignment?: "center" | "left" | "right";
  /** Constrain iframe width based on viewport height. */
  constrainWidthByViewport?: boolean;
  /** Limit card width to the embed width. */
  constrainWidthByEmbed?: boolean;
  showBranding?: boolean;
  showCTA?: boolean;
  ctaLabel?: string;
  ctaLabelIcon?: boolean;
  ctaLabelIconPosition?: "before" | "after";
  ctaUsePlatformColor?: boolean;
  ctaUsePlatformIconColor?: boolean;
  disableCard?: boolean;
  cardLayout?: CardLayout;
};

function extractPostId(url: string): string {
  try {
    const match = url.match(/\/(p|reel|reels)\/([^\/\?]+)/);
    return match && match[2] ? match[2] : "";
  } catch {
    return "";
  }
}

function isLikelyVideo(url: string): boolean {
  return url.includes("/reel") || url.includes("/reels");
}

/**
 * Embed component for Instagram posts and reels.
 * Renders the official Instagram iframe embed widget.
 *
 * @param props - Component configuration
 * @returns Embedded Instagram post
 *
 * @example
 * ```tsx
 * <InstagramEmbed url="https://www.instagram.com/p/CG0UU3J" theme="dark" />
 * ```
 */
export function InstagramEmbed({
  url,
  width = "100%",
  maxWidth = 550,
  className,
  style,
  theme = "light",
  iframeAlignment = "center",
  constrainWidthByViewport = true,
  constrainWidthByEmbed = false,
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on Instagram",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  cardLayout
}: InstagramEmbedProps) {
  const normalizedUrl = (url || "").split("?")[0] || "";
  const ctaHover = getCtaHoverStyles(theme);
  const ctaBaseStyle = getCtaStyle(theme);
  const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.instagram : "currentColor";
  const resolvedLayout = useCardLayout(cardLayout) ?? "classic";
  const postId = extractPostId(normalizedUrl);
  const isVideo = isLikelyVideo(normalizedUrl);

  if (!postId) {
    return (
      <EmbedCard
        provider="Instagram"
        status="error"
        statusMessage="Invalid Instagram URL"
        theme={theme}
        width={width}
        maxWidth={maxWidth}
        disableCard={disableCard}
        className={className}
        style={{ ...style, "--embed-accent": "#E1306C" } as React.CSSProperties}
        layout={cardLayout}
      />
    );
  }

  const embedType = normalizedUrl.includes("/reel") || normalizedUrl.includes("/reels") ? "reel" : "p";
  const embedUrl = `https://www.instagram.com/${embedType}/${postId}/embed`;
  const embedHeight = isVideo ? 780 : 680;
  const normalizedMaxWidth = typeof maxWidth === "string" && maxWidth.trim() === "100%" ? undefined : maxWidth;
  const fallbackCardWidth = typeof normalizedMaxWidth === "number"
    ? `${normalizedMaxWidth}px`
    : normalizedMaxWidth || "550px";

  const alignmentMargin =
    iframeAlignment === "center" || constrainWidthByEmbed
      ? "0 auto"
      : iframeAlignment === "right"
        ? "0 0 0 auto"
        : "0 auto 0 0";
  const heightLimit = `min(100vh, ${embedHeight}px)`;
  const computedMaxWidth = constrainWidthByViewport
    ? isVideo
      ? `min(100%, calc(${heightLimit} * 0.5625))`
      : `min(100%, calc(${heightLimit} * 1))`
    : "100%";
  const cardMaxWidth = constrainWidthByEmbed
    ? typeof width === "number"
      ? `${width}px`
      : width === "100%"
        ? fallbackCardWidth
        : width
    : maxWidth;

  const alignmentStyles: React.CSSProperties = {};
  if (constrainWidthByEmbed) {
    if (iframeAlignment === "center") {
      alignmentStyles.marginLeft = "auto";
      alignmentStyles.marginRight = "auto";
    } else if (iframeAlignment === "left") {
      alignmentStyles.marginRight = "auto";
      alignmentStyles.marginLeft = "0";
    } else if (iframeAlignment === "right") {
      alignmentStyles.marginLeft = "auto";
      alignmentStyles.marginRight = "0";
    }
  }

  return (
    <div
      className={className}
      style={{
        width,
        maxWidth: cardMaxWidth,
        ...alignmentStyles,
        ...style
      }}
    >
      <div
        style={{
          ...getCardContainerStyle(theme, disableCard)
        }}
      >
        {resolvedLayout === "classic" && showBranding && (
          <PlatformBranding provider="Instagram" theme={theme} />
        )}
        <iframe
          src={embedUrl}
          width={width}
          height={embedHeight}
          style={{
            border: 0,
            width: "100%",
            maxWidth: computedMaxWidth,
            margin: alignmentMargin,
            display: "block",
            borderRadius: disableCard ? undefined : 8
          }}
          allowTransparency={true}
          allow="encrypted-media"
          title="Instagram post"
        />
        {resolvedLayout === "modern" && showBranding && (
          <PlatformBranding provider="Instagram" theme={theme} />
        )}
        {showCTA && (
          <a
            href={normalizedUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...ctaBaseStyle,
              gap: 8,
              backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.instagram : ctaBaseStyle.backgroundColor,
              borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.instagram : ctaBaseStyle.borderColor,
              color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
            }}
            onMouseEnter={(e) => {
              if (ctaUsePlatformColor) {
                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.instagram;
                e.currentTarget.style.borderColor = PLATFORM_COLORS.instagram;
                e.currentTarget.style.color = "#ffffff";
              } else {
                e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
              }
              e.currentTarget.style.transform = ctaHover.hover.transform;
            }}
            onMouseLeave={(e) => {
              if (ctaUsePlatformColor) {
                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.instagram;
                e.currentTarget.style.borderColor = PLATFORM_COLORS.instagram;
                e.currentTarget.style.color = "#ffffff";
              } else {
                e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
              }
              e.currentTarget.style.transform = ctaHover.rest.transform;
            }}
          >
            {ctaLabelIconPosition === "before" && ctaLabelIcon && (
              <PlatformIcon platform="instagram" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
            )}
            <span>{ctaLabel}</span>
            {ctaLabelIconPosition === "after" && ctaLabelIcon && (
              <PlatformIcon platform="instagram" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
            )}
          </a>
        )}
      </div>
    </div>
  );
}

export default InstagramEmbed;
