
import React, { useEffect, useState } from 'react';
import { EmbedCard } from './EmbedCard';
import { matchKickUrl, KickData } from '../utils/kick';
import { CardLayout, useCardLayout } from "./CardLayout";

// Kick Brand Color (Green)
const KICK_COLOR = '#53FC18';

export interface KickEmbedProps {
    url: string;
    width?: string | number;
    maxWidth?: string | number;
    height?: string | number;
    theme?: 'light' | 'dark';
    /** Show Title (defaults to true) */
    showTitle?: boolean;
    /** Show Author (defaults to true) */
    showAuthor?: boolean;
    /** Show Date (defaults to true) */
    showDate?: boolean;
    /** Show Body/Description (defaults to true) */
    showBody?: boolean;
    /** Show Media/Content (defaults to true) */
    showMedia?: boolean;
    /** Show Thumbnail (defaults to true) */
    showThumbnail?: boolean;
    /** Show Live Badge (defaults to true) */
    showLiveBadge?: boolean;
    /** Show View Count (defaults to true) */
    showViews?: boolean;
    /** Show Description/Bio (defaults to true) */
    showDescription?: boolean;
    /** Show Category/Game (defaults to true) */
    showCategory?: boolean;
    /** Show Language Badge (defaults to true) */
    showLanguage?: boolean;
    /** Show Mature/18+ Badge (defaults to true) */
    showMature?: boolean;
    /** Show Followers Count (defaults to true) */
    showFollowers?: boolean;
    /** Show Stream Tags (defaults to true) */
    showTags?: boolean;
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
    cardLayout?: CardLayout;
}

type KickApiState = {
    loading: boolean;
    error: string | null;
    title?: string;
    thumbnail?: string;
    streamUrl?: string; // m3u8
    isLive?: boolean;
    author?: string;
    authorImage?: string;
    views?: number;
    description?: string;
    category?: string;
    language?: string;
    isMature?: boolean;
    followers?: number;
    date?: string;
    tags?: string[];
};

export const KickEmbed: React.FC<KickEmbedProps> = ({
    url,
    width = '100%',
    maxWidth = '100%',
    height = 480, // Default height in pixels if no aspectRatio
    theme = 'light',
    showTitle = true,
    showAuthor = true,
    showDate = true,
    showThumbnail = true,
    showLiveBadge = true,
    showViews = true,
    showDescription = true,
    showCategory = true,
    showLanguage = true,
    showMature = true,
    showFollowers = true,
    showTags = true,
    showBody,
    showMedia,
    showBranding = true,
    showCTA = true,
    ctaLabel = "Watch on Kick",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    disableCard = false,
    className,
    style,
    cardLayout
}) => {
    const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
    const [kickData, setKickData] = useState<KickData | null>(null);
    const [kickJson, setKickJson] = useState<any>(null);
    const [apiState, setApiState] = useState<KickApiState>({ loading: true, error: null });

    useEffect(() => {
        if (!url) {
            setApiState(s => ({ ...s, loading: false, error: 'No URL provided' }));
            return;
        }
        const match = matchKickUrl(url);
        if (!match) {
            setApiState(s => ({ ...s, loading: false, error: 'Invalid Kick URL' }));
            return;
        }
        setKickData(match);
        fetchKickData(match);
    }, [url]);

    const fetchKickData = async (data: KickData) => {
        setApiState(s => ({ ...s, loading: true, error: null }));
        try {
            let apiUrl = '';
            // Determine API Endpoint based on matched data
            if (data.videoId) {
                apiUrl = `https://kick.com/api/v1/video/${data.videoId}`;
            } else if (data.clipId) {
                apiUrl = `https://kick.com/api/v2/clips/${data.clipId}`;
            } else if (data.channel) {
                apiUrl = `https://kick.com/api/v1/channels/${data.channel}`;
            }

            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error(`Kick API Error: ${res.status}`);
            const json = await res.json();
            setKickJson(json);

            // Parse response based on type
            let newState: Partial<KickApiState> = {};

            if (data.videoId) {
                // Video Response
                const ls = json.livestream;
                newState.title = ls?.session_title || json.title || `Video ${data.videoId}`;
                newState.thumbnail = ls?.thumbnail || json.thumbnail_url;
                newState.streamUrl = json.source; // "source" field in VOD sample is the m3u8

                newState.author = ls?.channel?.user?.username;
                newState.authorImage = ls?.channel?.user?.profilepic;

                newState.views = json.views;
                newState.followers = ls?.channel?.followersCount;

                newState.date = new Date(json.created_at).toLocaleDateString();
                newState.isLive = false;

                newState.category = ls?.categories?.[0]?.name;
                newState.language = ls?.language;
                newState.isMature = ls?.is_mature;
                newState.description = ls?.channel?.user?.bio; // Map bio to description as requested
                newState.tags = ls?.tags?.map((t: any) => t.name || t) || [];
            } else if (data.clipId) {
                // Clip Response
                const clip = json.clip;
                newState.title = clip.title;
                newState.thumbnail = clip.thumbnail_url;
                newState.streamUrl = clip.clip_url || clip.video_url;
                newState.author = clip.creator?.username;
                newState.authorImage = clip.creator?.profile_picture;
                newState.views = clip.views;
                newState.date = new Date(clip.created_at).toLocaleDateString();
                newState.isLive = false;
                newState.category = clip.category?.name;
                // Clips don't always have language/mature explicitly in same format, try defaults
                newState.isMature = clip.is_mature;
                newState.tags = []; // Clips API doesn't standardly return tags in same way, leave empty or check sample

            } else if (data.channel) {
                // Channel Response
                newState.title = json.livestream?.session_title || `${json.user?.username}'s Channel`;
                newState.thumbnail = json.livestream?.thumbnail?.url || json.banner_image?.url;
                newState.isLive = json.livestream?.is_live || false;
                // Parse views (current viewers if live) or followers
                newState.views = json.livestream?.viewer_count;
                newState.followers = json.followers_count;
                // Set date to Live/Offline status for channels
                newState.date = newState.isLive ? undefined : 'Offline';

                // Parse bio/description
                newState.description = json.livestream?.session_title || json.user?.bio || json.chatroom?.description;

                // Extra Metadata
                newState.category = json.recent_categories?.[0]?.name || json.livestream?.categories?.[0]?.name;
                newState.language = json.livestream?.language;
                newState.isMature = json.livestream?.is_mature; // or json.livestream?.risk_level_id
                newState.tags = json.livestream?.tags?.map((t: any) => t.name || t) || [];

                // For Live streams, the .m3u8 from API is often CORS blocked on localhost
                // So we deliberately do NOT set streamUrl here, which will trigger the Iframe fallback logic below
                // while preserving the rich metadata (Title, Author) we just fetched.
                if (newState.isLive) {
                    // Keep streamUrl undefined to force iframe
                } else if (json.playback_url) {
                    // For offline/vod (if any), try direct
                    newState.streamUrl = json.playback_url;
                }

                newState.author = json.user?.username;
                newState.authorImage = json.user?.profile_pic;
            }

            setApiState({
                loading: false,
                error: null,
                ...newState
            } as KickApiState);

        } catch (e: any) {
            console.error("Kick Fetch Error:", e);
            // Fallback to iframe if API fails
            setApiState(s => ({ ...s, loading: false, error: e.message }));
        }
    };

    // Determine Media Type
    // If we have a direct stream URL (VOD), use 'video'
    // If not (Live or Error), use 'iframe'
    let media: import('./EmbedCard').EmbedMedia | undefined;

    const resolvedShowBody = showBody ?? showDescription;
    const resolvedShowMedia = showMedia ?? showThumbnail;

    if (apiState.streamUrl && resolvedShowMedia) {
        media = {
            type: 'video',
            url: apiState.streamUrl,
            poster: showThumbnail ? apiState.thumbnail : undefined,
            aspectRatio: "16/9",
            autoPlay: false,
        };
    } else {
        // Iframe Fallback (Live or API Error)
        if (kickData) {
            let embedSrc = `https://player.kick.com/${kickData.channel}`;
            const params = new URLSearchParams();
            if (kickData.videoId) params.set('video', kickData.videoId);
            else if (kickData.clipId) params.set('clip', kickData.clipId);

            // Update Autoplay / Force Mute as per user request
            params.set('autoplay', 'true');
            params.set('muted', 'true');

            if (Array.from(params).length > 0) embedSrc += `?${params.toString()}`;

            if (resolvedShowMedia) {
                media = {
                    type: 'iframe',
                    url: embedSrc,
                    poster: showThumbnail ? apiState.thumbnail : undefined,
                    aspectRatio: "16/9",
                };
            }
        }
    }

    return (
        <div className={className} style={{ ...style, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <EmbedCard
                provider={showBranding ? "Kick" : ""}
                title={showTitle ? (apiState.title || kickData?.channel) : undefined}
                author={showAuthor ? apiState.author : undefined}
                body={resolvedShowBody ? apiState.description : undefined}
                timestamp={showDate && !apiState.isLive ? apiState.date : undefined}
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                status={apiState.loading ? 'loading' : 'ok'}
                style={{ '--embed-accent': KICK_COLOR } as React.CSSProperties}
                ctaLabel={ctaLabel}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                showCTA={showCTA}
                href={url}
                media={media}
                disableCard={disableCard}
                showBranding={showBranding}
                badges={[
                    ...(showLiveBadge && apiState.isLive ? [{ label: 'LIVE', tone: 'alert' as const }] : []),
                    ...(showMature && apiState.isMature ? [{ label: '18+', tone: 'alert' as const }] : []),
                    ...(showViews && apiState.views ? [{ label: `${apiState.views.toLocaleString()} ${apiState.isLive ? 'viewers' : 'views'}` }] : []),
                    ...(showFollowers && apiState.followers && !apiState.isLive ? [{ label: `${apiState.followers.toLocaleString()} followers` }] : []),
                    ...(showCategory && apiState.category ? [{ label: apiState.category, tone: 'muted' as const }] : []),
                    ...(showLanguage && apiState.language ? [{ label: apiState.language.toUpperCase(), tone: 'muted' as const }] : [])
                ]}
                footerChildren={showTags && apiState.tags && apiState.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {apiState.tags.map((tag, i) => (
                            <span key={i} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                lineHeight: 1,
                                padding: '5px 10px',
                                borderRadius: 9999,
                                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                                border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                                transition: 'all 0.2s ease',
                                cursor: 'default'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                layout={resolvedLayout}
            />
        </div>
    );
};
