import React, { useEffect, useState } from 'react';
import { EmbedCard } from './EmbedCard';
import { PlatformBranding, PLATFORM_COLORS } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import { getCardContainerStyle, getCardHoverStyles, getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { CardLayout, useCardLayout } from "./CardLayout";
import { isValidDailymotionUrl, fetchDailymotionData, DailymotionData, extractVideoId } from '../utils/dailymotion';

export interface DailymotionEmbedProps {
    url: string;
    width?: string | number;
    maxWidth?: string | number;
    theme?: 'light' | 'dark';
    showTitle?: boolean;
    showAuthor?: boolean;
    showBody?: boolean;
    /** Maximum characters for description before truncating with "..." (defaults to 100) */
    bodyMaxLength?: number;
    showMedia?: boolean;
    showBranding?: boolean;
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    disableCard?: boolean;
    className?: string;
    style?: React.CSSProperties;
    linkBehavior?: "card" | "title" | "cta" | "none";
    linkTarget?: "_blank" | "_self" | "_parent" | "_top";
    /** Enable autoplay (defaults to false) */
    autoPlay?: boolean;
    /** Enable click-to-play behavior - show thumbnail with play button until clicked (defaults to true) */
    clickToPlay?: boolean;
    cardLayout?: CardLayout;
}

// Helper to truncate text
const truncateText = (text: string | undefined, maxLength: number): string | undefined => {
    if (!text) return undefined;
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

export const DailymotionEmbed: React.FC<DailymotionEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    theme = 'light',
    showTitle = true,
    showAuthor = true,
    showBody = true,
    bodyMaxLength = 100,
    showMedia = true,
    showBranding = true,
    showCTA = true,
    ctaLabel = "Watch on Dailymotion",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    disableCard = false,
    className,
    style,
    linkBehavior = "cta",
    linkTarget = "_blank",
    autoPlay = false,
    clickToPlay = true,
    cardLayout
}) => {
    const [data, setData] = useState<DailymotionData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasClicked, setHasClicked] = useState(false);
    const cardHover = getCardHoverStyles(theme);
    const ctaHover = getCtaHoverStyles(theme);
    const resolvedLayout = useCardLayout(cardLayout) ?? "modern";

    useEffect(() => {
        if (!url) {
            setError('No URL provided');
            setLoading(false);
            return;
        }

        if (!isValidDailymotionUrl(url)) {
            setError('Invalid Dailymotion URL');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const oembedData = await fetchDailymotionData(url);
                setData(oembedData);
            } catch (e: any) {
                console.error('[DailymotionEmbed] Failed to fetch data:', e);
                setError(e.message || 'Failed to load video');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    // Reset click state when URL changes
    useEffect(() => {
        setHasClicked(false);
    }, [url]);

    const palette = theme === 'dark' ? {
        border: 'rgba(255, 255, 255, 0.1)',
        mediaBg: 'rgba(255, 255, 255, 0.05)',
        card: '#1c1c1e',
        text: '#ffffff',
        muted: '#86868b'
    } : {
        border: 'rgba(0, 0, 0, 0.08)',
        mediaBg: 'rgba(0, 0, 0, 0.03)',
        card: '#ffffff',
        text: '#1d1d1f',
        muted: '#86868b'
    };

    if (loading) {
        return (
            <EmbedCard
                provider="Dailymotion"
                status="loading"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={style}
                layout={resolvedLayout}
            />
        );
    }

    if (error || !data) {
        return (
            <EmbedCard
                provider="Dailymotion"
                status="error"
                statusMessage={error || 'Unknown error'}
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={style}
                href={url}
                layout={resolvedLayout}
            />
        );
    }

    const videoId = extractVideoId(url);
    const aspectRatio = `${data.width}/${data.height}`;

    // Truncate description
    const bodyText = showBody ? truncateText(data.description, bodyMaxLength) : undefined;

    // Determine if we should show the iframe or thumbnail
    const shouldShowIframe = !clickToPlay || hasClicked || autoPlay;

    // Build embed URL with autoplay when coming from click-to-play
    const embedUrl = videoId
        ? `https://www.dailymotion.com/embed/video/${videoId}?autoplay=${(hasClicked || autoPlay) ? '1' : '0'}&mute=${(hasClicked || autoPlay) ? '1' : '0'}&queue-enable=false&ui-highlight=00aaff`
        : undefined;

    // Standard EmbedCard render with iframe (after click or if clickToPlay disabled)
    if (shouldShowIframe && embedUrl) {
        return (
            <EmbedCard
                provider="Dailymotion"
                title={showTitle ? data.title : undefined}
                author={showAuthor ? data.author_name : undefined}
                body={bodyText}
                media={showMedia ? {
                    type: "iframe" as const,
                    url: embedUrl,
                    aspectRatio,
                    // We don't pass poster here to prevent EmbedCard from adding its own click-to-play overlay
                    // We want the iframe to load immediately since we already handled the click
                } : undefined}
                href={url}
                linkBehavior={linkBehavior}
                linkTarget={linkTarget}
                showBranding={showBranding}
                showCTA={showCTA}
                disableCard={disableCard}
                width={width}
                maxWidth={maxWidth}
                theme={theme}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': '#00aaff',
                } as React.CSSProperties}
                ctaLabel={ctaLabel}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                layout={resolvedLayout}
            />
        );
    }

    // Click-to-play mode: Render custom card with thumbnail + play button
    // We can't perfectly overlay on EmbedCard, so we build our own card structure
    // that matches EmbedCard styling
    return (
        <div
            style={{
                width,
                maxWidth,
                ...getCardContainerStyle(theme, disableCard),
                ...style,
                '--embed-accent': '#00aaff',
            } as React.CSSProperties}
            className={className}
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
            {/* Inner padding container */}
            <div style={{ padding: disableCard ? 0 : 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {resolvedLayout === "modern" && showMedia && (
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setHasClicked(true);
                        }}
                        style={{
                            position: 'relative',
                            borderRadius: 12,
                            overflow: 'hidden',
                            border: `1px solid ${palette.border}`,
                            backgroundColor: palette.mediaBg,
                            cursor: 'pointer'
                        }}
                    >
                        <img
                            src={data.thumbnail_url}
                            alt={data.title}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: 'auto'
                            }}
                        />
                        {/* Play button - perfectly centered */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 72,
                                height: 72,
                                borderRadius: '50%',
                                backgroundColor: '#00aaff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                                zIndex: 2
                            }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Header */}
                {showBranding && (
                    <PlatformBranding provider="Dailymotion" theme={theme} />
                )}

                {/* Title */}
                {showTitle && data.title && (
                    <div style={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        lineHeight: 1.4,
                        letterSpacing: '-0.02em',
                        color: palette.text
                    }}>
                        {data.title}
                    </div>
                )}

                {/* Author */}
                {showAuthor && data.author_name && (
                    <div style={{
                        fontSize: '0.875rem',
                        color: palette.muted,
                        fontWeight: 400
                    }}>
                        {data.author_name}
                    </div>
                )}

                {/* Body */}
                {bodyText && (
                    <div style={{
                        fontSize: '0.9375rem',
                        color: palette.text,
                        lineHeight: 1.5,
                        opacity: 0.85
                    }}>
                        {bodyText}
                    </div>
                )}

                {/* Thumbnail with play button */}
                {resolvedLayout === "classic" && showMedia && (
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setHasClicked(true);
                        }}
                        style={{
                            position: 'relative',
                            borderRadius: 12,
                            overflow: 'hidden',
                            border: `1px solid ${palette.border}`,
                            backgroundColor: palette.mediaBg,
                            cursor: 'pointer'
                        }}
                    >
                        <img
                            src={data.thumbnail_url}
                            alt={data.title}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: 'auto'
                            }}
                        />
                        {/* Play button - perfectly centered */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 72,
                                height: 72,
                                borderRadius: '50%',
                                backgroundColor: '#00aaff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                                zIndex: 2
                            }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Footer */}
                {showCTA && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <a
                            href={url}
                            target={linkTarget}
                            rel={linkTarget === '_blank' ? 'noopener noreferrer' : undefined}
                            style={{
                                ...getCtaStyle(theme),
                                gap: 8,
                                backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.dailymotion : getCtaStyle(theme).backgroundColor,
                                borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.dailymotion : getCtaStyle(theme).borderColor,
                                color: ctaUsePlatformColor ? "#ffffff" : getCtaStyle(theme).color
                            }}
                            onMouseEnter={(e) => {
                                if (ctaUsePlatformColor) {
                                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.dailymotion;
                                    e.currentTarget.style.borderColor = PLATFORM_COLORS.dailymotion;
                                    e.currentTarget.style.color = "#ffffff";
                                } else {
                                    e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                                    e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                                }
                                e.currentTarget.style.transform = ctaHover.hover.transform;
                            }}
                            onMouseLeave={(e) => {
                                if (ctaUsePlatformColor) {
                                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.dailymotion;
                                    e.currentTarget.style.borderColor = PLATFORM_COLORS.dailymotion;
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
                                    platform="dailymotion"
                                    size={14}
                                    color={ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.dailymotion : "currentColor"}
                                    aria-hidden="true"
                                    focusable="false"
                                />
                            )}
                            <span>{ctaLabel}</span>
                            {ctaLabelIconPosition === "after" && ctaLabelIcon && (
                                <PlatformIcon
                                    platform="dailymotion"
                                    size={14}
                                    color={ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.dailymotion : "currentColor"}
                                    aria-hidden="true"
                                    focusable="false"
                                />
                            )}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
