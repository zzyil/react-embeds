import React, { useEffect, useRef, useState } from 'react';
import { EmbedCard } from './EmbedCard';
import { PlatformBranding, PLATFORM_COLORS } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import { getCardContainerStyle, getCardHoverStyles, getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { CardLayout, useCardLayout } from "./CardLayout";
import { extractTelegramPostData, isValidTelegramUrl } from '../utils/telegram';

export interface TelegramEmbedProps {
    url: string;
    width?: string | number;
    maxWidth?: string | number;
    /** Accent color for the embed (hex code without #, e.g. "F646A4") */
    accentColor?: string;
    dark?: boolean;
    className?: string;
    style?: React.CSSProperties;
    /** Show comments (data-comments). Default: true via widget but prop can control if we supported it */
    // Note: widget supports data-comments="1" (default) or "0"
    showComments?: boolean;
    disableCard?: boolean;
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    ctaAlignment?: "left" | "center" | "right";
    embedAlignment?: "left" | "center" | "right";
    showBranding?: boolean;
    constrainWidthByEmbed?: boolean;
    cardLayout?: CardLayout;
}

export const TelegramEmbed: React.FC<TelegramEmbedProps> = ({
    url,
    width = 700,
    maxWidth,
    accentColor,
    dark = false,
    className,
    style,
    showComments = true,
    disableCard = false,
    showCTA = true,
    ctaLabel = "View on Telegram",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    ctaAlignment = "left",
    embedAlignment = "center",
    showBranding = true,
    constrainWidthByEmbed = false,
    cardLayout
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);
    const themeValue = dark ? "dark" : "light";
    const cardHover = getCardHoverStyles(themeValue);
    const ctaHover = getCtaHoverStyles(themeValue);
    const ctaBaseStyle = getCtaStyle(themeValue);
    const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.telegram : "currentColor";
    const resolvedLayout = useCardLayout(cardLayout) ?? "classic";

    useEffect(() => {
        if (!url) {
            setError('No URL provided');
            return;
        }

        if (!isValidTelegramUrl(url)) {
            setError('Invalid Telegram URL');
            return;
        }

        const postData = extractTelegramPostData(url);
        if (!postData) {
            setError('Could not extract Telegram post data');
            return;
        }

        setError(null);
        setLoaded(false);

        const container = containerRef.current;
        if (!container) return;

        // Clear previous content
        container.innerHTML = '';

        // Create script tag
        // <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post="telegram/83" data-width="100%" data-color="F646A4"></script>
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-post', postData);
        script.setAttribute('data-width', '100%');

        if (accentColor) {
            // Remove # if present, though user request said "data-color is ... user settable"
            const color = accentColor.replace('#', '');
            script.setAttribute('data-color', color);
        }

        if (dark) {
            script.setAttribute('data-dark', '1');
        }

        if (!showComments) {
            script.setAttribute('data-comments', '0');
        }

        // Telegram widget doesn't strictly have an onload for the content rendering,
        // but the script load itself is a good proxy for "started loading"
        script.onload = () => {
            setLoaded(true);
        };

        script.onerror = () => {
            setError('Failed to load Telegram widget script');
        };

        container.appendChild(script);

        return () => {
            // Cleanup
            if (container) {
                container.innerHTML = '';
            }
        };

    }, [url, accentColor, dark, showComments]);

    // If using EmbedCard wrapper
    if (error) {
        return (
            <EmbedCard
                provider="Telegram"
                status="error"
                statusMessage={error}
                width={width}
                maxWidth={maxWidth}
                className={className}
                style={style}
                disableCard={disableCard}
                layout={cardLayout}
            />
        );
    }

    // We render the container. 
    // Telegram widget usually renders an iframe inside the target script location.

    const alignmentStyles = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end'
    };

    return (
        <div
            className={className}
            style={{
                width: "100%",
                maxWidth: constrainWidthByEmbed ? width : maxWidth || "100%",
                display: "grid",
                ...style
            }}
        >
            <div
                style={{
                    ...getCardContainerStyle(themeValue, disableCard)
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
                    <PlatformBranding provider="Telegram" theme={dark ? "dark" : "light"} />
                )}
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: alignmentStyles[embedAlignment]
                    }}
                >
                    <div
                        ref={containerRef}
                        style={{
                            width,
                            maxWidth: maxWidth || "100%",
                            display: "flex",
                            justifyContent: "center",
                            boxSizing: "border-box"
                        }}
                    />
                </div>
                {resolvedLayout === "modern" && showBranding && (
                    <PlatformBranding provider="Telegram" theme={dark ? "dark" : "light"} />
                )}
                {showCTA && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            ...ctaBaseStyle,
                            gap: 8,
                            justifySelf: ctaAlignment === "center" ? "center" : ctaAlignment === "right" ? "end" : "start",
                            backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.telegram : ctaBaseStyle.backgroundColor,
                            borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.telegram : ctaBaseStyle.borderColor,
                            color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                        }}
                        onMouseEnter={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.telegram;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.telegram;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.hover.transform;
                        }}
                        onMouseLeave={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.telegram;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.telegram;
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.rest.transform;
                        }}
                    >
                        {ctaLabelIconPosition === "before" && ctaLabelIcon && (
                            <PlatformIcon platform="telegram" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                        <span>{ctaLabel}</span>
                        {ctaLabelIconPosition === "after" && ctaLabelIcon && (
                            <PlatformIcon platform="telegram" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                    </a>
                )}
            </div>
        </div>
    );
};
