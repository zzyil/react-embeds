export type TidalItemType = 'track' | 'album' | 'playlist' | 'video' | 'artist';

export interface TidalUrlInfo {
    id: string;
    type: TidalItemType;
    isValid: boolean;
    originalUrl: string;
}

export function isValidTidalUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('tidal.com');
    } catch {
        return false;
    }
}

export function parseTidalUrl(url: string): TidalUrlInfo {
    const defaultResult: TidalUrlInfo = {
        id: '',
        type: 'track',
        isValid: false,
        originalUrl: url
    };

    if (!isValidTidalUrl(url)) return defaultResult;

    try {
        const urlObj = new URL(url);
        // Path: /browse/{type}/{id} or /{type}/{id}
        let pathParts = urlObj.pathname.split('/').filter(p => p !== '');

        if (pathParts[0] === 'browse') {
            pathParts.shift();
        }

        if (pathParts.length >= 2) {
            const type = pathParts[0] as TidalItemType;
            const id = pathParts[1] || "";

            const allowedTypes = ['track', 'album', 'playlist', 'video', 'artist'];
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

export function getTidalEmbedUrl(url: string): string | null {
    const info = parseTidalUrl(url);
    if (!info.isValid) return null;

    // Tidal embed: https://embed.tidal.com/{type}/{id}
    // But 'artist' might not be directly embeddable same way, sometimes falls back to a mix?
    // Official tidal embed code usually uses /browse/ for artists which doesn't always work in iframe.
    // However, tracks/albums/playlists/videos work with `embed.tidal.com`.
    // Valid types for embed: tracks, albums, playlists, videos.
    // 'artist' is not officially supported by embed.tidal.com the same way (usually shows top tracks).
    // Mapping:
    // track -> tracks
    // album -> albums
    // playlist -> playlists
    // video -> videos

    if (info.type === 'artist') {
        return null;
    }

    let embedType = info.type + 's'; // simple pluralization usually works for tidal api/embed
    if (info.type === 'video') embedType = 'videos';

    return `https://embed.tidal.com/${embedType}/${info.id}`;
}
