import React, { useMemo } from 'react';
import { EmbedCard } from './EmbedCard';
import { CardLayout } from "./CardLayout";
import {
    parseAppleMusicUrl,
    getAppleMusicEmbedUrl
} from '../utils/appleMusic';

const APPLE_MUSIC_COLOR = '#fa243c';

export interface AppleMusicEmbedProps {
    url: string;
    width?: string | number;
    maxWidth?: string | number;
    height?: string | number;
    theme?: 'light' | 'dark';
    showBranding?: boolean;
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    disableCard?: boolean;
    constrainWidthByEmbed?: boolean;
    className?: string;
    style?: React.CSSProperties;
    linkBehavior?: 'card' | 'title' | 'cta' | 'none';
    linkTarget?: '_blank' | '_self' | '_parent' | '_top';
    cardLayout?: CardLayout;
}

export const AppleMusicEmbed: React.FC<AppleMusicEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    height,
    theme = 'light',
    showBranding = true,
    showCTA = true,
    ctaLabel = "Listen on Apple Music",
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
    const urlInfo = useMemo(() => parseAppleMusicUrl(url), [url]);
    const embedUrl = useMemo(() => getAppleMusicEmbedUrl(url, theme), [url, theme]);

    const defaultHeight = useMemo(() => {
        if (height) return height;
        if (urlInfo.type === 'song') return 150; // Single track vertical
        if (urlInfo.type === 'album') return 450;
        if (urlInfo.type === 'playlist') return 450;
        return 450;
    }, [height, urlInfo.type]);

    if (!embedUrl) {
        return (
            <EmbedCard
                provider="Apple Music"
                status="error"
                statusMessage="Invalid Apple Music URL"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': APPLE_MUSIC_COLOR
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;

    return (
        <EmbedCard
            provider={showBranding ? 'Apple Music' : ''}
            media={{
                type: 'iframe',
                url: embedUrl,
                height: defaultHeight,
            }}
            width="100%"
            maxWidth={cardMaxWidth}
            disableCard={disableCard}
            theme={theme}
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
                '--embed-accent': APPLE_MUSIC_COLOR
            } as React.CSSProperties}
            layout={cardLayout}
        />
    );
};
