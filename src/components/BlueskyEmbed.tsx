import React, { useEffect, useState } from "react";
import { EmbedCard } from "./EmbedCard";
import { PlatformIcon } from "./PlatformIcons";
import { EmbedMedia } from "./EmbedCard";
import { CardLayout } from "./CardLayout";

export interface BlueskyEmbedProps {
    url: string;
    width?: number | string;
    height?: number | string;
    linkTarget?: "_blank" | "_self" | "_parent" | "_top";
    linkBehavior?: "card" | "title" | "cta" | "none";
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    showAuthor?: boolean;
    showHandle?: boolean;
    showDate?: boolean;
    showBody?: boolean;
    showMedia?: boolean;
    theme?: "light" | "dark";
    retryDelay?: number;
    maxRetries?: number;
    style?: React.CSSProperties;
    disableCard?: boolean;
    maxWidth?: number | string;
    showBranding?: boolean;
    cardLayout?: CardLayout;
}

type BlueskyThreadResponse = {
    thread:
    | {
        $type: "app.bsky.feed.defs#threadViewPost";
        post: {
            uri: string;
            author: {
                handle: string;
                displayName?: string;
                avatar?: string;
            };
            record: {
                text?: string;
                createdAt?: string;
            };
            embed?: BlueskyEmbedView;
            likeCount?: number;
            repostCount?: number;
            replyCount?: number;
        };
    }
    | { $type: "app.bsky.feed.defs#notFoundPost" }
    | { $type: "app.bsky.feed.defs#blockedPost" };
};

type BlueskyEmbedView =
    | {
        $type: "app.bsky.embed.images#view";
        images: Array<{
            fullsize: string;
            thumb: string;
            alt?: string;
        }>;
    }
    | {
        $type: "app.bsky.embed.video#view";
        playlist: string;
        thumbnail?: string;
    }
    | {
        $type: "app.bsky.embed.external#view";
        external: {
            thumb?: string;
            title?: string;
        };
    }
    | {
        $type: "app.bsky.embed.recordWithMedia#view";
        media?: BlueskyEmbedView;
    }
    | {
        $type: "app.bsky.embed.record#view";
    };

export const BlueskyEmbed: React.FC<BlueskyEmbedProps> = ({
    url,
    width,
    height,
    linkTarget = "_blank",
    linkBehavior,
    showCTA = true,
    ctaLabel = "View on Bluesky",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    showAuthor = true,
    showHandle = true,
    showDate = true,
    showBody = true,
    showMedia = true,
    theme = "light",
    retryDelay = 5000,
    maxRetries = 3,
    style,
    disableCard,
    maxWidth,
    showBranding = true,
    cardLayout
}) => {
    // Extract user and post ID from URL
    const match = url.match(/bsky\.app\/profile\/([^/]+)\/post\/([^/?#]+)/);
    const user = match ? match[1] : null;
    const postId = match ? match[2] : null;

    const [state, setState] = useState<{
        status: "idle" | "loading" | "ok" | "error";
        data?: any;
    }>({ status: "idle" });

    useEffect(() => {
        if (!user || !postId) {
            setState({ status: "error" });
            return;
        }

        setState({ status: "loading" });

        let isMounted = true;
        let attempts = 0;

        const fetchData = async () => {
            try {
                attempts++;
                const postUri = `at://${user}/app.bsky.feed.post/${postId}`;
                const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(postUri)}`;

                const res = await fetch(apiUrl);
                if (!res.ok) throw new Error("Failed to fetch");

                const data: BlueskyThreadResponse = await res.json();

                if (isMounted) {
                    if (data.thread.$type === "app.bsky.feed.defs#threadViewPost") {
                        const post = data.thread.post;

                        const resolveMedia = (embed?: BlueskyEmbedView): EmbedMedia | undefined => {
                            if (!embed) return undefined;
                            if (embed.$type === "app.bsky.embed.images#view" && embed.images.length > 0) {
                                const image = embed.images[0];
                                if (!image) return undefined;
                                return {
                                    type: "image",
                                    url: image.fullsize || image.thumb,
                                    alt: image.alt
                                };
                            }
                            if (embed.$type === "app.bsky.embed.video#view") {
                                return {
                                    type: "video",
                                    url: embed.playlist,
                                    poster: embed.thumbnail
                                };
                            }
                            if (embed.$type === "app.bsky.embed.external#view" && embed.external.thumb) {
                                return {
                                    type: "image",
                                    url: embed.external.thumb,
                                    alt: embed.external.title
                                };
                            }
                            if (embed.$type === "app.bsky.embed.recordWithMedia#view") {
                                return resolveMedia(embed.media);
                            }
                            return undefined;
                        };

                        const recordText = post.record?.text ?? "";
                        const recordCreatedAt = post.record?.createdAt ?? "";
                        const authorName = post.author.displayName || post.author.handle;

                        // Format date
                        let createdAt = recordCreatedAt;
                        try {
                            const date = new Date(recordCreatedAt);
                            createdAt = date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            });
                        } catch { }

                        setState({
                            status: "ok",
                            data: {
                                id: postId,
                                text: recordText,
                                authorName: authorName,
                                authorHandle: post.author.handle,
                                authorAvatar: post.author.avatar,
                                createdAt,
                                likeCount: post.likeCount ?? 0,
                                repostCount: post.repostCount ?? 0,
                                replyCount: post.replyCount ?? 0,
                                permalink: url,
                                media: resolveMedia(post.embed)
                            }
                        });
                    } else {
                        throw new Error("Post not found or blocked");
                    }
                }
            } catch (e) {
                if (isMounted) {
                    console.error("[BlueskyEmbed] Error:", e);
                    if (attempts < maxRetries) {
                        setTimeout(fetchData, retryDelay);
                    } else {
                        setState({ status: "error" });
                    }
                }
            }
        };

        fetchData();

        return () => { isMounted = false; };
    }, [user, postId, maxRetries, retryDelay, url]);

    const platformColor = theme === "dark" ? "#ffffff" : "#0285ff";
    const platformIcon = <PlatformIcon platform="bluesky" size={16} color={platformColor} aria-label="Bluesky" />;

    if (state.status === "error" || !state.data) {
        return (
            <EmbedCard
                provider="Bluesky"
                href={url}
                status={state.status === "idle" ? "loading" : state.status}
                showCTA={showCTA}
                style={style}
                ctaLabel={ctaLabel}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                className="bluesky-embed"
                width={width}
                maxWidth={maxWidth}
                platformIcon={platformIcon}
                showBranding={showBranding}
                theme={theme}
                layout={cardLayout}
            />
        );
    }

    const { data } = state;

    return (
        <EmbedCard
            provider="Bluesky"
            href={url}
            author={showAuthor ? data.authorName : undefined}
            subtitle={showHandle && data.authorHandle ? `@${data.authorHandle}` : undefined}
            body={showBody ? data.text : undefined}
            timestamp={showDate ? data.createdAt : undefined}
            linkTarget={linkTarget}
            linkBehavior={linkBehavior}
            media={showMedia ? data.media : undefined}
            showCTA={showCTA}
            ctaLabel={ctaLabel}
            ctaLabelIcon={ctaLabelIcon}
            ctaLabelIconPosition={ctaLabelIconPosition}
            ctaUsePlatformColor={ctaUsePlatformColor}
            ctaUsePlatformIconColor={ctaUsePlatformIconColor}
            style={{
                ...style,
                '--embed-accent': '#0085ff',
            } as React.CSSProperties}
            disableCard={disableCard}
            className="bluesky-embed"
            width={width}
            maxWidth={maxWidth}
            platformIcon={platformIcon}
            showBranding={showBranding}
            theme={theme}
            layout={cardLayout}
            footerMeta={[
                { label: "Likes", value: data.likeCount?.toLocaleString() },
                { label: "Reposts", value: data.repostCount?.toLocaleString() },
                { label: "Replies", value: data.replyCount?.toLocaleString() }
            ].filter(m => m.value && m.value !== "0")}
        />
    );
};
