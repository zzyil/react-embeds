import React, { useEffect, useState } from 'react';
import { EmbedCard } from './EmbedCard';
import { matchTwitchUrl, fetchTwitchData, TwitchData } from '../utils/twitch';
import { CardLayout, useCardLayout } from "./CardLayout";

// Twitch Brand Color (Purple)
const TWITCH_COLOR = '#9146FF';

export interface TwitchEmbedProps {
    url: string;
    clientId?: string;
    width?: string | number;
    maxWidth?: string | number;
    height?: string | number;
    theme?: 'light' | 'dark';
    showViews?: boolean;
    showFollowers?: boolean;
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

type TwitchApiState = {
    loading: boolean;
    error: string | null;
    title?: string;
    thumbnail?: string;
    isLive?: boolean;
    author?: string;
    authorImage?: string;
    views?: number;
    description?: string;
    category?: string;
    isMature?: boolean;
    followers?: number;
    date?: string;
    streamUrl?: string; // Direct video source if available (rare for Twitch due to CORS/Auth)
};

export const TwitchEmbed: React.FC<TwitchEmbedProps> = ({
    url,
    clientId,
    width = '100%',
    maxWidth = '100%',
    height = 480,
    theme = 'light',
    showViews = true,
    showFollowers = true,
    showBranding = true,
    showCTA = true,
    ctaLabel = "Watch on Twitch",
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
    const [twitchData, setTwitchData] = useState<TwitchData | null>(null);
    const [apiState, setApiState] = useState<TwitchApiState>({ loading: true, error: null });

    useEffect(() => {
        if (!url) {
            setApiState(s => ({ ...s, loading: false, error: 'No URL provided' }));
            return;
        }
        const match = matchTwitchUrl(url);
        if (!match) {
            setApiState(s => ({ ...s, loading: false, error: 'Invalid Twitch URL' }));
            return;
        }
        setTwitchData(match);
        if (!clientId) {
            setApiState(s => ({ ...s, loading: false, error: null }));
            return;
        }
        fetchData(match);
    }, [url, clientId]);

    const fetchData = async (data: TwitchData) => {
        setApiState(s => ({ ...s, loading: true, error: null }));
        try {
            if (!clientId) {
                setApiState(s => ({ ...s, loading: false, error: null }));
                return;
            }
            const result = await fetchTwitchData(data, clientId);

            let newState: Partial<TwitchApiState> = {};

            if (data.videoId && result.video) {
                const v = result.video;
                newState.title = v.title;
                newState.thumbnail = v.previewThumbnailURL;
                newState.views = v.viewCount;
                newState.author = v.owner?.displayName;
                newState.authorImage = v.owner?.profileImageURL;
                newState.date = new Date(v.publishedAt).toLocaleDateString();
                newState.category = v.game?.name;
                newState.isLive = false;
            } else if (data.clipSlug && result.clip) {
                const c = result.clip;
                newState.title = c.title;
                newState.thumbnail = c.thumbnailURL;
                newState.views = c.viewCount;
                newState.author = c.broadcaster?.displayName;
                newState.authorImage = c.broadcaster?.profileImageURL;
                newState.date = new Date(c.createdAt).toLocaleDateString();
                newState.category = c.game?.name;
                newState.isLive = false;
            } else if (data.channel && result.user) {
                const u = result.user;
                const s = u.stream;

                newState.author = u.displayName;
                newState.authorImage = u.profileImageURL;
                newState.description = u.description;
                newState.followers = u.followers?.totalCount;

                if (s) {
                    newState.isLive = true;
                    newState.title = s.title;
                    newState.views = s.viewersCount;
                    newState.category = s.game?.name;
                    newState.isMature = s.isMature;
                    // Provide a generic live thumbnail if needed, or use null to rely on iframe
                } else {
                    newState.isLive = false;
                    newState.date = 'Offline';
                    newState.title = `${u.displayName}'s Channel`;
                }
            } else {
                throw new Error('Content not found');
            }

            setApiState({
                loading: false,
                error: null,
                ...newState
            } as TwitchApiState);

        } catch (e: any) {
            console.error("Twitch Fetch Error:", e);
            setApiState(s => ({ ...s, loading: false, error: e.message }));
        }
    };

    // Use iframe for Twitch content - direct video playback is not possible due to CORS restrictions
    // No poster is passed so the iframe loads immediately without click-to-play overlay
    let media: import('./EmbedCard').EmbedMedia | undefined;

    if (twitchData) {
        const parent = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        let embedSrc = '';

        if (twitchData.videoId) {
            embedSrc = `https://player.twitch.tv/?video=${twitchData.videoId}&parent=${parent}&autoplay=false`;
        } else if (twitchData.clipSlug) {
            embedSrc = `https://clips.twitch.tv/embed?clip=${twitchData.clipSlug}&parent=${parent}&autoplay=false`;
        } else if (twitchData.channel) {
            embedSrc = `https://player.twitch.tv/?channel=${twitchData.channel}&parent=${parent}&autoplay=false`;
        }

        if (embedSrc) {
            media = {
                type: 'iframe',
                url: embedSrc,
                aspectRatio: "16/9",
                // No poster = iframe loads immediately without click-to-play overlay
            };
        }
    }

    return (
        <div className={className} style={{ ...style, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <EmbedCard
                provider={showBranding ? "Twitch" : ""}
                title={apiState.title || twitchData?.channel}
                author={apiState.author}
                body={apiState.description}
                timestamp={apiState.isLive ? undefined : apiState.date}
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                status={apiState.loading ? 'loading' : 'ok'}
                style={{ '--embed-accent': TWITCH_COLOR } as React.CSSProperties}
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
                    ...(apiState.isLive ? [{ label: 'LIVE', tone: 'alert' as const }] : []),
                    ...(apiState.isMature ? [{ label: '18+', tone: 'alert' as const }] : []),
                    ...(showViews && apiState.views ? [{ label: `${apiState.views.toLocaleString()} ${apiState.isLive ? 'viewers' : 'views'}` }] : []),
                    ...(showFollowers && apiState.followers && !apiState.isLive ? [{ label: `${apiState.followers.toLocaleString()} followers` }] : []),
                    ...(apiState.category ? [{ label: apiState.category, tone: 'muted' as const }] : []),
                ]}
                layout={resolvedLayout}
            />
        </div>
    );
};
