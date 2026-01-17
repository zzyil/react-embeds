import React, { useEffect, useState } from "react";
import { EmbedCard } from "./EmbedCard";
import { CardLayout, useCardLayout } from "./CardLayout";
import { fetchTikTokOembed, TikTokOembed, extractTikTokVideoId } from "../utils/tiktok";


export type TikTokEmbedProps = {
    url: string;
    width?: string | number;
    height?: string | number;
    theme?: "light" | "dark";
    showBranding?: boolean;
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    disableCard?: boolean;
    showAuthor?: boolean;
    showTitle?: boolean;

    // Player Configuration

    // Iframe Player Options
    controls?: boolean;
    progressBar?: boolean;
    playButton?: boolean;
    volumeControl?: boolean;
    fullscreenButton?: boolean;
    timestamp?: boolean;
    loop?: boolean;
    autoPlay?: boolean;
    musicInfo?: boolean;
    description?: boolean;
    rel?: boolean;
    nativeContextMenu?: boolean;
    closedCaption?: boolean;
    cardLayout?: CardLayout;
};

/**
 * Embed component for TikTok videos.
 * Uses the TikTok iframe player API with configurable player options.
 *
 * @param props - Component configuration including player options
 * @returns Embedded TikTok video player
 *
 * @example
 * ```tsx
 * <TikTokEmbed url="https://www.tiktok.com/@user/video/123" theme="dark" />
 * ```
 */
export function TikTokEmbed({
    url,
    width,
    height,
    theme = "light",
    showBranding = true,
    showCTA = true,
    ctaLabel = "View on TikTok",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    disableCard = false,
    showAuthor = true,
    showTitle = true,

    // Defaults based on documentation
    controls = true,
    progressBar = true,
    playButton = true,
    volumeControl = true,
    fullscreenButton = true,
    timestamp = true,
    loop = false,
    autoPlay = false,
    musicInfo = false,
    description = false,
    rel = true,
    nativeContextMenu = true,
    closedCaption = true,
    cardLayout
}: TikTokEmbedProps): JSX.Element {
    const [data, setData] = useState<TikTokOembed | null>(null);
    const [loading, setLoading] = useState(true);
    const resolvedLayout = useCardLayout(cardLayout) ?? "modern";

    // Extract ID for iframe player
    const videoId = React.useMemo(() => {
        return extractTikTokVideoId(url);
    }, [url]);

    useEffect(() => {
        // If we have a videoId, we can render the iframe immediately.
        // We still fetch oEmbed for metadata (title/author), but it's not strictly blocking for the player.
        if (videoId) {
            setLoading(false);
        } else {
            // If no videoId, we might be loading or have an invalid URL
            setLoading(false);
        }

        let mounted = true;
        // Optional: Fetch oEmbed for metadata only
        fetchTikTokOembed(url)
            .then((oembed) => {
                if (mounted) {
                    setData(oembed);
                }
            })
            .catch((err) => {
                if (mounted) {
                    console.warn("[TikTokEmbed] Failed to fetch oEmbed metadata (non-critical):", err);
                }
            });

        return () => {
            mounted = false;
        };
    }, [url, videoId]);

    // Render Iframe Player
    if (videoId) {
        const queryParams = new URLSearchParams({
            music_info: musicInfo ? "1" : "0",
            description: description ? "1" : "0",
            controls: controls ? "1" : "0",
            progress_bar: progressBar ? "1" : "0",
            play_button: playButton ? "1" : "0",
            volume_control: volumeControl ? "1" : "0",
            fullscreen_button: fullscreenButton ? "1" : "0",
            timestamp: timestamp ? "1" : "0",
            loop: loop ? "1" : "0",
            autoplay: autoPlay ? "1" : "0",
            rel: rel ? "1" : "0",
            native_context_menu: nativeContextMenu ? "1" : "0",
            closed_caption: closedCaption ? "1" : "0"
        });

        const iframeSrc = `https://www.tiktok.com/player/v1/${videoId}?${queryParams.toString()}`;

        return (
            <EmbedCard
                provider="TikTok"
                title={showTitle ? (data?.title || "TikTok Video") : undefined}
                author={showAuthor ? (data?.author_name || "TikTok User") : undefined}
                href={url}
                width={width}
                theme={theme}
                ctaLabel={ctaLabel}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                showBranding={showBranding}
                showCTA={showCTA}
                disableCard={disableCard}
                maxWidth={width || "100%"}
                layout={resolvedLayout}
                childrenPlacement="media"
            >
                <div
                    className="tiktok-iframe-container"
                    style={{
                        position: "relative",
                        width: "100%"
                    }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .tiktok-iframe-container {
                            padding-top: 177.77%; /* Default mobile vertical (9:16) */
                        }
                        @media (min-width: 768px) {
                            .tiktok-iframe-container {
                                padding-top: 56.25%; /* Desktop horizontal (16:9) */
                            }
                        }
                    `}} />
                    <iframe
                        src={iframeSrc}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                            borderRadius: "8px"
                        }}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        title="TikTok Player"
                    />
                </div>
            </EmbedCard>
        );
    }

    if (loading) {
        return (
            <EmbedCard
                provider="TikTok"
                title="Loading TikTok..."
                status="loading"
                width={width}
                theme={theme}
                disableCard={disableCard}
                showBranding={showBranding}
                layout={resolvedLayout}
            />
        );
    }

    return (
        <EmbedCard
            provider="TikTok"
            title="TikTok Video"
            status="error"
            statusMessage="Unable to load content (Invalid URL)"
            width={width}
            href={url}
            theme={theme}
            disableCard={disableCard}
            showBranding={showBranding}
            layout={resolvedLayout}
        />
    );
}
