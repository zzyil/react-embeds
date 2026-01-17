export type AppleMusicItemType = 'song' | 'album' | 'playlist' | 'artist' | 'station' | 'music-video';

export interface AppleMusicUrlInfo {
    id: string;
    type: AppleMusicItemType;
    country: string;
    isValid: boolean;
    originalUrl: string;
}

export function isValidAppleMusicUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('music.apple.com');
    } catch {
        return false;
    }
}

export function parseAppleMusicUrl(url: string): AppleMusicUrlInfo {
    const defaultResult: AppleMusicUrlInfo = {
        id: '',
        type: 'song',
        country: '',
        isValid: false,
        originalUrl: url
    };

    if (!isValidAppleMusicUrl(url)) return defaultResult;

    try {
        const urlObj = new URL(url);
        // Valid path: /{country}/{type}/{name}/{id} or /{country}/{type}/{id}
        // Example: /us/album/thriller/269572838
        const pathParts = urlObj.pathname.split('/').filter(p => p !== '');

        if (pathParts.length >= 3) {
            const country = pathParts[0] || "";
            const typeRaw = pathParts[1] || "";
            let type: AppleMusicItemType = 'song'; // Default
            // ID is usually the last part
            const id = pathParts[pathParts.length - 1];

            // Map URL types to embed types if necessary, though usually they match
            // supported: album, playlist, song (often under album with ?i=), artist, station
            // For 'song', it might be /album/.../id?i=songId

            // For 'song', it might be /album/.../id?i=songId
            type = typeRaw as AppleMusicItemType;
            const finalId = id || "";

            // Handle song params ?i=...
            const songId = urlObj.searchParams.get('i');
            if (songId) {
                type = 'song';
                // For embed, we usually keep the album context but highlight the song, 
                // typically embed url matches the page url structure
            }

            return {
                id: finalId,
                type,
                country,
                isValid: true,
                originalUrl: url
            };
        }

        return defaultResult;
    } catch {
        return defaultResult;
    }
}

export function getAppleMusicEmbedUrl(url: string, theme: 'light' | 'dark' = 'light'): string | null {
    if (!isValidAppleMusicUrl(url)) return null;

    // Apple Music embed URLs are just the normal URL with 'embed.' subdomain
    try {
        const urlObj = new URL(url);
        urlObj.hostname = 'embed.music.apple.com';

        // Append theme param
        // Apple Music uses ?theme=dark or ?theme=light (default auto/light)
        urlObj.searchParams.set('theme', theme);

        return urlObj.toString();
    } catch {
        return null;
    }
}
