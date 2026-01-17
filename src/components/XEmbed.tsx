import React, { useEffect, useState } from "react";
import { EmbedCard } from "./EmbedCard";
import { CardLayout } from "./CardLayout";
import {
    TwitterOembed,
    fetchTwitterOembed,
    normalizeTwitterUrl
} from "../utils/twitter";

export type XEmbedProps = {
    url: string;
    width?: string | number;
    height?: string | number;
    theme?: "light" | "dark";
    showBranding?: boolean;
    showCTA?: boolean;
    disableCard?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    linkBehavior?: "card" | "title" | "cta" | "none";
    linkTarget?: "_blank" | "_self" | "_parent" | "_top";
    /**
     * @deprecated logic for FxTwitter has been removed. This prop is ignored.
     */
    useFxTwitter?: boolean;
    // These props are part of the general EmbedCard strategy but XEmbed ignores them
    // as the native widget handles them. We include them to make the type compatible
    // if passed from a generic parent, but they won't do anything for now.
    showAuthor?: boolean;
    showHandle?: boolean;
    showDate?: boolean;
    showBody?: boolean;
    showMedia?: boolean;
    iframeAlignment?: "center" | "left" | "right";
    constrainWidthByViewport?: boolean;
    maxWidth?: string | number;
    cardLayout?: CardLayout;
};

/**
 * Embed component for X (formerly Twitter) posts.
 * Fetches oEmbed data and renders the native Twitter widget.
 *
 * @param props - Component configuration
 * @returns Embedded X post
 *
 * @example
 * ```tsx
 * <XEmbed url="https://x.com/Interior/status/463440424141459456" theme="dark" />
 * ```
 */
export function XEmbed({
    url,
    width,
    height,
    theme = "light",
    showBranding = true,
    showCTA = true,
    disableCard = false,
    ctaLabel = "Open on X",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    linkBehavior = "cta",
    linkTarget = "_blank",
    iframeAlignment = "center",
    constrainWidthByViewport = false,
    maxWidth = "100%",
    cardLayout
}: XEmbedProps): JSX.Element {
    const [data, setData] = useState<TwitterOembed | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const normalizedUrl = normalizeTwitterUrl(url);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        fetchTwitterOembed(normalizedUrl, { theme })
            .then((oembed) => {
                if (mounted) {
                    setData(oembed);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (mounted) {
                    console.warn("[XEmbed] Failed to fetch oEmbed:", err);
                    setError("Failed to load X post");
                    setLoading(false);
                }
            });

        return () => {
            mounted = false;
        };
    }, [normalizedUrl, theme]);

    // Define alignment styles
    const containerStyle: React.CSSProperties = {
        width: "100%",
        display: "flex",
        justifyContent: iframeAlignment === "left" ? "flex-start" : iframeAlignment === "right" ? "flex-end" : "center",
    };

    // Determine effective props based on constraints
    // If constrained, we want the CARD to shrink-wrap the tweet (plus padding), so we use fit-content.
    // The internal div triggers the 550px max-width on the tweet itself.
    // If not constrained, we respect the passed width/maxWidth (usually 100%).
    const effectiveMaxWidth = constrainWidthByViewport ? "100%" : maxWidth;
    const effectiveWidth = constrainWidthByViewport ? "fit-content" : width;

    // Calculate card styles for alignment when constrained
    // This aligns the CARD itself within the parent container
    const cardStyle: React.CSSProperties = {};
    if (constrainWidthByViewport) {
        if (iframeAlignment === "center") {
            cardStyle.marginLeft = "auto";
            cardStyle.marginRight = "auto";
        } else if (iframeAlignment === "left") {
            cardStyle.marginRight = "auto";
            cardStyle.marginLeft = "0";
        } else if (iframeAlignment === "right") {
            cardStyle.marginLeft = "auto";
            cardStyle.marginRight = "0";
        }
        // Force display block/flex behavior on the card itself if needed, but margin: auto usually works on block
        cardStyle.alignSelf = iframeAlignment === "left" ? "flex-start" : iframeAlignment === "right" ? "flex-end" : "center";
    }

    if (loading) {
        return (
            <EmbedCard
                provider="X (formerly Twitter)"
                title="Loading X Post..."
                status="loading"
                width={effectiveWidth}
                maxWidth={effectiveMaxWidth}
                theme={theme}
                showBranding={showBranding}
                showCTA={showCTA}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                disableCard={disableCard}
                style={cardStyle}
                layout={cardLayout}
            />
        );
    }

    if (error || !data || !data.html) {
        return (
            <EmbedCard
                provider="X (formerly Twitter)"
                title="X Post"
                subtitle={normalizedUrl}
                status="error"
                statusMessage={error || "Unable to load embedded content"}
                width={effectiveWidth}
                maxWidth={effectiveMaxWidth}
                href={normalizedUrl}
                theme={theme}
                showBranding={showBranding}
                showCTA={showCTA}
                ctaLabelIcon={ctaLabelIcon}
                ctaLabelIconPosition={ctaLabelIconPosition}
                ctaUsePlatformColor={ctaUsePlatformColor}
                ctaUsePlatformIconColor={ctaUsePlatformIconColor}
                disableCard={disableCard}
                style={cardStyle}
                layout={cardLayout}
            />
        );
    }

    return (
        <EmbedCard
            provider="X (formerly Twitter)"
            width={effectiveWidth}
            maxWidth={effectiveMaxWidth}
            theme={theme}
            showBranding={showBranding}
            showCTA={showCTA}
            disableCard={disableCard}
            ctaLabel={ctaLabel}
            ctaLabelIcon={ctaLabelIcon}
            ctaLabelIconPosition={ctaLabelIconPosition}
            ctaUsePlatformColor={ctaUsePlatformColor}
            ctaUsePlatformIconColor={ctaUsePlatformIconColor}
            href={normalizedUrl}
            linkBehavior={linkBehavior}
            linkTarget={linkTarget}
            style={cardStyle}
            layout={cardLayout}
            childrenPlacement="media"
        // We don't pass title/author/etc as the native embed has them.
        >
            <style>{`
                .twitter-embed-aligned iframe, 
                .twitter-embed-aligned .twitter-tweet {
                    margin-left: ${iframeAlignment === "left" ? "0 !important" : iframeAlignment === "right" ? "auto !important" : "auto !important"};
                    margin-right: ${iframeAlignment === "left" ? "auto !important" : iframeAlignment === "right" ? "0 !important" : "auto !important"};
                }
            `}</style>
            <div style={containerStyle} className="twitter-embed-aligned">
                <div
                    style={{
                        maxWidth: 550, // Standard max width for tweets
                        width: "100%",
                        // Ensure the inner native widget is aligned correctly within this wrapper
                        display: "flex",
                        flexDirection: "column",
                        alignItems: iframeAlignment === "left" ? "flex-start" : iframeAlignment === "right" ? "flex-end" : "center",
                    }}
                    dangerouslySetInnerHTML={{ __html: data.html }}
                    ref={(node) => {
                        if (node) {
                            // Load the Twitter widgets script if not already present
                            if (!(window as any).twttr) {
                                const script = document.createElement("script");
                                script.src = "https://platform.twitter.com/widgets.js";
                                script.async = true;
                                script.charset = "utf-8";
                                document.body.appendChild(script);
                            } else {
                                // Re-scan for widgets
                                (window as any).twttr.widgets?.load(node);
                            }
                        }
                    }}
                />
            </div>
        </EmbedCard>
    );
}
