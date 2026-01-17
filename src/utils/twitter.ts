export type TwitterOembed = {
    url?: string;
    author_name?: string;
    author_url?: string;
    html?: string;
    width?: number;
    height?: number | null;
    type?: string;
    cache_age?: string;
    provider_name?: string;
    provider_url?: string;
    version?: string;
    title?: string;
};

/**
 * Extract tweet ID from a Twitter/X URL.
 * Supports formats:
 * - https://twitter.com/user/status/1234567890
 * - https://x.com/user/status/1234567890
 * - https://mobile.twitter.com/user/status/1234567890
 */
export function extractTweetId(url: string): string | null {
    if (!url) return null;

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        // Validate domain
        if (
            !hostname.includes("twitter.com") &&
            !hostname.includes("x.com")
        ) {
            return null;
        }

        // Match /status/{id} or /statuses/{id}
        const match = urlObj.pathname.match(/\/status(?:es)?\/(\d+)/);
        return match ? match[1] || null : null;
    } catch {
        return null;
    }
}

/**
 * Normalize a Twitter/X URL to a consistent format.
 */
export function normalizeTwitterUrl(url: string): string {
    const tweetId = extractTweetId(url);
    if (!tweetId) return url;

    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split("/");
        const statusIndex = pathParts.findIndex(p => p === "status" || p === "statuses");

        if (statusIndex > 0 && pathParts[statusIndex - 1]) {
            const username = pathParts[statusIndex - 1];
            return `https://x.com/${username}/status/${tweetId}`;
        }
    } catch {
        // Fall through
    }

    return url;
}

export async function fetchTwitterOembed(url: string, params?: {
    maxwidth?: number;
    hide_media?: boolean;
    hide_thread?: boolean;
    omit_script?: boolean;
    align?: "left" | "right" | "center" | "none";
    lang?: string;
    theme?: "light" | "dark";
    dnt?: boolean;
}): Promise<TwitterOembed> {
    const oembedUrl = new URL("https://publish.twitter.com/oembed");
    oembedUrl.searchParams.set("url", url);

    if (params?.maxwidth) {
        oembedUrl.searchParams.set("maxwidth", String(params.maxwidth));
    }
    if (params?.hide_media) {
        oembedUrl.searchParams.set("hide_media", "1");
    }
    if (params?.hide_thread) {
        oembedUrl.searchParams.set("hide_thread", "1");
    }
    if (params?.omit_script) {
        oembedUrl.searchParams.set("omit_script", "1");
    }
    if (params?.align) {
        oembedUrl.searchParams.set("align", params.align);
    }
    if (params?.lang) {
        oembedUrl.searchParams.set("lang", params.lang);
    }
    if (params?.theme) {
        oembedUrl.searchParams.set("theme", params.theme);
    }
    if (params?.dnt) {
        oembedUrl.searchParams.set("dnt", "1");
    }

    const response = await fetch(oembedUrl.toString());
    if (!response.ok) {
        throw new Error(`X oEmbed returned ${response.status}`);
    }
    const data = await response.json();
    return data;
}
