import React from "react";
import { EmbedCard } from "./EmbedCard";
import { PlatformBranding, PLATFORM_COLORS } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import { getCardContainerStyle, getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { CardLayout, useCardLayout } from "./CardLayout";

export type FacebookEmbedProps = {
  url: string;
  width?: string | number;
  maxWidth?: string | number;
  className?: string;
  style?: React.CSSProperties;
  theme?: "light" | "dark";
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

export function FacebookEmbed({
  url,
  width = "100%",
  maxWidth = 550,
  className,
  style,
  theme = "light",
  constrainWidthByEmbed = false,
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on Facebook",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  cardLayout
}: FacebookEmbedProps) {
  const ctaHover = getCtaHoverStyles(theme);
  const ctaBaseStyle = getCtaStyle(theme);
  const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.facebook : "currentColor";
  const resolvedLayout = useCardLayout(cardLayout) ?? "classic";
  if (!url) {
    return (
      <EmbedCard
        provider="Facebook"
        status="error"
        statusMessage="Invalid Facebook URL"
        theme={theme}
        className={className}
        style={style}
        width={width}
        maxWidth={maxWidth}
        disableCard={disableCard}
        layout={cardLayout}
      />
    );
  }

  const isVideoUrl = url.includes("/videos/") ||
    url.includes("/watch/") ||
    url.includes("/live/") ||
    url.includes("/reel/");

  const embedBaseUrl = isVideoUrl
    ? "https://www.facebook.com/plugins/video.php"
    : "https://www.facebook.com/plugins/post.php";

  const embedUrl = `${embedBaseUrl}?href=${encodeURIComponent(url)}&show_text=true&width=500`;
  const normalizedMaxWidth = typeof maxWidth === "string" && maxWidth.trim() === "100%" ? undefined : maxWidth;
  const fallbackCardWidth = typeof normalizedMaxWidth === "number"
    ? `${normalizedMaxWidth}px`
    : normalizedMaxWidth || "500px";
  const cardMaxWidth = constrainWidthByEmbed
    ? typeof width === "number"
      ? `${width}px`
      : width === "100%"
        ? fallbackCardWidth
        : width
    : maxWidth;

  return (
    <div
      className={className}
      style={{
        width,
        maxWidth: cardMaxWidth,
        ...style
      }}
    >
      <div
        style={{
          ...getCardContainerStyle(theme, disableCard)
        }}
      >
        {resolvedLayout === "classic" && showBranding && (
          <PlatformBranding provider="Facebook" theme={theme} />
        )}
        <iframe
          src={embedUrl}
          width="100%"
          style={{
            border: "none",
            minHeight: isVideoUrl ? undefined : "500px",
            aspectRatio: isVideoUrl ? "16/9" : undefined,
            borderRadius: disableCard ? undefined : "8px",
            overflow: "hidden"
          }}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title={isVideoUrl ? "Facebook Video" : "Facebook Post"}
        />
        {resolvedLayout === "modern" && showBranding && (
          <PlatformBranding provider="Facebook" theme={theme} />
        )}
        {showCTA && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...ctaBaseStyle,
              gap: 8,
              backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.facebook : ctaBaseStyle.backgroundColor,
              borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.facebook : ctaBaseStyle.borderColor,
              color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
            }}
            onMouseEnter={(e) => {
              if (ctaUsePlatformColor) {
                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.facebook;
                e.currentTarget.style.borderColor = PLATFORM_COLORS.facebook;
                e.currentTarget.style.color = "#ffffff";
              } else {
                e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
              }
              e.currentTarget.style.transform = ctaHover.hover.transform;
            }}
            onMouseLeave={(e) => {
              if (ctaUsePlatformColor) {
                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.facebook;
                e.currentTarget.style.borderColor = PLATFORM_COLORS.facebook;
                e.currentTarget.style.color = "#ffffff";
              } else {
                e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
              }
              e.currentTarget.style.transform = ctaHover.rest.transform;
            }}
          >
            {ctaLabelIconPosition === "before" && ctaLabelIcon && (
              <PlatformIcon platform="facebook" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
            )}
            <span>{ctaLabel}</span>
            {ctaLabelIconPosition === "after" && ctaLabelIcon && (
              <PlatformIcon platform="facebook" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
            )}
          </a>
        )}
      </div>
    </div>
  );
}

export default FacebookEmbed;
