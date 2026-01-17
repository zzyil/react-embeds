import React, { useMemo } from 'react';
import { EmbedCard } from './EmbedCard';
import { CardLayout } from "./CardLayout";
import {
    parseSoundCloudUrl,
    getSoundCloudEmbedUrl
} from '../utils/soundcloud';

const SOUNDCLOUD_COLOR = '#ff5500';

export interface SoundCloudEmbedProps {
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
    autoPlay?: boolean;
    cardLayout?: CardLayout;
}

export const SoundCloudEmbed: React.FC<SoundCloudEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    height,
    theme = 'light',
    showBranding = true,
    showCTA = true,
    ctaLabel = "Listen on SoundCloud",
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
    autoPlay = false,
    cardLayout
}) => {
    const urlInfo = useMemo(() => parseSoundCloudUrl(url), [url]);
    const embedUrl = useMemo(
        () => getSoundCloudEmbedUrl(url, { autoPlay }),
        [url, autoPlay]
    );

    const defaultHeight = useMemo(() => {
        if (height) return height;
        if (urlInfo.type === 'playlist') return 450;
        return 166;
    }, [height, urlInfo.type]);

    if (!embedUrl) {
        return (
            <EmbedCard
                provider="SoundCloud"
                status="error"
                statusMessage="Invalid SoundCloud URL"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': SOUNDCLOUD_COLOR
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;

    return (
        <EmbedCard
            provider={showBranding ? 'SoundCloud' : ''}
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
                '--embed-accent': SOUNDCLOUD_COLOR
            } as React.CSSProperties}
            layout={cardLayout}
        />
    );
};

export default SoundCloudEmbed;
