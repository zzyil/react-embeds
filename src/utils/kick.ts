
// kick.com/{channel}
// kick.com/{channel}/videos/{id}
// kick.com/{channel}/clips/{id}

// Video ID: UUID (e.g. 93a0f066-99b2-47ce-9101-1812d876592e)
// Clip ID: Usually clip_xxxx (e.g. clip_01H...) or just ID

export const KICK_REGEX = /kick\.com\/([a-zA-Z0-9_]+)(?:\/videos\/([a-zA-Z0-9-]+)|\/clips\/([a-zA-Z0-9_]+))?/;

export interface KickData {
    channel: string;
    videoId?: string;
    clipId?: string;
}

export const matchKickUrl = (url: string): KickData | null => {
    const match = url.match(KICK_REGEX);
    if (!match) return null;
    return {
        channel: match[1] || "",
        videoId: match[2], // Group 2 is video ID
        clipId: match[3]   // Group 3 is clip ID
    };
};
