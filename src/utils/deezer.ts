export type DeezerItemType = 'track' | 'album' | 'playlist' | 'artist' | 'podcast' | 'episode';

export interface DeezerUrlInfo {
    id: string;
    type: DeezerItemType;
    isValid: boolean;
    originalUrl: string;
}

export function isValidDeezerUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('deezer.com');
    } catch {
        return false;
    }
}

export function parseDeezerUrl(url: string): DeezerUrlInfo {
    const defaultResult: DeezerUrlInfo = {
        id: '',
        type: 'track',
        isValid: false,
        originalUrl: url
    };

    if (!isValidDeezerUrl(url)) return defaultResult;

    try {
        const urlObj = new URL(url);
        // Path: /{country}/{type}/{id} or /{type}/{id}
        // Remove country if present (2 chars usually)
        let pathParts = urlObj.pathname.split('/').filter(p => p !== '');

        // Basic check for country code (2 letters) at start
        const firstPart = pathParts[0] || "";
        if (pathParts.length > 0 && firstPart.length === 2 && !['track', 'album', 'playlist', 'artist'].includes(firstPart)) {
            pathParts.shift();
        }

        if (pathParts.length >= 2) {
            const type = (pathParts[0] || "") as DeezerItemType;
            const id = pathParts[1] || "";

            const allowedTypes = ['track', 'album', 'playlist', 'artist', 'podcast', 'episode'];
            if (allowedTypes.includes(type)) {
                return {
                    id,
                    type,
                    isValid: true,
                    originalUrl: url
                };
            }
        }

        return defaultResult;
    } catch {
        return defaultResult;
    }
}

export function getDeezerEmbedUrl(url: string, theme: 'light' | 'dark' = 'light'): string | null {
    const info = parseDeezerUrl(url);
    if (!info.isValid) return null;

    const themeSegment = theme === 'dark' ? 'dark' : 'light';

    if (info.type === 'artist') {
        return `https://widget.deezer.com/widget/${themeSegment}/artist/${info.id}/top_tracks`;
    }

    return `https://widget.deezer.com/widget/${themeSegment}/${info.type}/${info.id}`;
}
