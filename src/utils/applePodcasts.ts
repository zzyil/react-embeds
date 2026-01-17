export type ApplePodcastsItemType = 'show' | 'episode';

export interface ApplePodcastsUrlInfo {
    id: string;
    type: ApplePodcastsItemType;
    country: string;
    isValid: boolean;
    originalUrl: string;
}

export function isValidApplePodcastsUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('podcasts.apple.com');
    } catch {
        return false;
    }
}

export function parseApplePodcastsUrl(url: string): ApplePodcastsUrlInfo {
    const defaultResult: ApplePodcastsUrlInfo = {
        id: '',
        type: 'show',
        country: '',
        isValid: false,
        originalUrl: url
    };

    if (!isValidApplePodcastsUrl(url)) return defaultResult;

    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/').filter(p => p !== '');
        if (pathParts.length >= 2) {
            const country = pathParts[0];
            const idMatch = urlObj.pathname.match(/\/id(\d+)/);
            const id = idMatch ? idMatch[1] : '';
            const episodeId = urlObj.searchParams.get('i');
            return {
                id: episodeId || id || "",
                type: episodeId ? 'episode' : 'show',
                country: country || "",
                isValid: true,
                originalUrl: url
            };
        }

        return defaultResult;
    } catch {
        return defaultResult;
    }
}

export function getApplePodcastsEmbedUrl(url: string, theme: 'light' | 'dark' = 'light'): string | null {
    if (!isValidApplePodcastsUrl(url)) return null;

    try {
        const urlObj = new URL(url);
        urlObj.hostname = 'embed.podcasts.apple.com';

        // Apple Podcasts supports theme=dark or theme=light
        if (theme) {
            urlObj.searchParams.set('theme', theme);
        }

        return urlObj.toString();
    } catch {
        return null;
    }
}
