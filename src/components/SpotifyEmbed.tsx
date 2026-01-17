import React, { useMemo } from 'react';
import { EmbedCard } from './EmbedCard';
import { CardLayout } from "./CardLayout";
import {
    parseSpotifyUrl,
    getSpotifyEmbedUrl
} from '../utils/spotify';

const SPOTIFY_COLOR = '#1DB954';

export interface SpotifyEmbedProps {
    /** Spotify URL (track, album, playlist, artist, episode, show, user) */
    url: string;
    /** Width of the embed */
    width?: string | number;
    /** Max width of the embed */
    maxWidth?: string | number;
    /** Height of the embed (defaults to 152px for tracks, 352px for others) */
    height?: string | number;
    /** Theme (light/dark) - Spotify iframe handles its own theme usually, but we keep prop for consistency */
    theme?: 'light' | 'dark';
    /** Show Spotify branding */
    showBranding?: boolean;
    /** Show CTA button */
    showCTA?: boolean;
    /** CTA label */
    ctaLabel?: string;
    /** CTA icon */
    ctaLabelIcon?: boolean;
    /** CTA icon position */
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    /** Disable card styling (flush) */
    disableCard?: boolean;
    /** Limit card width to embed width */
    constrainWidthByEmbed?: boolean;
    /** Additional CSS class */
    className?: string;
    /** Additional inline styles */
    style?: React.CSSProperties;
    /** Link behavior for the card wrapper */
    linkBehavior?: 'card' | 'title' | 'cta' | 'none';
    /** Link target */
    linkTarget?: '_blank' | '_self' | '_parent' | '_top';
    cardLayout?: CardLayout;
}

export const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    height,
    theme = 'light',
    showBranding = true,
    showCTA = true,
    ctaLabel = "Open in Spotify",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    disableCard = false,
    constrainWidthByEmbed = false,
    className,
    style,
    linkBehavior = 'cta',
    linkTarget = '_blank',
    cardLayout
}) => {
    const urlInfo = useMemo(() => parseSpotifyUrl(url), [url]);
    const embedUrl = useMemo(() => getSpotifyEmbedUrl(url, theme), [url, theme]);

    // Determine default height based on type
    const defaultHeight = useMemo(() => {
        if (height) return height;
        // Tracks are compact (152px), others are taller (352px or more)
        if (urlInfo.type === 'track') return 152;
        return 352;
    }, [height, urlInfo.type]);

    if (!embedUrl) {
        return (
            <EmbedCard
                provider="Spotify"
                status="error"
                statusMessage="Invalid Spotify URL"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': SPOTIFY_COLOR
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;

    return (
        <EmbedCard
            provider={showBranding ? 'Spotify' : ''}
            // Spotify iframe is self-contained, so we often don't need title/author in the card wrapper
            // unless we fetched metadata separately. For now, we rely on the iframe content.
            media={{
                type: 'iframe',
                url: embedUrl,
                height: defaultHeight,
                aspectRatio: undefined, // We specify fixed height
                frame: false,
                rounded: true,
                iframeRadius: 12,
                background: theme === "dark" ? "#121212" : "#ffffff"
            }}
            width="100%"
            maxWidth={cardMaxWidth}
            disableCard={disableCard}
            theme={theme}
            // We don't show CTA by default if it's just an iframe, as the iframe has interactions
            // But we can keep it if linkBehavior is set
            ctaLabel={ctaLabel}
            ctaLabelIcon={ctaLabelIcon}
            ctaLabelIconPosition={ctaLabelIconPosition}
            ctaUsePlatformColor={ctaUsePlatformColor}
            ctaUsePlatformIconColor={ctaUsePlatformIconColor}
            href={linkBehavior !== 'none' ? url : undefined}
            linkBehavior={linkBehavior}
            linkTarget={linkTarget}
            showBranding={showBranding}
            showCTA={showCTA}
            className={className}
            style={{
                ...style,
                '--embed-accent': SPOTIFY_COLOR
            } as React.CSSProperties}
            layout={cardLayout}
        />
    );
};

export default SpotifyEmbed;
