export type SoundCloudItemType = 'track' | 'playlist';

export interface SoundCloudUrlInfo {
    type: SoundCloudItemType;
    isValid: boolean;
    originalUrl: string;
}

export function isValidSoundCloudUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('soundcloud.com') || urlObj.hostname.includes('on.soundcloud.com');
    } catch {
        return false;
    }
}

export function parseSoundCloudUrl(url: string): SoundCloudUrlInfo {
    const defaultResult: SoundCloudUrlInfo = {
        type: 'track',
        isValid: false,
        originalUrl: url
    };

    if (!isValidSoundCloudUrl(url)) return defaultResult;

    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/').filter(p => p !== '');
        if (pathParts.length >= 2 && pathParts[1] === 'sets') {
            return {
                type: 'playlist',
                isValid: true,
                originalUrl: url
            };
        }

        return {
            type: 'track',
            isValid: true,
            originalUrl: url
        };
    } catch {
        return defaultResult;
    }
}

export function getSoundCloudEmbedUrl(url: string, options?: { color?: string; autoPlay?: boolean }): string | null {
    if (!isValidSoundCloudUrl(url)) return null;
    const encodedUrl = encodeURIComponent(url);
    const color = options?.color ?? 'ff5500';
    const autoPlay = options?.autoPlay ? 'true' : 'false';
    return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=${color}&auto_play=${autoPlay}&show_teaser=true`;
}
