import React, { useMemo } from 'react';
import { EmbedCard } from './EmbedCard';
import { CardLayout } from "./CardLayout";
import {
    parseApplePodcastsUrl,
    getApplePodcastsEmbedUrl
} from '../utils/applePodcasts';

const APPLE_PODCASTS_COLOR = '#a24bdc';

export interface ApplePodcastsEmbedProps {
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

export const ApplePodcastsEmbed: React.FC<ApplePodcastsEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    height,
    theme = 'light',
    showBranding = true,
    showCTA = true,
    ctaLabel = "Listen on Apple Podcasts",
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
    const urlInfo = useMemo(() => parseApplePodcastsUrl(url), [url]);
    const embedUrl = useMemo(() => getApplePodcastsEmbedUrl(url, theme), [url, theme]);

    const defaultHeight = useMemo(() => {
        if (height) return height;
        if (urlInfo.type === 'episode') return 175;
        return 450;
    }, [height, urlInfo.type]);

    if (!embedUrl) {
        return (
            <EmbedCard
                provider="Apple Podcasts"
                status="error"
                statusMessage="Invalid Apple Podcasts URL"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': APPLE_PODCASTS_COLOR
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;

    return (
        <EmbedCard
            provider={showBranding ? 'Apple Podcasts' : ''}
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
                '--embed-accent': APPLE_PODCASTS_COLOR
            } as React.CSSProperties}
            layout={cardLayout}
        />
    );
};

export default ApplePodcastsEmbed;
