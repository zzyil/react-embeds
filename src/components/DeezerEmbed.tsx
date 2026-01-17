import React, { useMemo } from 'react';
import { EmbedCard } from './EmbedCard';
import { CardLayout } from "./CardLayout";
import {
    parseDeezerUrl,
    getDeezerEmbedUrl
} from '../utils/deezer';

const DEEZER_COLOR = '#ef5466'; // Deezer pink/reddish

export interface DeezerEmbedProps {
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

export const DeezerEmbed: React.FC<DeezerEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    height,
    theme = 'light',
    showBranding = true,
    showCTA = true,
    ctaLabel = "Listen on Deezer",
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
    const urlInfo = useMemo(() => parseDeezerUrl(url), [url]);
    const embedUrl = useMemo(() => getDeezerEmbedUrl(url, theme), [url, theme]);

    const defaultHeight = useMemo(() => {
        if (height) return height;
        if (urlInfo.type === 'track') return 150;
        if (urlInfo.type === 'album' || urlInfo.type === 'playlist') return 380;
        return 300;
    }, [height, urlInfo.type]);

    if (!embedUrl) {
        return (
            <EmbedCard
                provider="Deezer"
                status="error"
                statusMessage="Invalid Deezer URL"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': DEEZER_COLOR
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;

    return (
        <EmbedCard
            provider={showBranding ? 'Deezer' : ''}
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
                '--embed-accent': DEEZER_COLOR
            } as React.CSSProperties}
            layout={cardLayout}
        />
    );
};
