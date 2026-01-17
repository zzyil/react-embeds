import { fetchJsonp } from './jsonp';

export interface DailymotionData {
    type: string;
    version: string;
    provider_name: string;
    provider_url: string;
    title: string;
    description?: string;
    author_name: string;
    author_url: string;
    width: number;
    height: number;
    html: string;
    thumbnail_url: string;
    thumbnail_width: number;
    thumbnail_height: number;
}

/**
 * Validates if a URL is a valid Dailymotion URL
 */
export function isValidDailymotionUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('dailymotion.com') || urlObj.hostname.includes('dai.ly');
    } catch {
        return false;
    }
}

/**
 * Extracts video ID from a Dailymotion URL
 * Supports formats:
 * - https://www.dailymotion.com/video/x7tgad0
 * - https://dai.ly/x7tgad0
 */
export function extractVideoId(url: string): string | undefined {
    if (!url) return undefined;
    try {
        const urlObj = new URL(url);

        // Format: /video/x7tgad0
        const videoMatch = urlObj.pathname.match(/\/video\/([a-zA-Z0-9]+)/);
        if (videoMatch) return videoMatch[1];

        // Format: dai.ly/x7tgad0
        if (urlObj.hostname.includes('dai.ly')) {
            const shortMatch = urlObj.pathname.match(/^\/([a-zA-Z0-9]+)/);
            if (shortMatch) return shortMatch[1];
        }

        return undefined;
    } catch {
        return undefined;
    }
}

/**
 * Fetches Dailymotion oEmbed data using hybrid strategy
 * Tries direct fetch first, falls back to CORS proxy if blocked
 */
/**
 * Fetches Dailymotion data via JSONP (Client-side, no proxy)
 */
async function fetchDailymotionJsonp(videoId: string): Promise<DailymotionData> {
    const fields = [
        'id',
        'title',
        'description',
        'owner.screenname',
        'thumbnail_url',
        'width',
        'height',
        'duration'
    ].join(',');

    // Using Public API which supports JSONP
    const apiUrl = `https://api.dailymotion.com/video/${videoId}?fields=${fields}`;

    // interface for the raw API response
    // Dailymotion Public API returns fields with dot notation as keys when requested specifically?
    // Based on test logs: keys were "id, title, owner.screenname, thumbnail_url, description"
    interface ApiResponse {
        id: string;
        title: string;
        description: string;
        "owner.screenname": string;
        thumbnail_url: string;
        width?: number; // might be null
        height?: number;
        duration?: number;
    }

    try {
        const data = await fetchJsonp<ApiResponse>(apiUrl);

        const ownerName = data["owner.screenname"] || "Dailymotion User";
        const width = data.width || 480;
        const height = data.height || 270;

        return {
            type: 'video',
            version: '1.0',
            provider_name: 'Dailymotion',
            provider_url: 'https://www.dailymotion.com',
            title: data.title,
            description: data.description,
            author_name: ownerName,
            author_url: `https://www.dailymotion.com/${ownerName}`,
            width: width,
            height: height,
            html: `<iframe frameborder="0" width="${width}" height="${height}" src="https://www.dailymotion.com/embed/video/${data.id}" allowfullscreen></iframe>`,
            thumbnail_url: data.thumbnail_url,
            thumbnail_width: width, // Approximate
            thumbnail_height: height,
        };
    } catch (e: any) {
        throw new Error(`Dailymotion JSONP fetch failed: ${e.message}`);
    }
}

/**
 * Fetches Dailymotion oEmbed data using hybrid strategy
 * Tries direct fetch first, falls back to CORS proxy if blocked
 */
export async function fetchDailymotionData(url: string, useProxy = true): Promise<DailymotionData> {
    // If proxy is explicitly disabled (useProxy = false), we use the JSONP strategy
    // which communicates directly with Dailymotion API from the client.
    const oembedUrl = `https://www.dailymotion.com/services/oembed?url=${encodeURIComponent(url)}`;

    if (!useProxy) {
        const videoId = extractVideoId(url);
        if (videoId) {
            try {
                const data = await fetchDailymotionJsonp(videoId);
                return data;
            } catch (e) {
                console.warn('[Dailymotion] JSONP fetch failed', e);
                // Fall through to standard oEmbed if JSONP fails? 
                // Or throw? The user explicitly asked for "no proxy".
                // But if JSONP fails, maybe they want to fallback to at least trying direct fetch?
                throw e;
            }
        }
    }


    // Hybrid Strategy: Try Direct Fetch first (Optimistic)
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

        const response = await fetch(oembedUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (e) {
        console.warn('[Dailymotion] Direct fetch failed, falling back to proxy.', e);
    }

    // Fallback: Use CORS Proxy
    const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(oembedUrl)}`;
    const proxyResponse = await fetch(proxyUrl);

    if (!proxyResponse.ok) {
        throw new Error(`Failed to fetch Dailymotion oEmbed via proxy: ${proxyResponse.status}`);
    }

    const text = await proxyResponse.text();
    try {
        return JSON.parse(text);
    } catch {
        throw new Error(`Failed to parse Dailymotion oEmbed response: ${text}`);
    }
}

/**
 * Extracts embed URL from oEmbed HTML
 */
export function extractEmbedUrl(html: string): string | undefined {
    if (!html) return undefined;
    // Extract src from iframe: src="https://geo.dailymotion.com/player.html?video=x7tgad0&"
    const match = html.match(/src="([^"]+)"/);
    return match ? match[1] : undefined;
}
