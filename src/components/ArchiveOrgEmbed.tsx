
import React, { useEffect, useState } from 'react';
import { EmbedCard } from './EmbedCard';
import { matchArchiveUrl, fetchArchiveData, ArchiveData } from '../utils/archive';
import { CardLayout, useCardLayout } from "./CardLayout";

export interface ArchiveOrgEmbedProps {
    url: string;
    width?: string | number;
    maxWidth?: string | number;
    theme?: 'light' | 'dark';
    showTitle?: boolean;
    showAuthor?: boolean;
    showBody?: boolean;
    showDate?: boolean;
    showViews?: boolean;
    showSize?: boolean;
    showReviews?: boolean;

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
    cardLayout?: CardLayout;
}

// Helper to truncate text
const truncateText = (text: string | undefined, maxLength: number): string | undefined => {
    if (!text) return undefined;
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

// Archive.org brand color (Charcoal/Black)
const ARCHIVE_COLOR = '#333333';

// Helper to format number
const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

export const ArchiveOrgEmbed: React.FC<ArchiveOrgEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    theme = 'light',
    showTitle = true,
    showAuthor = true,
    showBody = false,
    showDate = true,
    showViews = true,
    showSize = true,
    showReviews = true,
    bodyMaxLength = 100,
    showMedia = true,
    showBranding = true,
    showCTA = true,
    ctaLabel = "View on Archive.org",
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
    cardLayout
}) => {
    const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
    const [data, setData] = useState<ArchiveData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) {
            setError('No URL provided');
            setLoading(false);
            return;
        }

        const id = matchArchiveUrl(url);
        if (!id) {
            setError('Invalid Archive.org URL');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const archiveData = await fetchArchiveData(id);
                if (archiveData) {
                    setData(archiveData);
                } else {
                    setError('Failed to load metadata');
                }
            } catch (e: any) {
                console.error('[ArchiveOrgEmbed] Failed to fetch data:', e);
                setError(e.message || 'Failed to load item');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    if (loading) {
        return (
            <EmbedCard
                provider="Archive.org"
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
                provider="Archive.org"
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

    const formattedDate = (showDate && data.uploadDate)
        ? new Date(data.uploadDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
        : undefined;

    const footerMeta = [];
    if (showViews && data.views !== undefined) footerMeta.push({ label: "Views", value: formatNumber(data.views) });
    if (showSize && data.size) footerMeta.push({ label: "Size", value: data.size });
    if (showReviews && data.reviewCount !== undefined) {
        footerMeta.push({ label: "Reviews", value: data.reviewCount.toString() });
        if (data.rating) footerMeta.push({ label: "Rating", value: data.rating.toFixed(1) + '★' });
    }

    return (
        <EmbedCard
            provider="Archive.org"
            title={showTitle ? data.title : undefined}
            author={showAuthor ? data.creator : undefined}
            timestamp={formattedDate}
            body={showBody ? truncateText(data.description, bodyMaxLength) : undefined}
            media={showMedia && data.streamUrl ? {
                type: "video", // MediaPlayer handles both audio and video
                url: data.streamUrl,
                poster: data.posterUrl,
                aspectRatio: data.mediaType === 'audio' ? undefined : "16/9",
                controls: true,
                autoPlay: autoPlay
            } : undefined}
            footerMeta={footerMeta.length > 0 ? footerMeta : undefined}
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
                '--embed-accent': ARCHIVE_COLOR,
            } as React.CSSProperties}
            ctaLabel={ctaLabel}
            ctaLabelIcon={ctaLabelIcon}
            ctaLabelIconPosition={ctaLabelIconPosition}
            ctaUsePlatformColor={ctaUsePlatformColor}
            ctaUsePlatformIconColor={ctaUsePlatformIconColor}
            showCTA={showCTA}
            layout={resolvedLayout}
        />
    );
};
