
/**
 * Telegram Post Data
 */
export interface TelegramData {
    channel: string;
    postId: string;
}

/**
 * Validates if a URL is a valid Telegram URL
 */
export function isValidTelegramUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return (
            urlObj.hostname === 't.me' ||
            urlObj.hostname === 'telegram.me' ||
            urlObj.hostname === 'www.t.me' ||
            urlObj.hostname === 'www.telegram.me'
        );
    } catch {
        return false;
    }
}

/**
 * Extracts channel and post ID from a Telegram URL
 * Returns format: "channel/123" which is used by data-telegram-post
 */
export function extractTelegramPostData(url: string): string | undefined {
    if (!url) return undefined;
    try {
        const urlObj = new URL(url);

        // Handle formats:
        // https://t.me/channel/123
        // https://telegram.me/channel/123
        // https://t.me/c/1234567890/123 (Private channel - might be tricky for public embed, but let's support parsing)

        const pathParts = urlObj.pathname.split('/').filter(Boolean);

        // Simple case: /channel/123
        if (pathParts.length >= 2) {
            const postId = pathParts[pathParts.length - 1];
            const channel = pathParts[pathParts.length - 2];

            if (!postId || !channel) return undefined;

            // Validate postId is numeric
            if (!/^\d+$/.test(postId)) return undefined;

            return `${channel}/${postId}`;
        }

        return undefined;
    } catch {
        return undefined;
    }
}
