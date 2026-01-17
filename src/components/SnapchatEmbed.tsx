
import React, { useEffect, useRef, useState } from 'react';
import { EmbedCard } from './EmbedCard';
import { PlatformBranding, PLATFORM_COLORS } from "./PlatformBranding";
import { PlatformIcon } from "./PlatformIcons";
import { getCardContainerStyle, getCardHoverStyles, getCtaHoverStyles, getCtaStyle } from "./CardStyles";
import { CardLayout, useCardLayout } from "./CardLayout";
import { getSnapchatEmbedUrl, isValidSnapchatUrl } from '../utils/snapchat';

export interface SnapchatEmbedProps {
    url: string;
    width?: string | number;
    maxWidth?: string | number;
    height?: string | number;
    className?: string;
    style?: React.CSSProperties;
    /** Whether to include script tag (default: true). Set false if loading globally. */
    scriptLoad?: boolean;
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
    theme?: "light" | "dark";
    cardLayout?: CardLayout;
}

export const SnapchatEmbed: React.FC<SnapchatEmbedProps> = ({
    url,
    width = '100%',
    maxWidth,
    height = 650,
    className,
    style,
    scriptLoad = true,
    disableCard = false,
    showCTA = true,
    ctaLabel = "View on Snapchat",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    ctaAlignment = "left",
    theme = "light",
    embedAlignment = "center",
    showBranding = true,
    constrainWidthByEmbed = false,
    cardLayout
}) => {
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardHover = getCardHoverStyles(theme);
    const ctaHover = getCtaHoverStyles(theme);
    const ctaBaseStyle = getCtaStyle(theme);
    const ctaIconColor = ctaUsePlatformColor ? "#000000" : ctaUsePlatformIconColor ? PLATFORM_COLORS.snapchat : "currentColor";
    const resolvedLayout = useCardLayout(cardLayout) ?? "classic";

    useEffect(() => {
        if (!url) {
            setError('No URL provided');
            return;
        }

        if (!isValidSnapchatUrl(url)) {
            setError('Invalid Snapchat URL');
            return;
        }

        if (scriptLoad) {
            const existingScript = document.querySelector('script[src="https://www.snapchat.com/embed.js"]');
            // Check if script already exists to avoid duplication
            if (!existingScript) {
                // Add a small delay to ensure blockquote is in DOM
                setTimeout(() => {
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.snapchat.com/embed.js';
                    document.body.appendChild(script);
                }, 50);
            }
        }
    }, [url, scriptLoad]);


    if (error) {
        return (
            <EmbedCard
                provider="Snapchat"
                status="error"
                statusMessage={error}
                width={width}
                maxWidth={maxWidth}
                className={className}
                style={style}
                disableCard={disableCard}
                showCTA={showCTA}
                ctaLabel={ctaLabel}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                theme={theme}
            />
        );
    }

    const embedUrl = getSnapchatEmbedUrl(url);

    const alignmentStyles = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end'
    };
    const gridAlignment = {
        left: 'start',
        center: 'center',
        right: 'end'
    } as const;

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
                    <PlatformBranding provider="Snapchat" theme={theme} />
                )}
                <div
                    style={{
                        width: width,
                        maxWidth: maxWidth,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: alignmentStyles[embedAlignment],
                        justifySelf: gridAlignment[embedAlignment]
                    }}
                >
                    <blockquote
                        className="snapchat-embed"
                        data-snapchat-embed-url={embedUrl}
                        data-snapchat-embed-width={typeof width === 'number' ? width : undefined}
                        data-snapchat-embed-height={typeof height === 'number' ? height : undefined}
                        style={{
                            background: disableCard ? "transparent" : "#C4C4C4",
                            border: 0,
                            borderRadius: disableCard ? 0 : 40,
                            boxShadow: disableCard ? "none" : "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                            margin: 1,
                            maxWidth: typeof width === 'number' ? width : '100%',
                            minWidth: 326,
                            padding: 0,
                            width: 'calc(100% - 2px)',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            height: typeof height === 'number' ? height : 650
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <a href={embedUrl} style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: 40, width: 40, margin: 16, cursor: 'pointer' }}></a>
                            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}></div>
                        </div>
                        <div style={{ flex: 1 }}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderEndEndRadius: 40, borderEndStartRadius: 40 }}>
                            <a href={embedUrl} style={{ backgroundColor: 'yellow', width: '100%', padding: '10px 20px', border: 'none', borderRadius: 'inherit', cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', textDecoration: 'none', color: 'black' }}>
                                View more on Snapchat
                            </a>
                        </div>
                    </blockquote>
                </div>
                {resolvedLayout === "modern" && showBranding && (
                    <PlatformBranding provider="Snapchat" theme={theme} />
                )}
                {showCTA && (
                    <a
                        href={embedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            ...ctaBaseStyle,
                            gap: 8,
                            justifySelf: ctaAlignment === "center" ? "center" : ctaAlignment === "right" ? "end" : "start",
                            backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.snapchat : ctaBaseStyle.backgroundColor,
                            borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.snapchat : ctaBaseStyle.borderColor,
                            color: ctaUsePlatformColor ? "#000000" : ctaBaseStyle.color
                        }}
                        onMouseEnter={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.snapchat;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.snapchat;
                                e.currentTarget.style.color = "#000000";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.hover.transform;
                        }}
                        onMouseLeave={(e) => {
                            if (ctaUsePlatformColor) {
                                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.snapchat;
                                e.currentTarget.style.borderColor = PLATFORM_COLORS.snapchat;
                                e.currentTarget.style.color = "#000000";
                            } else {
                                e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                                e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                            }
                            e.currentTarget.style.transform = ctaHover.rest.transform;
                        }}
                    >
                        {ctaLabelIconPosition === "before" && ctaLabelIcon && (
                            <PlatformIcon platform="snapchat" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                        <span>{ctaLabel}</span>
                        {ctaLabelIconPosition === "after" && ctaLabelIcon && (
                            <PlatformIcon platform="snapchat" size={14} color={ctaIconColor} aria-hidden="true" focusable="false" />
                        )}
                    </a>
                )}
            </div>
        </div>
    );
};
