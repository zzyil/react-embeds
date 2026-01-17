export type SpotifyItemType = 'track' | 'album' | 'playlist' | 'artist' | 'show' | 'episode' | 'user';

export interface SpotifyUrlInfo {
    id: string;
    type: SpotifyItemType;
    isValid: boolean;
    originalUrl: string;
}

/**
 * Validate if a URL is a Spotify URL
 */
export function isValidSpotifyUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('spotify.com');
    } catch {
        return false;
    }
}

/**
 * Parse a Spotify URL to extract the ID and Type
 * Supports:
 * - https://open.spotify.com/track/123...
 * - https://open.spotify.com/playlist/123...
 * ...
 */
export function parseSpotifyUrl(url: string): SpotifyUrlInfo {
    const defaultResult: SpotifyUrlInfo = {
        id: '',
        type: 'track', // Default
        isValid: false,
        originalUrl: url
    };

    if (!isValidSpotifyUrl(url)) {
        return defaultResult;
    }

    try {
        const urlObj = new URL(url);
        // Path usually: /{type}/{id} or /intl-{country}/{type}/{id}
        const pathParts = urlObj.pathname.split('/').filter(p => p !== '');

        // Remove intl-xx segment if present
        const cleanPathParts = pathParts.filter(part => !part.match(/^intl-[a-z]{2}$/));

        // Check for standard pattern
        if (cleanPathParts.length >= 2) {
            const type = cleanPathParts[0] as SpotifyItemType;
            const id = cleanPathParts[1];

            // Validate allowed types
            const allowedTypes: SpotifyItemType[] = ['track', 'album', 'playlist', 'artist', 'show', 'episode', 'user'];
            if (allowedTypes.includes(type) && id) {
                return {
                    id,
                    type,
                    isValid: true,
                    originalUrl: url
                };
            }
        }

        // Check for /embed/ pattern if user pasted an embed link
        if (pathParts[0] === 'embed' && pathParts.length >= 3) {
            const type = pathParts[1] as SpotifyItemType;
            const id = pathParts[2] || "";
            if (id) {
                return {
                    id,
                    type,
                    isValid: true,
                    originalUrl: url
                };
            }

            return defaultResult;
        }

        return defaultResult;
    } catch {
        return defaultResult;
    }
}

/**
 * Get the Spotify Embed URL
 */
export function getSpotifyEmbedUrl(url: string, theme: 'light' | 'dark' = 'light'): string | null {
    const info = parseSpotifyUrl(url);
    if (!info.isValid) return null;

    // Spotify embed theme: pass &theme=0 for dark, omit for light (default)
    const themeParam = theme === 'dark' ? '&theme=0' : '';
    return `https://open.spotify.com/embed/${info.type}/${info.id}?utm_source=generator${themeParam}`;
}
