import React, { useMemo } from "react";
import { EmbedCard } from "./EmbedCard";
import { CardLayout, useCardLayout } from "./CardLayout";

const BILIBILI_COLOR = "#00a1d6";

export type BilibiliEmbedProps = {
    url: string;
    width?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    aspectRatio?: string;
    autoplay?: boolean;
    highQuality?: boolean;
    danmaku?: boolean;
    page?: number;
    theme?: "light" | "dark";
    showCTA?: boolean;
    ctaLabel?: string;
    ctaLabelIcon?: boolean;
    ctaLabelIconPosition?: "before" | "after";
    ctaUsePlatformColor?: boolean;
    ctaUsePlatformIconColor?: boolean;
    showBranding?: boolean;
    disableCard?: boolean;
    constrainWidthByEmbed?: boolean;
    className?: string;
    style?: React.CSSProperties;
    linkBehavior?: "card" | "title" | "cta" | "none";
    linkTarget?: "_blank" | "_self" | "_parent" | "_top";
    cardLayout?: CardLayout;
};

type BilibiliIds = {
    bvid?: string;
    aid?: string;
    cid?: string;
    page: number;
};

const parseBilibiliUrl = (rawUrl: string, fallbackPage: number): BilibiliIds | null => {
    try {
        const parsed = new URL(rawUrl);
        const host = parsed.hostname.toLowerCase();
        if (!host.includes("bilibili.com") && !host.includes("b23.tv")) {
            return null;
        }

        const bvidMatch = rawUrl.match(/BV[0-9A-Za-z]+/);
        const aidMatch = rawUrl.match(/av(\d+)/i);

        const bvid = parsed.searchParams.get("bvid") || (bvidMatch ? bvidMatch[0] : undefined);
        const aid = parsed.searchParams.get("aid") || (aidMatch ? aidMatch[1] : undefined);
        const cid = parsed.searchParams.get("cid") || undefined;
        const pageParam = parsed.searchParams.get("p") || parsed.searchParams.get("page");
        const parsedPage = pageParam ? Number(pageParam) : fallbackPage;
        const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : fallbackPage;

        if (!bvid && !aid) return null;

        return { bvid, aid, cid, page };
    } catch {
        return null;
    }
};

const buildEmbedUrl = (ids: BilibiliIds, options: { autoplay: boolean; highQuality: boolean; danmaku: boolean }) => {
    const url = new URL("https://player.bilibili.com/player.html");
    if (ids.bvid) {
        url.searchParams.set("bvid", ids.bvid);
    } else if (ids.aid) {
        url.searchParams.set("aid", ids.aid);
    }
    if (ids.cid) {
        url.searchParams.set("cid", ids.cid);
    }
    url.searchParams.set("page", String(ids.page));
    url.searchParams.set("autoplay", options.autoplay ? "1" : "0");
    url.searchParams.set("high_quality", options.highQuality ? "1" : "0");
    url.searchParams.set("danmaku", options.danmaku ? "1" : "0");
    return url.toString();
};

export const BilibiliEmbed: React.FC<BilibiliEmbedProps> = ({
    url,
    width = "100%",
    maxWidth = "100%",
    height,
    aspectRatio = "16/9",
    autoplay = false,
    highQuality = true,
    danmaku = true,
    page = 1,
    theme = "light",
    showCTA = true,
    ctaLabel = "View on Bilibili",
    ctaLabelIcon = true,
    ctaLabelIconPosition = "before",
    ctaUsePlatformColor = false,
    ctaUsePlatformIconColor = false,
    showBranding = true,
    disableCard = false,
    constrainWidthByEmbed = false,
    className,
    style,
    linkBehavior = "cta",
    linkTarget = "_blank",
    cardLayout
}) => {
    const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
    const ids = useMemo(() => parseBilibiliUrl(url, page), [url, page]);
    const embedUrl = useMemo(() => {
        if (!ids) return null;
        return buildEmbedUrl(ids, { autoplay, highQuality, danmaku });
    }, [ids, autoplay, highQuality, danmaku]);

    if (!embedUrl) {
        return (
            <EmbedCard
                provider="Bilibili"
                status="error"
                statusMessage="Invalid Bilibili URL"
                theme={theme}
                width={width}
                maxWidth={maxWidth}
                disableCard={disableCard}
                className={className}
                style={{
                    ...style,
                    "--embed-accent": BILIBILI_COLOR
                } as React.CSSProperties}
                layout={resolvedLayout}
            />
        );
    }

    const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;

    return (
        <EmbedCard
            provider={showBranding ? "Bilibili" : ""}
            media={{
                type: "iframe",
                url: embedUrl,
                height: height,
                aspectRatio: height ? undefined : aspectRatio
            }}
            width="100%"
            maxWidth={cardMaxWidth}
            disableCard={disableCard}
            theme={theme}
            ctaLabel={ctaLabel}
            ctaLabelIcon={ctaLabelIcon}
            ctaLabelIconPosition={ctaLabelIconPosition}
            ctaUsePlatformColor={ctaUsePlatformColor}
            ctaUsePlatformIconColor={ctaUsePlatformIconColor}
            href={linkBehavior !== "none" ? url : undefined}
            linkBehavior={linkBehavior}
            linkTarget={linkTarget}
            showBranding={showBranding}
            showCTA={showCTA}
            className={className}
            style={{
                ...style,
                "--embed-accent": BILIBILI_COLOR
            } as React.CSSProperties}
            layout={resolvedLayout}
        />
    );
};

export default BilibiliEmbed;
