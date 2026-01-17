export type TikTokOembed = {
    version: string;
    type: string;
    title: string;
    author_url: string;
    author_name: string;
    width: string;
    height: string;
    html: string;
    thumbnail_width: number;
    thumbnail_height: number;
    thumbnail_url: string;
    provider_url: string;
    provider_name: string;
};

/**
* Fetch TikTok oEmbed data from the official API.
* No authentication required.
*/
export async function fetchTikTokOembed(url: string): Promise<TikTokOembed> {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    const response = await fetch(oembedUrl);

    if (!response.ok) {
        throw new Error(`TikTok oEmbed API returned ${response.status}`);
    }

    return response.json();
}

/**
 * Extract the TikTok video ID from a URL.
 */
export function extractTikTokVideoId(url: string): string | null {
    try {
        const urlObj = new URL(url);
        const path = urlObj.pathname;

        // Pattern: /@user/video/VIDEO_ID or /v/VIDEO_ID
        const match = path.match(/\/video\/(\d+)/) || path.match(/\/v\/(\d+)/);

        if (match) return match[1] ?? null;

        return null;
    } catch {
        return null;
    }
}
