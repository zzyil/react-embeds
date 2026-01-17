import React, { useEffect, useState, useMemo } from 'react';
import { EmbedCard } from './EmbedCard';
import { CardLayout } from "./CardLayout";
import {
    isValidTumblrUrl,
    parseTumblrUrl,
    getTumblrApiUrl,
    parseTumblrJsonp,
    extractPostData,
    formatTumblrDate,
    formatNoteCount,
    TumblrPostData
} from '../utils/tumblr';

export interface TumblrEmbedProps {
    /** Tumblr post URL */
    url: string;
    /** Width of the embed */
    width?: string | number;
    /** Maximum width of the embed */
    maxWidth?: string | number;
    /** Theme (light/dark) */
    theme?: 'light' | 'dark';
    /** Show blog avatar */
    showAvatar?: boolean;
    /** Show post title */
    showTitle?: boolean;
    /** Show post body/content */
    showBody?: boolean;
    /** Show post media (images, video) */
    showMedia?: boolean;
    /** Show blog author name */
    showAuthor?: boolean;
    /** Show post date */
    showDate?: boolean;
    /** Show note count */
    showNotes?: boolean;
    /** Show post tags */
    showTags?: boolean;
    /** Show Tumblr branding */
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

// Tumblr brand color
const TUMBLR_COLOR = '#001935';

/**
 * TumblrEmbed component
 * 
 * Displays Tumblr posts using the public v1 API (no authentication required).
 * Features:
 * - Direct API fetch (no proxy needed - CORS enabled)
 * - Custom EmbedCard rendering
 * - Support for text, photo, quote, video, and link posts
 */
export const TumblrEmbed: React.FC<TumblrEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    theme = 'light',
    showAvatar = true,
    showTitle = true,
    showBody = true,
    showMedia = true,
    showAuthor = true,
    showDate = true,
    showNotes = true,
    showTags = true,
    showBranding = true,
    showCTA = true,
    ctaLabel = "View on Tumblr",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    disableCard = false,
    className,
    style,
    linkBehavior = 'cta',
    linkTarget = '_blank',
    cardLayout
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [postData, setPostData] = useState<TumblrPostData | null>(null);

    // Parse URL
    const urlInfo = useMemo(() => parseTumblrUrl(url), [url]);

    // Fetch post data
    useEffect(() => {
        if (!url) {
            setError('No URL provided');
            setLoading(false);
            return;
        }

        if (!isValidTumblrUrl(url)) {
            setError('Invalid Tumblr URL');
            setLoading(false);
            return;
        }

        if (!urlInfo.isValid) {
            setError('Could not parse Tumblr URL');
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            setLoading(true);
            setError(null);

            try {
                const apiUrl = getTumblrApiUrl(urlInfo.blogName, urlInfo.postId);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/javascript, application/javascript'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch post: ${response.status}`);
                }

                const text = await response.text();
                const jsonData = parseTumblrJsonp(text);
                const data = extractPostData(jsonData, url);

                if (!data) {
                    throw new Error('Post not found');
                }

                setPostData(data);
                setLoading(false);
            } catch (e) {
                console.error('[TumblrEmbed] Error fetching post:', e);
                setError(e instanceof Error ? e.message : 'Failed to load post');
                setLoading(false);
            }
        };

        fetchPost();
    }, [url, urlInfo]);

    // Render loading state
    if (loading) {
        return (
            <EmbedCard
                provider="Tumblr"
                status="loading"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': TUMBLR_COLOR,
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    // Render error state
    if (error || !postData) {
        return (
            <EmbedCard
                provider="Tumblr"
                status="error"
                statusMessage={error || 'Failed to load post'}
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                href={url}
                className={className}
                style={{
                    ...style,
                    '--embed-accent': TUMBLR_COLOR,
                } as React.CSSProperties}
                layout={cardLayout}
            />
        );
    }

    // Extract media (prioritize video, then photos, then images from body)
    let mediaUrl: string | undefined;
    let mediaPoster: string | undefined;
    let mediaType: 'image' | 'video' | undefined;

    // Priority 1: Direct video URL from NPF data
    if (postData.videoUrl) {
        mediaUrl = postData.videoUrl;
        mediaPoster = postData.videoPoster;
        mediaType = 'video';
    }
    // Priority 2: Photos array
    else if (postData.photos && postData.photos.length > 0 && postData.photos[0]) {
        mediaUrl = postData.photos[0].url;
        mediaType = 'image';
    }
    // Priority 3: Try to extract image from body HTML (for GIFs, etc.)
    else if (postData.body) {
        const imgMatch = postData.body.match(/src="([^"]+\.(gif|jpg|jpeg|png|webp)[^"]*)"/i);
        if (imgMatch) {
            mediaUrl = imgMatch[1];
            mediaType = 'image';
        }
    }

    // Build description from body (strip HTML)
    let description = '';
    if (postData.body) {
        // Strip HTML tags but preserve text
        const tempDiv = postData.body
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        description = tempDiv.substring(0, 300);
        if (tempDiv.length > 300) {
            description += '...';
        }
    } else if (postData.quoteText) {
        description = `"${postData.quoteText}"`;
        if (postData.quoteSource) {
            description += ` — ${postData.quoteSource.replace(/<[^>]+>/g, '')}`;
        }
    } else if (postData.linkTitle) {
        description = postData.linkTitle;
    }

    // Build tags as badges
    const tagBadges = showTags && postData.tags.length > 0
        ? postData.tags.slice(0, 5).map(tag => ({
            label: `#${tag}`,
            tone: 'muted' as const
        }))
        : undefined;

    // Build footer meta
    const footerMeta = [];
    if (showNotes && postData.noteCount > 0) {
        footerMeta.push({
            label: 'Notes',
            value: formatNoteCount(postData.noteCount)
        });
    }

    return (
        <EmbedCard
            provider={showBranding ? 'Tumblr' : ''}
            title={showTitle && postData.title ? postData.title : undefined}
            subtitle={showAuthor ? postData.blogTitle : undefined}
            author={showAuthor ? postData.blogName : undefined}
            timestamp={showDate ? formatTumblrDate(postData.date) : undefined}
            body={showBody ? description : undefined}
            media={showMedia && mediaUrl ? { type: mediaType || 'image', url: mediaUrl } : undefined}
            badges={tagBadges}
            footerMeta={footerMeta.length > 0 ? footerMeta : undefined}
            href={linkBehavior !== 'none' ? postData.postUrl : undefined}
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
                '--embed-accent': TUMBLR_COLOR,
            } as React.CSSProperties}
            layout={cardLayout}
        />
    );
};

export default TumblrEmbed;
