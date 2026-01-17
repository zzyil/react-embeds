export interface RumbleData {
    title: string;
    author_name: string;
    thumbnail_url: string;
    html: string;
    width: number;
    height: number;
    version: string;
    provider_name: string;
    provider_url: string;
    embedId?: string;
}

const JSON2JSONP_CALLBACK = "myCallback";
const JSON2JSONP_ENDPOINT = "https://json2jsonp.com/";

export function isValidRumbleUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('rumble.com');
    } catch {
        return false;
    }
}

export function isRumbleEmbedUrl(url: string): boolean {
    try {
        const urlObj = new URL(url);
        const host = urlObj.hostname.toLowerCase();
        if (host.includes("player.rumble.com") || host.includes("s.rumble.com")) {
            return true;
        }
        return host.includes("rumble.com") && urlObj.pathname.startsWith("/embed/");
    } catch {
        return false;
    }
}

const normalizeEmbedId = (value: string): string | undefined => {
    const trimmed = value.trim().replace(/[^a-zA-Z0-9]/g, "");
    if (!trimmed) return undefined;
    return trimmed.startsWith("v") ? trimmed : `v${trimmed}`;
};

export function extractRumbleEmbedIdFromUrl(url: string): string | undefined {
    try {
        const urlObj = new URL(url);
        const host = urlObj.hostname.toLowerCase();
        const parts = urlObj.pathname.split("/").filter(Boolean);

        if (host.includes("player.rumble.com") || host.includes("s.rumble.com")) {
            if (parts[0]) return normalizeEmbedId(parts[0]);
            return undefined;
        }

        if (urlObj.pathname.startsWith("/embed/")) {
            if (parts[1]) return normalizeEmbedId(parts[1]);
            const vParam = urlObj.searchParams.get("v");
            if (vParam) return normalizeEmbedId(vParam);
        }

        return undefined;
    } catch {
        return undefined;
    }
}

// Basic ID extraction from URL path: rumble.com/vXXXXX-title.html
export function extractIdFromUrl(url: string): string | undefined {
    try {
        const urlObj = new URL(url);

        // Match embed URLs: /embed/vXXXXX/
        const embedMatch = urlObj.pathname.match(/\/embed\/(v?[a-zA-Z0-9]+)/);
        if (embedMatch) {
            return embedMatch[1];
        }

        // Match public URLs: /vXXXXX-title.html
        const match = urlObj.pathname.match(/^\/(v[a-zA-Z0-9]+)(-|$)/);
        if (match) return match[1];

        return undefined;
    } catch {
        return undefined;
    }
}

function json2Jsonp<T>(targetUrl: string, timeoutMs = 8000): Promise<T> {
    if (typeof document === "undefined") {
        return Promise.reject(new Error("json2jsonp requires a browser environment"));
    }

    const json2jsonpUrl = `${JSON2JSONP_ENDPOINT}?url=${encodeURIComponent(targetUrl)}&callback=${JSON2JSONP_CALLBACK}`;

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        const priorCallback = (window as any)[JSON2JSONP_CALLBACK];
        let settled = false;
        const parent = document.body || document.head || document.documentElement;

        const cleanup = () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            if (priorCallback) {
                (window as any)[JSON2JSONP_CALLBACK] = priorCallback;
            } else {
                delete (window as any)[JSON2JSONP_CALLBACK];
            }
        };

        const timeoutId = window.setTimeout(() => {
            if (settled) return;
            settled = true;
            cleanup();
            reject(new Error("json2jsonp timed out"));
        }, timeoutMs);

        (window as any)[JSON2JSONP_CALLBACK] = (data: T) => {
            if (settled) return;
            settled = true;
            window.clearTimeout(timeoutId);
            cleanup();
            resolve(data);
        };

        script.async = true;
        script.onerror = () => {
            if (settled) return;
            settled = true;
            window.clearTimeout(timeoutId);
            cleanup();
            reject(new Error("json2jsonp failed to load"));
        };
        script.src = json2jsonpUrl;

        parent.appendChild(script);
    });
}

export async function resolveRumbleEmbedIdWithJson2Jsonp(url: string): Promise<{ embedId: string; oembed: RumbleData }> {
    const oembedUrl = `https://rumble.com/api/Media/oembed.json?url=${encodeURIComponent(url)}`;
    const data = await json2Jsonp<RumbleData>(oembedUrl);
    const embedId = extractRumbleVideoId(data?.html || "");
    if (!embedId) {
        throw new Error("json2jsonp did not return an embed id");
    }
    return { embedId, oembed: data };
}

/**
 * Robust non-proxy ID extraction.
 * Uses /embed/slug/[slug] path which is known to allow CORS.
 */
export async function extractRumbleIdDirect(urlOrSlug: string): Promise<string | undefined> {
    let slug = urlOrSlug;
    if (urlOrSlug.includes('rumble.com')) {
        try {
            const urlObj = new URL(urlOrSlug);
            // If it's already an embed URL, extract ID directly
            const id = extractIdFromUrl(urlOrSlug);
            if (id && id.startsWith('v')) return id;

            // Otherwise get the slug from the path
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            const part = pathParts[0];
            if (part) {
                // If it's something like /v5ciwml-cyrax-candyman.html, extract v5ciwml
                slug = (part || "").split('-')[0] || "";
            }
        } catch {
            return undefined;
        }
    }

    if (!slug) return undefined;

    // Try CORS-enabled embed/slug path
    const probeUrl = `https://rumble.com/embed/slug/${slug}`;
    try {
        const response = await fetch(probeUrl);
        if (!response.ok) return undefined;
        const html = await response.text();

        // 1. Look for embedUrl in JSON-LD (high reliability)
        // "embedUrl":"https://rumble.com/embed/v72246a/"
        const jsonLdMatch = html.match(/"embedUrl"\s*:\s*"[^"]*?embed\/(v[a-z0-9]+)/i);
        if (jsonLdMatch) return jsonLdMatch[1];

        // 2. Look for Rumble player initialization (high reliability)
        // Rumble("play", {"video":"v72246a", ...})
        const playerMatch = html.match(/Rumble\s*\(\s*"play"\s*,\s*\{\s*"video"\s*:\s*"(v[a-z0-9]+)"/i);
        if (playerMatch) return playerMatch[1];

        // 3. Look for oEmbed links or direct embed URLs in HTML
        // Note: We skip the canonical link because it often contains the SLUG, not the Embed ID.
        const embedMatch = html.match(/rumble\.com\/embed\/(v[a-z0-9]+)/i);
        if (embedMatch) {
            // Safety check: if the found ID is exactly the same as our slug, 
            // it might just be the slug-based redirect. We want the INTERNAL id.
            // But usually rumble.com/embed/v... on the slug page points to the internal ID.
            return embedMatch[1];
        }
    } catch (e) {
        console.error("[Rumble] extractRumbleIdDirect failed:", e);
    }

    return undefined;
}

export interface RumbleVideoResponse {
    fps?: number; // 29.97
    w?: number; // 1280
    h?: number; // 720
    u: string | { mp4: { url: string;[key: string]: any } }; // direct string or nested object
    ua?: {
        [key: string]: [string, number, { bitrate: number }, any[]]; // "720": [url, 0, {bitrate}, []]
    };
    i?: string; // thumbnail
    evt?: {
        v?: string;
        e?: string;
        wt?: number;
        t?: string;
    };
    cc?: any[];
    l?: string; // slug path
    r?: number;
    title: string;
    author: {
        name: string;
        url: string;
    } | string; // sometimes string in fallback
    player?: boolean;
    duration?: number; // seconds
    pubDate?: string; // ISO
    loaded?: number;
    vid?: number;
    timeline?: number[];
    own?: boolean;
    restrict?: number[];
    autoplay?: number; // 1 or 0
    track?: number;
    live?: number; // 0 or 1
    live_placeholder?: boolean;
    share_url?: string;
    a?: any; // ads
    viewer_id?: string;
}

export async function fetchRumbleVideoDataDirect(slugOrId: string): Promise<RumbleVideoResponse> {
    const candidates = new Set<string>([slugOrId]);
    if (slugOrId.startsWith("v")) {
        candidates.add(slugOrId.slice(1));
    } else {
        candidates.add(`v${slugOrId}`);
    }

    // Expanded shards sweep based on test results
    const shards = ['u3', 'u4', 'u2', 'u6', 'u7', 'u8', 'u9', 'u10', 'u1', 'u5'];

    for (const candidate of candidates) {
        for (const shard of shards) {
            const url = `https://rumble.com/embedJS/${shard}/?request=video&v=${candidate}`;
            try {
                const response = await fetch(url);
                if (!response.ok) continue;
                const text = await response.text();
                // Some shards return "false" if not found
                if (!text || text.trim() === "false") continue;
                try {
                    const data = JSON.parse(text) as RumbleVideoResponse;
                    if (data && data.u) return data;
                } catch {
                    continue;
                }
            } catch {
                continue;
            }
        }
    }

    throw new Error("Direct Rumble fetch failed: No valid data found in shard sweep");
}

export async function fetchRumbleData(url: string): Promise<RumbleData> {
    const oembedUrl = `https://rumble.com/api/Media/oembed.json?url=${encodeURIComponent(url)}`;

    // Direct fetch only (will likely fail CORS in browser)
    const response = await fetch(oembedUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch Rumble oEmbed: ${response.status}`);
    }

    const data = await response.json();

    // Extract embedId from html if possible
    data.embedId = extractRumbleVideoId(data.html);

    return data;
}

export function extractRumbleVideoId(html: string): string | undefined {
    if (!html) return undefined;
    // The HTML contains: <iframe ... src="https://rumble.com/embed/v5a6o71/?pub=..." ...>
    const match = html.match(/rumble\.com\/embed\/([a-zA-Z0-9]+)/);
    return match ? match[1] : undefined;
}
