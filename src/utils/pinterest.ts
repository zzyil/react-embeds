/**
 * Pinterest Embed Utilities
 * 
 * Uses the widgets.pinterest.com JSONP API (Pidgets) to fetch pin data.
 * Endpoint: https://widgets.pinterest.com/v3/pidgets/pins/info/?pin_ids={id}&sub=2&base_scheme=https
 */

export interface PinterestUrlInfo {
    pinId: string;
    originalUrl: string;
    isValid: boolean;
}

export interface PinterestPinData {
    id: string;
    title?: string;
    description?: string; // Rich description or caption
    text?: string;       // User description
    link?: string;       // Source link
    images: {
        [key: string]: {
            url: string;
            width: number;
            height: number;
        };
    };
    dominantColor?: string;
    pinner: {
        fullName: string;
        username?: string;
        profileUrl: string;
        avatarUrl: string;
    };
    stats: {
        saves: number;
        comments: number;
    };
    isVideo: boolean;
}

/**
 * Validate if a URL is a Pinterest URL
 */
export function isValidPinterestUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        return hostname.includes('pinterest.') || hostname === 'pin.it';
    } catch {
        return false;
    }
}

/**
 * Parse a Pinterest URL to extract the Pin ID
 * Supports:
 * - https://www.pinterest.com/pin/123456789/
 * - https://pinterest.com/pin/123456789
 * - https://id.pinterest.com/pin/123456789/ (international domains)
 */
export function parsePinterestUrl(url: string): PinterestUrlInfo {
    const defaultResult: PinterestUrlInfo = {
        pinId: '',
        originalUrl: url,
        isValid: false
    };

    if (!isValidPinterestUrl(url)) {
        return defaultResult;
    }

    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/').filter(p => p !== '');

        // Pattern: /pin/{id}/
        const pinIndex = pathParts.indexOf('pin');
        const nextPart = pathParts[pinIndex + 1];

        if (pinIndex !== -1 && nextPart) {
            const pinId = nextPart;
            // Basic numeric validation (Pinterest IDs are usually numeric)
            if (/^\d+$/.test(pinId)) {
                return {
                    pinId,
                    originalUrl: url,
                    isValid: true
                };
            }
        }

        return defaultResult;
    } catch {
        return defaultResult;
    }
}

export function getPinterestApiUrl(pinId: string, callbackName: string): string {
    return `https://widgets.pinterest.com/v3/pidgets/pins/info/?pin_ids=${pinId}&sub=2&base_scheme=https&callback=${callbackName}`;
}

/**
 * Fetch Pinterest data via JSONP
 */
export function fetchPinterestData(pinId: string): Promise<PinterestPinData> {
    return new Promise((resolve, reject) => {
        const callbackName = `pinterest_callback_${Math.random().toString(36).substr(2, 9)}`;
        const script = document.createElement('script');

        // Define global callback
        // @ts-ignore
        window[callbackName] = (response: any) => {
            cleanup();

            if (response && response.status === 'success' && response.data && response.data[0]) {
                const pin = response.data[0];

                // Transform API response to our internal format
                const data: PinterestPinData = {
                    id: pin.id,
                    title: pin.title || pin.rich_metadata?.title,
                    description: pin.description || pin.rich_metadata?.description,
                    text: pin.text,
                    link: pin.link,
                    images: pin.images,
                    dominantColor: pin.dominant_color,
                    pinner: {
                        fullName: pin.pinner?.full_name || 'Pinterest User',
                        username: pin.pinner?.username,
                        profileUrl: pin.pinner?.profile_url,
                        avatarUrl: pin.pinner?.image_small_url
                    },
                    stats: {
                        saves: pin.aggregated_pin_data?.aggregated_stats?.saves || 0,
                        comments: pin.comment_count || 0
                    },
                    isVideo: pin.is_video || false
                };
                resolve(data);
            } else {
                reject(new Error(response?.message || 'Failed to fetch Pinterest data'));
            }
        };

        // Error handler
        script.onerror = () => {
            cleanup();
            reject(new Error('Network error loading Pinterest script'));
        };

        function cleanup() {
            // @ts-ignore
            delete window[callbackName];
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }

        script.src = getPinterestApiUrl(pinId, callbackName);
        document.body.appendChild(script);
    });
}

/**
 * Get the best quality image URL from the pin data
 */
export function getBestImage(images: PinterestPinData['images']): { url: string; width: number; height: number } | null {
    if (!images) return null;

    // Pinterest typically provides 236x, 564x, and originals
    // We prefer originals, then 564x, then 236x

    if (images['originals']) return images['originals'];

    // Sometimes 'originals' key is missing but we can construct it or find largest
    // Check for other standard sizes
    const sizes = ['564x', '474x', '236x'];
    for (const size of sizes) {
        if (images[size]) return images[size];
    }

    // Fallback to first available
    const keys = Object.keys(images);
    const firstKey = keys[0];
    if (keys.length > 0 && firstKey) {
        const img = images[firstKey];
        return img || null;
    }

    return null;
}

/**
 * Format count stats (e.g. 1500 -> 1.5k)
 */
export function formatCount(count: number): string {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return count.toString();
}
