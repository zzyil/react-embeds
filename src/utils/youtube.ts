/**
 * YouTube utilities for extracting video IDs and fetching metadata
 * Uses oEmbed for basic metadata (Title, Author, Thumbnail) - Reliable, no API key
 */

/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtube.com/watch, youtu.be, youtube.com/shorts, youtube.com/embed
 */
export function extractYouTubeVideoId(rawUrl: string): string | null {
    try {
        const url = new URL(rawUrl);
        const hostname = url.hostname.replace("www.", "");

        // youtu.be/VIDEO_ID
        if (hostname === "youtu.be") {
            const id = url.pathname.slice(1).split("/")[0];
            return id || null;
        }

        // youtube.com formats
        if (hostname === "youtube.com" || hostname === "m.youtube.com") {
            // /watch?v=VIDEO_ID
            const vParam = url.searchParams.get("v");
            if (vParam) return vParam;

            const pathParts = url.pathname.split("/").filter(Boolean);

            // /shorts/VIDEO_ID
            if (pathParts[0] === "shorts" && pathParts[1]) {
                return pathParts[1];
            }

            // /embed/VIDEO_ID
            if (pathParts[0] === "embed" && pathParts[1]) {
                return pathParts[1];
            }

            // /v/VIDEO_ID (old format)
            if (pathParts[0] === "v" && pathParts[1]) {
                return pathParts[1];
            }

            // /live/VIDEO_ID
            if (pathParts[0] === "live" && pathParts[1]) {
                return pathParts[1];
            }
        }
    } catch {
        return null;
    }
    return null;
}

/**
 * Normalize YouTube URL to canonical watch URL
 */
export function normalizeYouTubeUrl(rawUrl: string): string {
    const videoId = extractYouTubeVideoId(rawUrl);
    if (!videoId) return rawUrl;
    return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * YouTube oEmbed API response type
 */
type YouTubeOEmbedResponse = {
    title: string;
    author_name: string;
    author_url: string;
    type: "video";
    height: number;
    width: number;
    version: string;
    provider_name: string;
    provider_url: string;
    thumbnail_height: number;
    thumbnail_width: number;
    thumbnail_url: string;
    html: string;
};

/**
 * Normalized YouTube video data
 */
export type YouTubeData = {
    id: string;
    title: string;
    authorName: string;
    authorUrl: string;
    thumbnailUrl: string;
    permalink: string;
};

/**
 * Fetch YouTube video metadata using oEmbed
 */
export async function fetchYouTubeData(videoId: string): Promise<YouTubeData> {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

    // Fetch oEmbed
    const response = await fetch(oembedUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch video metadata");
    }

    let title = "";
    let authorName = "";
    let authorUrl = "";
    let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    try {
        const data: YouTubeOEmbedResponse = await response.json();
        title = data.title;
        authorName = data.author_name;
        authorUrl = data.author_url;
        thumbnailUrl = data.thumbnail_url;
    } catch (e) {
        console.error("[YouTubeEmbed] Failed to parse oEmbed:", e);
        throw new Error("Failed to parse video metadata");
    }

    return {
        id: videoId,
        title,
        authorName,
        authorUrl,
        thumbnailUrl,
        permalink: `https://www.youtube.com/watch?v=${videoId}`,
    };
}
