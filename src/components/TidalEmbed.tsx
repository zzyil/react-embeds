import React, { useMemo } from 'react';
import { EmbedCard } from './EmbedCard';
import { CardLayout } from "./CardLayout";
import {
    parseTidalUrl,
    getTidalEmbedUrl
} from '../utils/tidal';

const TIDAL_COLOR = '#000000'; // Tidal is mostly black/white

export interface TidalEmbedProps {
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

export const TidalEmbed: React.FC<TidalEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    height,
    theme = 'light',
    showBranding = true,
    showCTA = true,
    ctaLabel = "Listen on Tidal",
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
    const urlInfo = useMemo(() => parseTidalUrl(url), [url]);
    const embedUrl = useMemo(() => getTidalEmbedUrl(url), [url]);

    const defaultHeight = useMemo(() => {
        if (height) return height;
        if (urlInfo.type === 'track') return 152;
        if (urlInfo.type === 'album' || urlInfo.type === 'playlist') return 352;
        return 300;
    }, [height, urlInfo.type]);

    const mediaAspectRatio = urlInfo.type === 'video' ? '16/9' : undefined;

    if (!embedUrl) {
        return (
            <EmbedCard
                provider="Tidal"
                status="error"
                statusMessage={urlInfo.type === 'artist' ? "Tidal artist embeds are not supported yet" : "Invalid Tidal URL"}
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': TIDAL_COLOR
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;

    return (
        <EmbedCard
            provider={showBranding ? 'Tidal' : ''}
            media={{
                type: 'iframe',
                url: embedUrl,
                height: urlInfo.type === 'video' ? undefined : defaultHeight,
                aspectRatio: mediaAspectRatio
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
                '--embed-accent': TIDAL_COLOR
            } as React.CSSProperties}
            layout={cardLayout}
        />
    );
};
