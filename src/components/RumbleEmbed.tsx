import React, { useEffect, useState } from 'react';
import { EmbedCard } from './EmbedCard';
import { isValidRumbleUrl, extractRumbleEmbedIdFromUrl, fetchRumbleVideoDataDirect } from '../utils/rumble';
import { CardLayout, useCardLayout } from "./CardLayout";

interface ExtendedRumbleData {
    title?: string;
    author_name?: string;
    thumbnail_url?: string;
    width?: number;
    height?: number;
    provider_name?: string;
    provider_url?: string;
    embedId?: string;
    fps?: number;
    w?: number;
    h?: number;
    duration?: number;
    pubDate?: string;
    description?: string;
}

export interface RumbleEmbedProps {
    url: string;
    width?: string | number;
    maxWidth?: string | number;
    theme?: 'light' | 'dark';
    showTitle?: boolean;
    showAuthor?: boolean;
    showDate?: boolean;
    showMedia?: boolean;
    showBranding?: boolean;
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
    showDuration?: boolean; // New prop
    showMeta?: boolean; // New prop for FPS/Res
    cardLayout?: CardLayout;
}

export const RumbleEmbed: React.FC<RumbleEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    theme = 'light',
    showTitle = true,
    showAuthor = true,
    showDate = true,
    showMedia = true,
    showBranding = true,
    ctaLabel = "Watch on Rumble",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    disableCard = false,
    className,
    style,
    linkBehavior = "cta",
    linkTarget = "_blank",
    showDuration = false,
    showMeta = false,
    cardLayout
}) => {
    const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
    const [data, setData] = useState<ExtendedRumbleData | null>(null);
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    // Helper to format duration
    const formatDuration = (seconds?: number) => {
        if (!seconds) return undefined;
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!url) {
            setError('No URL provided');
            setLoading(false);
            return;
        }

        if (!isValidRumbleUrl(url)) {
            setError('Invalid Rumble URL');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setEmbedUrl(null);

            try {
                const embedId = extractRumbleEmbedIdFromUrl(url);
                if (!embedId) {
                    throw new Error("Rumble requires an embed URL.");
                }

                let videoData: any = null;
                try {
                    videoData = await fetchRumbleVideoDataDirect(embedId);
                } catch (e) {
                    console.warn("[Rumble] Metadata fetch failed.", e);
                }

                setEmbedUrl(`https://rumble.com/embed/${embedId}/?pub=4`);

                if (!videoData) {
                    throw new Error("Failed to load Rumble metadata.");
                }

                setData({
                    title: videoData.title,
                    author_name: typeof videoData.author === 'object' ? videoData.author.name : videoData.author,
                    thumbnail_url: videoData.i,
                    width: videoData.w,
                    height: videoData.h,
                    provider_name: "Rumble",
                    provider_url: "https://rumble.com",
                    embedId: embedId,
                    // Extra fields
                    fps: videoData.fps,
                    w: videoData.w,
                    h: videoData.h,
                    duration: videoData.duration,
                    pubDate: videoData.pubDate
                });
            } catch (e: any) {
                setError(e.message || "Failed to load Rumble content");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    if (loading) {
        return (
            <EmbedCard
                provider="Rumble"
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
                provider="Rumble"
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

    const mediaObj = embedUrl
        ? {
            type: "iframe" as const,
            url: embedUrl,
            aspectRatio: "16/9",
            poster: undefined
        }
        : undefined;

    // Prepare Footer Meta
    const footerMeta = [];
    if (showDuration && data.duration) {
        footerMeta.push({ label: 'Duration', value: formatDuration(data.duration) || '' });
    }
    if (showMeta && data.fps) {
        footerMeta.push({ label: 'FPS', value: Math.round(data.fps).toString() });
    }
    if (showMeta && data.w && data.h) {
        footerMeta.push({ label: 'Res', value: `${data.w}x${data.h}` });
    }
    if (showDate && data.pubDate) {
        // Override the standard timestamp/date logic if preferred here, 
        // but EmbedCard usually takes 'timestamp' prop. 
        // Let's pass 'timestamp' prop to EmbedCard instead of managing it here if possible.
        // But reusing footerMeta is flexible.
    }

    return (
        <EmbedCard
            provider="Rumble"
            title={showTitle ? data.title : undefined}
            author={showAuthor ? data.author_name : undefined}
            timestamp={showDate && data.pubDate ? new Date(data.pubDate).toLocaleDateString() : undefined}
            media={showMedia ? mediaObj : undefined}
            href={url}
            linkBehavior={linkBehavior}
            linkTarget={linkTarget}
            showBranding={showBranding}
            disableCard={disableCard}
            width={width}
            maxWidth={maxWidth}
            theme={theme}
            className={className}
            style={{
                ...style,
                '--embed-accent': '#85c742',
            } as React.CSSProperties}
            ctaLabel={ctaLabel}
            ctaLabelIcon={ctaLabelIcon}
            ctaLabelIconPosition={ctaLabelIconPosition}
            ctaUsePlatformColor={ctaUsePlatformColor}
            ctaUsePlatformIconColor={ctaUsePlatformIconColor}
            footerMeta={footerMeta.length > 0 ? footerMeta : undefined}
            layout={resolvedLayout}
        />
    );
};
