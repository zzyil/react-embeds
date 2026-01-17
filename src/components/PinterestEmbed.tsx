import React, { useState, useEffect, useMemo } from 'react';
import { EmbedCard } from './EmbedCard';
import { CardLayout } from "./CardLayout";
import {
    PinterestPinData,
    parsePinterestUrl,
    isValidPinterestUrl,
    fetchPinterestData,
    formatCount,
    getBestImage
} from '../utils/pinterest';

const PINTEREST_COLOR = '#E60023';

export interface PinterestEmbedProps {
    /** Pinterest pin URL */
    url: string;
    /** Width of the embed */
    width?: string | number;
    /** Maximum width of the embed */
    maxWidth?: string | number;
    /** Theme (light/dark) */
    theme?: 'light' | 'dark';
    /** Show pin description/caption */
    showDescription?: boolean;
    /** Show pin media */
    showMedia?: boolean;
    /** Show pinner/author info */
    showAuthor?: boolean;
    /** Show standard stats (saves, comments) */
    showStats?: boolean;
    /** Show save count in stats */
    showSaves?: boolean;
    /** Show Pinterest branding */
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
    /** Limit the image width within the card */
    constrainImageWidth?: boolean;
    /** Align the image within the card */
    imageAlignment?: "center" | "left" | "right";
    /** Max width for the image when constrainImageWidth is enabled */
    imageMaxWidth?: string | number;
    /** Disable card styling */
    disableCard?: boolean;
    /** Additional CSS class */
    className?: string;
    /** Additional inline styles */
    style?: React.CSSProperties;
    /** Link behavior */
    linkBehavior?: 'card' | 'title' | 'cta' | 'none';
    /** Link target */
    linkTarget?: '_blank' | '_self' | '_parent' | '_top';
    cardLayout?: CardLayout;
}

export const PinterestEmbed: React.FC<PinterestEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = 450, // Pinterest cards are usually vertical and narrower
    theme = 'light',
    showDescription = true,
    showMedia = true,
    showAuthor = true,
    showStats = true,
    showSaves = true,
    showBranding = true,
    showCTA = true,
    ctaLabel = "View on Pinterest",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    constrainImageWidth = false,
    imageAlignment = "center",
    imageMaxWidth,
    disableCard = false,
    className,
    style,
    linkBehavior = 'cta',
    linkTarget = '_blank',
    cardLayout
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pinData, setPinData] = useState<PinterestPinData | null>(null);

    // Parse URL
    const urlInfo = useMemo(() => parsePinterestUrl(url), [url]);

    // Fetch pin data
    useEffect(() => {
        if (!url) {
            setError('No URL provided');
            setLoading(false);
            return;
        }

        if (!isValidPinterestUrl(url)) {
            setError('Invalid Pinterest URL');
            setLoading(false);
            return;
        }

        if (!urlInfo.isValid) {
            setError('Could not parse Pinterest URL');
            setLoading(false);
            return;
        }

        const fetchPin = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchPinterestData(urlInfo.pinId);
                setPinData(data);
                setLoading(false);
            } catch (e) {
                console.error('[PinterestEmbed] Error fetching pin:', e);
                setError(e instanceof Error ? e.message : 'Failed to load pin');
                setLoading(false);
            }
        };

        fetchPin();
    }, [url, urlInfo]);

    // Render loading state
    if (loading) {
        return (
            <EmbedCard
                provider="Pinterest"
                status="loading"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                showCTA={showCTA}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': PINTEREST_COLOR,
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    // Render error state
    if (error || !pinData) {
        return (
            <EmbedCard
                provider="Pinterest"
                status="error"
                statusMessage={error || 'Failed to load pin'}
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                href={url}
                className={className}
                showCTA={showCTA}
                style={{
                    ...style,
                    '--embed-accent': PINTEREST_COLOR,
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    // Get best image
    const bestImage = getBestImage(pinData.images);

    // Footer meta stats
    const footerMeta = [];
    if (showStats) {
        if (showSaves && pinData.stats.saves > 0) {
            footerMeta.push({
                label: 'Saves',
                value: formatCount(pinData.stats.saves)
            });
        }
        if (pinData.stats.comments > 0) {
            footerMeta.push({
                label: 'Comments',
                value: formatCount(pinData.stats.comments)
            });
        }
    }

    // Build badges
    const badges = [];
    if (pinData.isVideo) {
        badges.push({ label: 'Video', tone: 'accent' as const });
    }

    // Calculate generic aspect ratio if available from width/height
    // EmbedCard doesn't strictly enforce it for images but good to have context if needed
    // We won't pass it explicitly as 'aspectRatio' prop unless media type is video/iframe
    // but standard image cards flow naturally.

    return (
        <EmbedCard
            provider={showBranding ? 'Pinterest' : ''}
            title={showDescription && pinData.title ? pinData.title : undefined}
            subtitle={showAuthor ? pinData.pinner.fullName : undefined}
            author={showAuthor ? pinData.pinner.username : undefined}
            // Pinterest doesn't always give precise dates in public Pidgets API easily
            body={showDescription ? (pinData.description || pinData.text) : undefined}
            media={showMedia && bestImage ? {
                type: 'image',
                url: bestImage.url,
                maxWidth: constrainImageWidth ? (imageMaxWidth ?? maxWidth) : undefined,
                align: imageAlignment,
                // Allow clicking image to open pin if user wants
            } : undefined}
            badges={badges.length > 0 ? badges : undefined}
            footerMeta={footerMeta.length > 0 ? footerMeta : undefined}
            href={linkBehavior !== 'none' ? url : undefined}
            ctaLabel={ctaLabel}
            ctaLabelIcon={ctaLabelIcon}
            ctaLabelIconPosition={ctaLabelIconPosition}
            ctaUsePlatformColor={ctaUsePlatformColor}
            ctaUsePlatformIconColor={ctaUsePlatformIconColor}
            linkBehavior={linkBehavior}
            linkTarget={linkTarget}
            showBranding={showBranding}
            showCTA={showCTA}
            disableCard={disableCard}
            width={width}
            maxWidth={maxWidth}
            theme={theme}
            status="ok"
            className={className}
            style={{
                ...style,
                '--embed-accent': PINTEREST_COLOR,
            } as React.CSSProperties}
            layout={cardLayout}
        />
    );
};

export default PinterestEmbed;
