import React from "react";
import { MediaPlayer } from "./MediaPlayer";
import { PlatformBranding, PLATFORM_COLORS, PROVIDER_TO_PLATFORM } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import { CardLayout, useCardLayout } from "./CardLayout";

/**
 * Badge configuration for EmbedCard.
 */
export type EmbedBadge = {
  /** Text to display in the badge */
  label: string;
  /** Visual style of the badge */
  tone?: "accent" | "alert" | "muted";
};

/**
 * Media content configuration for EmbedCard.
 */
export type EmbedMedia = {
  /** Type of media to render */
  type: "image" | "video" | "link" | "iframe";
  /** URL of the media content */
  url: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Poster image for video content */
  poster?: string;
  /** CSS aspect ratio (e.g., "16/9") */
  aspectRatio?: string;
  /** Fixed height override (e.g., 152 for Spotify tracks) */
  height?: string | number;
  /** Optional width cap for iframe embeds */
  maxWidth?: string | number;
  /** Whether to use full-width wrapper for media */
  fullWidth?: boolean;
  /** Alignment for media embeds */
  align?: "center" | "left" | "right";
  /** Whether to show frame around iframe */
  frame?: boolean;
  /** Whether to use rounded corners */
  rounded?: boolean;
  /** Custom border radius for iframe */
  iframeRadius?: number;
  /** Background color for iframe wrapper */
  background?: string;
  /** Available quality options for video */
  qualities?: { label: string; src: string }[];
  /** Whether to autoplay video */
  autoPlay?: boolean;
  /** Whether to show video controls */
  controls?: boolean;
};

/**
 * Metadata item for EmbedCard footer.
 */
export type EmbedMetaItem = {
  /** Label for the metadata */
  label: string;
  /** Value to display */
  value: string;
};

/**
 * Props for the EmbedCard component.
 */
export type EmbedCardProps = {
  /** Platform/provider name (e.g., "YouTube", "Twitter") */
  provider: string;
  /** Main title of the embed */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Icon to display before subtitle */
  subtitleIcon?: React.ReactNode;
  /** Author/creator name */
  author?: string;
  /** Timestamp or date string */
  timestamp?: string;
  /** Plain text body content */
  body?: string;
  /** HTML body content (rendered with dangerouslySetInnerHTML) */
  bodyHtml?: string;
  /** Media content configuration */
  media?: EmbedMedia;
  /** Poll data for rendering polls */
  pollData?: {
    options: Array<{ text: string; vote_count?: number; id: string }>;
    total_vote_count: number;
    is_prediction: boolean;
  };
  /** Badges to display in header */
  badges?: EmbedBadge[];
  /** Metadata items for footer */
  footerMeta?: EmbedMetaItem[];
  /** Link URL for the embed source */
  href?: string;
  /** Label for the CTA button */
  ctaLabel?: string;
  /** Whether to show platform icon in CTA */
  ctaLabelIcon?: boolean;
  /** Position of icon in CTA button */
  ctaLabelIconPosition?: "before" | "after";
  /** Whether to use platform color for CTA button */
  ctaUsePlatformColor?: boolean;
  /** Whether to use platform color for CTA icon only */
  ctaUsePlatformIconColor?: boolean;
  /** How the link should behave */
  linkBehavior?: "card" | "title" | "cta" | "none";
  /** Target for link opens */
  linkTarget?: "_blank" | "_self" | "_parent" | "_top";
  /** Whether to disable card styling */
  disableCard?: boolean;
  /** Width of the card */
  width?: string | number;
  /** Maximum width of the card */
  maxWidth?: string | number;
  /** Current loading/error status */
  status?: "ok" | "loading" | "error" | "removed";
  /** Message to display for non-ok status */
  statusMessage?: string;
  /** Custom footer content */
  footerChildren?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether to show CTA button */
  showCTA?: boolean;
  /** Custom platform icon */
  platformIcon?: React.ReactNode;
  /** Whether to show platform branding */
  showBranding?: boolean;
  /** Whether to hide provider title */
  hideProviderTitle?: boolean;
  /** Color theme */
  theme?: "light" | "dark";
  /** Card layout style */
  layout?: CardLayout;
  /** Where to place children content */
  childrenPlacement?: "body" | "media";
  /** Child elements to render */
  children?: React.ReactNode;
};

// Default palettes for light and dark modes
const themes = {
  light: {
    background: "#ffffff",
    border: "rgba(0, 0, 0, 0.08)",
    text: "#1d1d1f",
    muted: "#86868b",
    accent: "var(--embed-accent, #ff4500)",
    alert: "#ff3b30",
    shadow: "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
    hoverShadow: "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08)",
    card: "#ffffff",
    mediaBg: "rgba(0, 0, 0, 0.02)",
    linkHoverBg: "rgba(0, 0, 0, 0.03)",
    pollBar: {
      from: "rgba(var(--embed-accent-rgb), 0.08)",
      to: "rgba(var(--embed-accent-rgb), 0.04)"
    }
  },
  dark: {
    background: "#000000", // Pure black
    border: "rgba(255, 255, 255, 0.16)",
    text: "#ffffff",
    muted: "#a1a1aa",
    accent: "var(--embed-accent, #ff4500)",
    alert: "#ff6b6b",
    shadow: "none",
    hoverShadow: "0 0 0 1px rgba(255, 255, 255, 0.2)",
    card: "#000000",
    mediaBg: "rgba(255, 255, 255, 0.08)",
    linkHoverBg: "rgba(255, 255, 255, 0.12)",
    pollBar: {
      from: "rgba(var(--embed-accent-rgb), 0.2)",
      to: "rgba(var(--embed-accent-rgb), 0.1)"
    }
  }
};

/**
 * Base UI component for displaying embedded social media content.
 * Provides a consistent card layout with support for media, metadata, badges, and CTAs.
 * Used as the foundation for all platform-specific embed components.
 *
 * @param props - Component configuration
 * @returns Styled embed card element
 *
 * @example
 * ```tsx
 * <EmbedCard
 *   provider="Twitter"
 *   title="Example Tweet"
 *   author="@username"
 *   body="This is the tweet content"
 *   href="https://twitter.com/user/status/123"
 *   theme="dark"
 * />
 * ```
 */
export function EmbedCard({
  provider,
  title,
  subtitle,
  subtitleIcon,
  author,
  timestamp,
  body,
  bodyHtml,
  media,
  pollData,
  badges = [],
  footerMeta = [],
  href,
  ctaLabel = "View source",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  linkBehavior = "cta",
  linkTarget = "_blank",
  disableCard = false,
  width = "100%",
  maxWidth = 600,
  status = "ok",
  statusMessage,
  footerChildren,
  className,
  style,
  showCTA = true,
  platformIcon,
  showBranding = true,
  hideProviderTitle = false,
  theme = "light",
  layout,
  childrenPlacement = "body",
  children
}: EmbedCardProps): JSX.Element {
  const palette = themes[theme];
  const normalizedProvider = provider?.toLowerCase().trim();
  const ctaPlatformId = normalizedProvider ? PROVIDER_TO_PLATFORM[normalizedProvider] : undefined;
  const platformColor = ctaPlatformId ? PLATFORM_COLORS[ctaPlatformId] : undefined;
  const usePlatformButtonColor = Boolean(ctaUsePlatformColor && platformColor);
  const usePlatformIconColor = Boolean(ctaUsePlatformIconColor && platformColor && !usePlatformButtonColor);
  const ctaIconColor = usePlatformButtonColor
    ? ctaPlatformId === "snapchat" || ctaPlatformId === "kick" ? "#000000" : "#ffffff"
    : usePlatformIconColor
      ? ctaPlatformId === "truthSocial" ? "currentColor" : platformColor
      : ctaPlatformId === "truthSocial"
        ? "#000000"
        : "currentColor";
  const ctaButtonTextColor = usePlatformButtonColor
    ? ctaPlatformId === "snapchat" || ctaPlatformId === "kick" ? "#000000" : "#ffffff"
    : palette.text;
  const ctaIcon = ctaLabelIcon && ctaPlatformId ? (
    <PlatformIcon
      platform={ctaPlatformId}
      size={14}
      color={ctaIconColor}
      aria-hidden="true"
      focusable="false"
    />
  ) : null;
  const useSharedBranding = normalizedProvider !== "youtube";
  const resolvedLayout = useCardLayout(layout) ?? "classic";

  // If CSS vars are provided via style or className, they will override these if the user sets them up.
  // But here we are setting defaults based on the theme prop.
  // Note: CSS variables in the `style` prop take precedence over these computed inline styles if collision occurs,
  // but to truly support overrides, we should probably output CSS variables on the root.

  const cardStyle: React.CSSProperties = {
    "--embed-bg": palette.background,
    "--embed-border": palette.border,
    "--embed-text": palette.text,
    "--embed-muted": palette.muted,
    "--embed-card-bg": palette.card,
    ...style
  } as React.CSSProperties;

  // Active media state to support quality switching
  const [activeMedia, setActiveMedia] = React.useState<EmbedMedia | undefined>(media);

  // Sync state if prop changes
  React.useEffect(() => {
    setActiveMedia(media);
  }, [media]);

  const baseCardStyle: React.CSSProperties = {
    backgroundColor: disableCard ? "transparent" : palette.card,
    borderRadius: disableCard ? 0 : 16,
    border: disableCard ? "none" : `1px solid ${palette.border}`,
    overflow: "hidden",
    color: palette.text,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    boxShadow: disableCard ? "none" : palette.shadow,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    maxWidth: maxWidth,
    width: width,
    padding: disableCard ? 0 : 20,
    boxSizing: "border-box",
    display: "grid",
    gap: 12,
    ...cardStyle
  };

  if (status !== "ok") {
    return (
      <article
        className={className}
        style={{
          ...baseCardStyle,
          alignItems: "center",
          textAlign: "center",
          gap: 12
        }}
        aria-live="polite"
      >
        <div style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: palette.muted, opacity: 0.8 }}>
          {provider}
        </div>
        <div style={{ fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
          {status === "loading" && "Loading post..."}
          {status === "removed" && "This post is no longer available"}
          {status === "error" && "Unable to load the embed"}
        </div>
        {statusMessage && (
          <div style={{ fontSize: "0.9375rem", color: palette.muted, lineHeight: 1.5 }}>{statusMessage}</div>
        )}
        {href && status !== "loading" && (
          <a
            href={href}
            style={{
              color: palette.text,
              border: `1.5px solid ${palette.border}`,
              padding: "9px 18px",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              marginTop: 4,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              backgroundColor: palette.background
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.linkHoverBg;
              e.currentTarget.style.borderColor = palette.text;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = palette.background;
              e.currentTarget.style.borderColor = palette.border;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Open on {provider}
          </a>
        )}
      </article>
    );
  }

  // Determine if the whole card should be a link
  const isCardLink = linkBehavior === "card" && href;
  const isTitleLink = linkBehavior === "title" && href;

  const headerSection = (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <div style={{ display: "grid", gap: 8 }}>
        {showBranding && (
          useSharedBranding ? (
            <PlatformBranding
              provider={provider}
              theme={theme}
              icon={platformIcon}
              hideProviderTitle={hideProviderTitle}
            />
          ) : (
            <div
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: palette.muted,
                opacity: 0.8
              }}
            >
              {provider}
            </div>
          )
        )}
        {subtitle && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.9375rem", fontWeight: 600, color: palette.text, letterSpacing: "-0.01em" }}>
            {subtitleIcon && <span style={{ display: "inline-flex", alignItems: "center" }}>{subtitleIcon}</span>}
            <span>{subtitle}</span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", alignItems: "flex-start" }}>
        {badges.map((badge) => {
          const isAccent = badge.tone === "accent";
          const isAlert = badge.tone === "alert";

          // Determine badge colors dynamically
          let badgeBg = "rgba(0, 0, 0, 0.04)";
          let badgeColor = palette.muted;

          if (theme === "dark") {
            if (isAlert) {
              badgeBg = "rgba(255, 107, 107, 0.2)";
              badgeColor = "#ff6b6b";
            } else if (isAccent) {
              // We assume --embed-accent is defined, else fallback
              badgeBg = "rgba(255, 255, 255, 0.1)"; // Default to subtle white in dark mode if accent is just color
              badgeColor = "var(--embed-accent, #ff4500)";
            } else {
              badgeBg = "rgba(255, 255, 255, 0.1)";
              badgeColor = palette.muted;
            }
          } else {
            // Light mode
            if (isAlert) {
              badgeBg = "rgba(255, 59, 48, 0.1)";
              badgeColor = palette.alert;
            } else if (isAccent) {
              badgeBg = "rgba(255, 69, 0, 0.1)"; // Simple approximation or usage of CSS var if needed
              badgeColor = palette.accent;
            }
          }

          return (
            <span
              key={badge.label}
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                padding: "5px 10px",
                borderRadius: 8,
                backgroundColor: badgeBg,
                color: badgeColor,
                border: "none",
                backdropFilter: "blur(10px)"
              }}
            >
              {badge.label}
            </span>
          );
        })}
      </div>
    </header>
  );

  const titleSection = title && (
    isTitleLink ? (
      <a
        href={href}
        target={linkTarget}
        rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
        style={{
          fontSize: "1.125rem",
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: "-0.02em",
          color: palette.text,
          textDecoration: "none",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        {title}
      </a>
    ) : (
      <div style={{ fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", color: palette.text }}>{title}</div>
    )
  );

  const metaSection = (author || timestamp) ? (
    <div style={{ fontSize: "0.875rem", color: palette.muted, fontWeight: 400 }}>
      {[author, timestamp].filter(Boolean).join(" · ")}
    </div>
  ) : null;

  const bodySection = (bodyHtml || body) ? (
    <div
      style={{ fontSize: "0.9375rem", color: palette.text, lineHeight: 1.5, opacity: 0.85 }}
      {...(bodyHtml ? { dangerouslySetInnerHTML: { __html: bodyHtml } } : undefined)}
    >
      {!bodyHtml ? body : null}
    </div>
  ) : null;

  const mediaSection = (
    <>
      {activeMedia?.type === "image" && (() => {
        const align = activeMedia.align || "center";
        const alignmentMargin =
          align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : "0 auto 0 0";
        const fullWidth = activeMedia.fullWidth !== false;
        return (
          <div style={fullWidth ? { width: "100%" } : undefined}>
            <div
              style={{
                width: fullWidth ? (activeMedia.maxWidth ?? "100%") : (activeMedia.maxWidth ?? "auto"),
                maxWidth: fullWidth ? (activeMedia.maxWidth ?? "100%") : activeMedia.maxWidth,
                margin: alignmentMargin
              }}
            >
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `1px solid ${palette.border}`,
                  backgroundColor: palette.mediaBg
                }}
              >
                <img
                  src={activeMedia.url}
                  alt={activeMedia.alt ?? "Embedded media"}
                  style={{ display: "block", width: "100%", height: "auto" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        );
      })()}
      {activeMedia?.type === "video" && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <MediaPlayer
            src={activeMedia.url}
            poster={activeMedia.poster}
            alt={activeMedia.alt}
            qualities={activeMedia.qualities}
            autoPlay={activeMedia.autoPlay}
            onQualityChange={(q) => {
              if (activeMedia) {
                setActiveMedia({ ...activeMedia, url: q.src });
              }
            }}
          />
        </div>
      )}

      {activeMedia?.type === "iframe" && (
        <IframeWrapper media={activeMedia} palette={palette} theme={theme} />
      )}

      {activeMedia?.type === "link" && (
        <a
          href={activeMedia.url}
          target={linkTarget}
          rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 12,
            border: `1px solid ${palette.border}`,
            textDecoration: "none",
            color: "inherit",
            backgroundColor: palette.background,
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = theme === 'dark' ? "0 4px 12px rgba(0, 0, 0, 0.4)" : "0 4px 12px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.borderColor = palette.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.borderColor = palette.border;
          }}
        >
          {activeMedia.poster && (
            <div style={{ width: "100%", height: 260, overflow: "hidden", backgroundColor: palette.mediaBg }}>
              <img
                src={activeMedia.poster}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
          <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: palette.muted, opacity: 0.8 }}>
              {(() => {
                try {
                  return new URL(activeMedia.url).hostname.replace('www.', '');
                } catch {
                  return '';
                }
              })()}
            </div>
            <div style={{ fontSize: "1.0625rem", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.01em", color: palette.text }}>
              {activeMedia.alt}
            </div>
          </div>
        </a>
      )}
    </>
  );

  const pollSection = pollData ? (
    <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 10 }}>
      {pollData.options.map((option) => {
        const percentage = pollData.total_vote_count > 0 && typeof option.vote_count === 'number'
          ? Math.round((option.vote_count / pollData.total_vote_count) * 100)
          : 0;

        return (
          <div
            key={option.id}
            style={{
              position: "relative",
              padding: "12px 16px",
              borderRadius: 10,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.background,
              overflow: "hidden",
              transition: "border-color 0.2s"
            }}
          >
            {/* Progress Bar Background */}
            {pollData.total_vote_count > 0 && typeof option.vote_count === 'number' && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${percentage}%`,
                  // In a real app we'd convert hex to rgba or use CSS vars more cleanly
                  // For now, we fallback to a generic overlay
                  background: theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.04)",
                  zIndex: 0,
                  transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              />
            )}

            <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", fontSize: "0.9375rem", fontWeight: 500, color: palette.text }}>
              <span>{option.text}</span>
              {typeof option.vote_count === 'number' && (
                <span style={{ color: palette.muted, fontWeight: 600 }}>{percentage}%</span>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ fontSize: "0.8125rem", color: palette.muted, marginTop: 2, fontWeight: 500 }}>
        {pollData.total_vote_count.toLocaleString()} {pollData.total_vote_count === 1 ? 'vote' : 'votes'} · {pollData.is_prediction ? "Prediction" : "Poll"}
      </div>
    </div>
  ) : null;

  const childrenSection = children ? (
    <div style={{ padding: disableCard ? 0 : "0 20px" }}>
      {children}
    </div>
  ) : null;
  const childrenMediaSection = children ? (
    <div style={{ width: "100%" }}>
      {children}
    </div>
  ) : null;
  const mediaSlot = childrenPlacement === "media" ? childrenMediaSection : mediaSection;
  const trailingChildren = childrenPlacement === "media" ? null : childrenSection;

  const footerSection = (footerMeta.length > 0 || (href && ctaLabel)) ? (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        marginTop: 4
      }}
    >
      {footerMeta.length > 0 && (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {footerMeta.map((item) => (
            <span key={item.label} style={{ fontSize: "0.8125rem", color: palette.muted, fontWeight: 500 }}>
              {item.label}: <strong style={{ color: palette.text, fontWeight: 600 }}>{item.value}</strong>
            </span>
          ))}
        </div>
      )}
      {footerChildren}
      {href && ctaLabel && showCTA && (
        <a
          href={href}
          target={linkTarget}
          rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
          style={{
            color: ctaButtonTextColor,
            border: `1.5px solid ${usePlatformButtonColor ? platformColor : palette.border}`,
            padding: "9px 18px",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.875rem",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            backgroundColor: usePlatformButtonColor ? platformColor : palette.background,
            display: "inline-flex",
            alignItems: "center",
            gap: 8
          }}
          onMouseEnter={(e) => {
            if (usePlatformButtonColor) {
              e.currentTarget.style.backgroundColor = platformColor as string;
              e.currentTarget.style.borderColor = platformColor as string;
              e.currentTarget.style.color = ctaButtonTextColor;
            } else {
              e.currentTarget.style.backgroundColor = palette.linkHoverBg;
              e.currentTarget.style.borderColor = palette.text;
            }
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            if (usePlatformButtonColor) {
              e.currentTarget.style.backgroundColor = platformColor as string;
              e.currentTarget.style.borderColor = platformColor as string;
              e.currentTarget.style.color = ctaButtonTextColor;
            } else {
              e.currentTarget.style.backgroundColor = palette.background;
              e.currentTarget.style.borderColor = palette.border;
            }
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {ctaLabelIconPosition === "before" && ctaIcon}
          <span>{ctaLabel}</span>
          {ctaLabelIconPosition === "after" && ctaIcon}
        </a>
      )}
    </footer>
  ) : null;

  const classicContent = (
    <>
      {headerSection}
      {titleSection}
      {metaSection}
      {bodySection}
      {mediaSlot}
      {pollSection}
      {trailingChildren}
      {footerSection}
    </>
  );

  const modernContent = (
    <>
      {mediaSlot}
      {headerSection}
      {titleSection}
      {metaSection}
      {bodySection}
      {pollSection}
      {trailingChildren}
      {footerSection}
    </>
  );

  const cardContent = resolvedLayout === "modern" ? modernContent : classicContent;

  // Render with appropriate wrapper based on linkBehavior
  if (isCardLink) {
    return (
      <a
        href={href}
        target={linkTarget}
        rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
        className={className}
        style={{
          ...baseCardStyle,
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
          display: "grid",
          lineHeight: "normal"
        }}
        onMouseEnter={(e) => {
          if (!disableCard) {
            e.currentTarget.style.boxShadow = palette.hoverShadow;
            e.currentTarget.style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!disableCard) {
            e.currentTarget.style.boxShadow = palette.shadow;
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <article className={className} style={{ ...baseCardStyle }}>
      {cardContent}
    </article>
  );
}

// Helper to handle click-to-load state for Iframes
function IframeWrapper({ media, palette, theme }: { media: EmbedMedia; palette: any; theme: "light" | "dark" }) {
  const [active, setActive] = React.useState(!media.poster);
  const align = media.align || "center";
  const frame = media.frame !== false;
  const fullWidth = media.fullWidth !== false;

  // Reset state if URL changes can be handled by keying the component, 
  // but if reused we might need effect. Local check:
  React.useEffect(() => {
    if (media.poster) setActive(false);
  }, [media.url, media.poster]);

  if (!active && media.poster) {
    return (
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${palette.border}`,
          backgroundColor: palette.mediaBg,
          height: media.height,
          aspectRatio: media.height ? undefined : (media.aspectRatio || "16/9"),
          position: "relative",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onClick={(e) => {
          e.preventDefault();
          setActive(true);
        }}
      >
        <img
          src={media.poster}
          alt={media.alt || "Preview"}
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
        />
        {/* Play Button Overlay */}
        <div
          style={{
            zIndex: 10,
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    );
  }

  const alignmentMargin =
    align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : "0 auto 0 0";

  const shouldRound = Boolean(frame || media.rounded);
  return (
    <div style={fullWidth ? { width: "100%" } : undefined}>
      <div
        style={{
          width: fullWidth ? (media.maxWidth ?? "100%") : (media.maxWidth ?? "auto"),
          maxWidth: fullWidth ? (media.maxWidth ?? "100%") : media.maxWidth,
          margin: alignmentMargin
        }}
      >
        <div
          style={{
            borderRadius: shouldRound ? 12 : 0,
            overflow: "hidden",
            border: frame ? `1px solid ${palette.border}` : "none",
            backgroundColor: frame ? palette.mediaBg : (media.background || (media.rounded ? palette.background : "transparent")),
            height: media.height,
            aspectRatio: media.height ? undefined : (media.aspectRatio || "16/9"),
            width: fullWidth ? "100%" : (media.maxWidth ?? "auto"),
            position: "relative"
          }}
        >
          <iframe
            src={media.url}
            title={media.alt || "Embedded content"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: media.iframeRadius
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
