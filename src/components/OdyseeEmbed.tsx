import React, { useEffect, useState } from 'react';
import { EmbedCard } from './EmbedCard';
import { CardLayout } from "./CardLayout";
import { isValidOdyseeUrl, fetchOdyseeData, OdyseeData, extractEmbedUrl } from '../utils/odysee';

export interface OdyseeEmbedProps {
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

// Odysee brand color
const ODYSEE_COLOR = '#e50914'; // Odysee uses a red/pink color

export const OdyseeEmbed: React.FC<OdyseeEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    theme = 'light',
    showTitle = true,
    showAuthor = true,
    showBody = false, // Odysee oEmbed doesn't provide description
    bodyMaxLength = 100,
    showMedia = true,
    showBranding = true,
    showCTA = true,
    ctaLabel = "Watch on Odysee",
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
    const [data, setData] = useState<OdyseeData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!url) {
            setError('No URL provided');
            setLoading(false);
            return;
        }

        if (!isValidOdyseeUrl(url)) {
            setError('Invalid Odysee URL');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const oembedData = await fetchOdyseeData(url);
                setData(oembedData);
            } catch (e: any) {
                console.error('[OdyseeEmbed] Failed to fetch data:', e);
                setError(e.message || 'Failed to load video');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
                provider="Odysee"
                status="loading"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={style}
                layout={cardLayout}
            />
        );
    }

    if (error || !data) {
        return (
            <EmbedCard
                provider="Odysee"
                status="error"
                statusMessage={error || 'Unknown error'}
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={style}
                href={url}
                layout={cardLayout}
            />
        );
    }

    const aspectRatio = `${data.width}/${data.height}`;

    // Extract embed URL from oEmbed HTML and modify autoplay setting
    let embedUrl = extractEmbedUrl(data.html);
    if (embedUrl) {
        try {
            const urlObj = new URL(embedUrl);
            // If explicit autoPlay prop is true, pass it.
            // Note: clickToPlay logic handled by custom placeholder is removed, 
            // relying on native player poster or iframe behavior.
            if (autoPlay) {
                urlObj.searchParams.set('autoplay', 'true');
            }
            embedUrl = urlObj.toString();
        } catch (e) {
            // Keep original URL
        }
    }

    // Direct video stream logic (prioritized)
    // Odysee MP4 streams (v6) often require strict Origin headers (blocked by CORS when embedding)
    // However, HLS streams (.m3u8) are usually open. Prefer HLS if available.
    const playbackUrl = data.hls_url || data.stream_url;

    if (playbackUrl) {
        return (
            <EmbedCard
                provider="Odysee"
                title={showTitle ? data.title : undefined}
                author={showAuthor ? data.author_name : undefined}
                body={showBody ? truncateText(data.description, bodyMaxLength) : undefined}
                media={showMedia ? {
                    type: "video" as const,
                    url: playbackUrl,
                    poster: data.thumbnail_url,
                    aspectRatio,
                    controls: true, // MediaPlayer handles this
                    autoPlay: autoPlay
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
                    '--embed-accent': ODYSEE_COLOR,
                } as React.CSSProperties}
                ctaLabel={ctaLabel}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                layout={cardLayout}
            />
        );
    }

    // Fallback: EmbedCard render with iframe
    return (
        <EmbedCard
            provider="Odysee"
            title={showTitle ? data.title : undefined}
            author={showAuthor ? data.author_name : undefined}
            body={showBody ? truncateText(data.description, bodyMaxLength) : undefined}
            media={showMedia && embedUrl ? {
                type: "iframe" as const,
                url: embedUrl,
                aspectRatio,
                poster: data.thumbnail_url
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
                '--embed-accent': ODYSEE_COLOR,
            } as React.CSSProperties}
            ctaLabel={ctaLabel}
            ctaLabelIcon={ctaLabelIcon}
            ctaLabelIconPosition={ctaLabelIconPosition}
            ctaUsePlatformColor={ctaUsePlatformColor}
            ctaUsePlatformIconColor={ctaUsePlatformIconColor}
            layout={cardLayout}
        />
    );
};
