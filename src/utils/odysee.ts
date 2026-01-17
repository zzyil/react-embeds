/**
 * Odysee utility functions for URL validation, content extraction, and embed handling
 */

export interface OdyseeData {
    title: string;
    description: string;
    author_name: string;
    author_url: string;
    thumbnail_url: string;
    thumbnail_width: number;
    thumbnail_height: number;
    html: string;
    version: string;
    provider_name: string;
    provider_url: string;
    type: string;
    width: number;
    height: number;
    // Extended fields for direct playback
    stream_url?: string;
    hls_url?: string;
    claim_id?: string;
}

/**
 * Validates if the given URL is a valid Odysee URL
 */
export function isValidOdyseeUrl(url: string): boolean {
    if (!url) return false;

    try {
        const urlObj = new URL(url);
        return urlObj.hostname === 'odysee.com' || urlObj.hostname === 'www.odysee.com';
    } catch {
        return false;
    }
}

/**
 * Extracts the claim ID from an Odysee URL
 * Odysee URLs can be in formats like:
 * - https://odysee.com/@channel:id/video-title:id
 * - https://odysee.com/@channel/video-title
 */
export function extractClaimPath(url: string): string | null {
    if (!isValidOdyseeUrl(url)) return null;

    try {
        const urlObj = new URL(url);
        // Remove leading slash and return the path
        const path = urlObj.pathname.slice(1);
        if (path && path.startsWith('@')) {
            return path;
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Extracts the embed URL from Odysee oEmbed HTML response
 */
export function extractEmbedUrl(html: string): string | undefined {
    if (!html) return undefined;

    // Match src attribute in iframe
    const srcMatch = html.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
        return srcMatch[1];
    }

    return undefined;
}

/**
 * Parses an Odysee URL to extract channel and video names.
 * Odysee URLs can be in formats like:
 * - https://odysee.com/@channel:id/video-title:id
 * - https://odysee.com/@channel/video-title
 * - https://odysee.com/video-title:id
 * - https://odysee.com/video-title
 */
export function parseOdyseeUrl(url: string): { channelName: string | null; videoName: string | null } {
    if (!url) return { channelName: null, videoName: null };

    try {
        const urlObj = new URL(url);
        if (urlObj.hostname !== 'odysee.com' && urlObj.hostname !== 'www.odysee.com') {
            return { channelName: null, videoName: null };
        }

        const pathSegments = urlObj.pathname.split('/').filter(segment => segment !== '');

        let channelName: string | null = null;
        let videoName: string | null = null;

        if (pathSegments.length > 0) {
            const firstSegment = pathSegments[0] || "";
            if (firstSegment.startsWith('@')) {
                channelName = firstSegment.substring(1); // Remove '@'
                if (pathSegments.length > 1) {
                    videoName = pathSegments[1] || null;
                }
            } else {
                // Case like https://odysee.com/video-title:id (no channel in path)
                videoName = firstSegment;
            }
        }

        return { channelName, videoName };
    } catch {
        return { channelName: null, videoName: null };
    }
}

/**
 * Fetches Odysee video data using their oEmbed API
 */
export async function fetchOdyseeData(url: string): Promise<OdyseeData> {
    const { videoName, channelName } = parseOdyseeUrl(url);

    if (!videoName || !channelName) {
        throw new Error('Invalid Odysee URL format');
    }


    // Clean names for SQL query (remove colon/id suffix if present in name)
    // Decode URI components to handle special characters (e.g. umlauts)
    const cleanVideoName = decodeURIComponent(((videoName || "").split(':')[0] || "")).replace(/'/g, "\\'");
    const cleanChannelName = decodeURIComponent(((channelName || "").split(':')[0] || "")).replace(/'/g, "\\'");

    // Use Chainquery (LBRY SQL API) to get precise metadata + sd_hash for streaming
    // Note: 'channel_name' column doesn't exist, we must match publisher_id to the channel's claim_id
    // and use frame_width/frame_height columns.
    const sql = `SELECT claim_id, name, title, description, thumbnail_url, sd_hash, duration, frame_height, frame_width 
                 FROM claim 
                 WHERE name = '${cleanVideoName}' 
                 AND publisher_id IN (SELECT claim_id FROM claim WHERE name = '@${cleanChannelName}') 
                 ORDER BY release_time DESC 
                 LIMIT 1`;

    const chainqueryUrl = `https://chainquery.lbry.com/api/sql?query=${encodeURIComponent(sql)}`;

    try {
        const response = await fetch(chainqueryUrl);
        if (!response.ok) {
            throw new Error(`Chainquery failed with status ${response.status}`);
        }

        const json = await response.json();

        if (!json.success || !json.data || json.data.length === 0) {
            console.error('[Odysee] No video found in Chainquery for:', { cleanVideoName, cleanChannelName });
            throw new Error('Video not found');
        }

        const data = json.data[0];

        // Construct the direct stream URL using the sd_hash (v6 endpoint)
        // Format: https://player.odycdn.com/v6/streams/{claim_id}/{sd_hash}.mp4
        const streamUrl = `https://player.odycdn.com/v6/streams/${data.claim_id}/${data.sd_hash}.mp4`;
        const m3u8Url = `https://player.odycdn.com/v6/streams/${data.claim_id}/${data.sd_hash}/master.m3u8`;

        return {
            title: data.title,
            description: data.description,
            author_name: cleanChannelName, // Chainquery doesn't give display name, use handle
            author_url: `https://odysee.com/@${cleanChannelName}`,
            thumbnail_url: data.thumbnail_url,
            thumbnail_width: data.frame_width,
            thumbnail_height: data.frame_height,
            html: `<iframe src="https://odysee.com/$/embed/@${cleanChannelName}/${cleanVideoName}" allowfullscreen></iframe>`, // Fallback HTML
            version: '1.0',
            provider_name: 'Odysee',
            provider_url: 'https://odysee.com',
            type: 'video',
            width: data.frame_width,
            height: data.frame_height,
            // Custom fields for our player
            stream_url: streamUrl,
            hls_url: m3u8Url,
            claim_id: data.claim_id,
        } as OdyseeData;

    } catch (error: any) {
        console.error('[Odysee] Error fetching data:', error);
        throw error;
    }
}
