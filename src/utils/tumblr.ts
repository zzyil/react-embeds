/**
 * Tumblr Embed Utilities
 * 
 * Tumblr provides a public v1 API that works without authentication and has CORS support.
 * Endpoint: https://{username}.tumblr.com/api/read/json?id={postId}
 */

/**
 * Tumblr post types
 */
export type TumblrPostType =
    | 'regular'   // Text post
    | 'photo'     // Photo post
    | 'quote'     // Quote post
    | 'link'      // Link post
    | 'video'     // Video post
    | 'audio'     // Audio post
    | 'chat'      // Chat/conversation post
    | 'answer';   // Ask/answer post

/**
 * Parsed Tumblr URL info
 */
export interface TumblrUrlInfo {
    /** Blog username/name */
    blogName: string;
    /** Post ID */
    postId: string;
    /** Post slug (optional) */
    slug?: string;
    /** Original URL */
    originalUrl: string;
    /** Whether URL is valid */
    isValid: boolean;
}

/**
 * Data returned from Tumblr API
 */
export interface TumblrPostData {
    /** Blog title */
    blogTitle: string;
    /** Blog name/username */
    blogName: string;
    /** Blog description */
    blogDescription?: string;
    /** Avatar URL (largest available) */
    avatarUrl?: string;
    /** Post ID */
    postId: string;
    /** Post type */
    postType: TumblrPostType;
    /** Post title (for text posts) */
    title?: string;
    /** Post body HTML */
    body?: string;
    /** Post date */
    date: string;
    /** Unix timestamp */
    timestamp: number;
    /** Note count (likes + reblogs) */
    noteCount: number;
    /** Tags */
    tags: string[];
    /** Post slug */
    slug?: string;
    /** Post URL */
    postUrl: string;
    /** Photo URLs (for photo posts) */
    photos?: Array<{
        url: string;
        width: number;
        height: number;
    }>;
    /** Direct video URL (extracted from NPF data) */
    videoUrl?: string;
    /** Video poster image URL */
    videoPoster?: string;
    /** Video embed HTML (for video posts) */
    videoEmbed?: string;
    /** Quote text (for quote posts) */
    quoteText?: string;
    /** Quote source (for quote posts) */
    quoteSource?: string;
    /** Link URL (for link posts) */
    linkUrl?: string;
    /** Link title (for link posts) */
    linkTitle?: string;
}

/**
 * Validate if a URL is a Tumblr URL
 */
export function isValidTumblrUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        // Match www.tumblr.com/username/postid or username.tumblr.com/post/postid
        return hostname === 'www.tumblr.com' ||
            hostname === 'tumblr.com' ||
            hostname.endsWith('.tumblr.com');
    } catch {
        return false;
    }
}

/**
 * Parse a Tumblr URL to extract blog name and post ID
 * 
 * Supports formats:
 * - https://www.tumblr.com/username/postid
 * - https://www.tumblr.com/username/postid/slug
 * - https://username.tumblr.com/post/postid
 * - https://username.tumblr.com/post/postid/slug
 */
export function parseTumblrUrl(url: string): TumblrUrlInfo {
    const defaultResult: TumblrUrlInfo = {
        blogName: '',
        postId: '',
        originalUrl: url,
        isValid: false
    };

    if (!isValidTumblrUrl(url)) {
        return defaultResult;
    }

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        const pathname = urlObj.pathname;
        const pathParts = pathname.split('/').filter(p => p !== '');

        // Format: www.tumblr.com/username/postid[/slug]
        if (hostname === 'www.tumblr.com' || hostname === 'tumblr.com') {
            if (pathParts.length >= 2) {
                const blogName = pathParts[0] || '';
                const postId = pathParts[1] || '';
                const slug = pathParts[2];

                // Validate postId is numeric
                if (/^\d+$/.test(postId)) {
                    return {
                        blogName,
                        postId,
                        slug,
                        originalUrl: url,
                        isValid: true
                    };
                }
            }
        }

        // Format: username.tumblr.com/post/postid[/slug]
        if (hostname.endsWith('.tumblr.com') && hostname !== 'www.tumblr.com') {
            const blogName = hostname.replace('.tumblr.com', '');

            if (pathParts[0] === 'post' && pathParts[1]) {
                const postId = pathParts[1];
                const slug = pathParts[2];

                if (/^\d+$/.test(postId)) {
                    return {
                        blogName,
                        postId,
                        slug,
                        originalUrl: url,
                        isValid: true
                    };
                }
            }
        }

        return defaultResult;
    } catch {
        return defaultResult;
    }
}

/**
 * Build the API URL for fetching post data
 */
export function getTumblrApiUrl(blogName: string, postId: string): string {
    return `https://${blogName}.tumblr.com/api/read/json?id=${postId}`;
}

/**
 * Parse the JSONP response from Tumblr API
 */
export function parseTumblrJsonp(responseText: string): unknown {
    // Response format: var tumblr_api_read = {...};
    // The response may have trailing whitespace/newlines
    const trimmed = responseText.trim();

    // Try multiple regex patterns
    const patterns = [
        /^var tumblr_api_read = (.+);?\s*$/s,
        /var tumblr_api_read\s*=\s*(\{[\s\S]*\})\s*;?\s*$/,
        /var tumblr_api_read\s*=\s*(.+?);?\s*$/s
    ];

    for (const pattern of patterns) {
        const match = trimmed.match(pattern);
        if (match && match[1]) {
            try {
                return JSON.parse(match[1]);
            } catch {
                // Try next pattern
                continue;
            }
        }
    }

    // If all patterns fail, log the response for debugging
    console.error('[TumblrUtils] Failed to parse JSONP. Response starts with:', trimmed.substring(0, 100));
    throw new Error('Invalid Tumblr API response format');
}

/**
 * Extract post data from Tumblr API response
 */
export function extractPostData(apiResponse: unknown, originalUrl: string): TumblrPostData | null {
    try {
        const data = apiResponse as {
            tumblelog?: {
                title?: string;
                name?: string;
                description?: string;
                avatar_url_512?: string;
                avatar_url_128?: string;
            };
            posts?: Array<{
                id?: string;
                type?: string;
                date?: string;
                'unix-timestamp'?: number;
                'note-count'?: string;
                tags?: string[];
                slug?: string;
                url?: string;
                'regular-title'?: string;
                'regular-body'?: string;
                'photo-url-1280'?: string;
                'photo-url-500'?: string;
                photos?: Array<{
                    'photo-url-1280'?: string;
                    width?: number;
                    height?: number;
                }>;
                'video-player'?: string;
                'quote-text'?: string;
                'quote-source'?: string;
                'link-url'?: string;
                'link-text'?: string;
            }>;
        };

        if (!data.posts || data.posts.length === 0) {
            return null;
        }

        const post = data.posts[0];
        if (!post) return null;

        const blog = data.tumblelog || {};

        // Extract photos for photo posts
        let photos: TumblrPostData['photos'];
        if (post.type === 'photo') {
            if (post.photos && post.photos.length > 0) {
                photos = post.photos.map(p => ({
                    url: p['photo-url-1280'] || '',
                    width: p.width || 0,
                    height: p.height || 0
                }));
            } else if (post['photo-url-1280'] || post['photo-url-500']) {
                photos = [{
                    url: post['photo-url-1280'] || post['photo-url-500'] || '',
                    width: 0,
                    height: 0
                }];
            }
        }

        // Extract video data from NPF (Neue Post Format) in regular-body
        let videoUrl: string | undefined;
        let videoPoster: string | undefined;
        const body = post['regular-body'] || '';

        // Look for data-npf attribute with video data
        const npfMatch = body.match(/data-npf='([^']+)'/i);
        if (npfMatch && npfMatch[1]) {
            try {
                const npfData = JSON.parse(npfMatch[1]) as {
                    type?: string;
                    url?: string;
                    media?: { url?: string };
                    poster?: Array<{ url?: string }>;
                };
                if (npfData.type === 'video') {
                    videoUrl = npfData.media?.url || npfData.url;
                    if (npfData.poster && npfData.poster.length > 0) {
                        videoPoster = npfData.poster[0]?.url;
                    }
                }
            } catch {
                // Failed to parse NPF, continue
            }
        }

        // Fallback: extract video from <video><source> tags in body
        if (!videoUrl) {
            const videoSrcMatch = body.match(/<source\s+src="([^"]+\.mp4[^"]*)"[^>]*>/i);
            if (videoSrcMatch) {
                const src = videoSrcMatch[1];
                if (src) videoUrl = src.replace(/\\/g, '');
            }
            const posterMatch = body.match(/poster="([^"]+)"/i);
            if (posterMatch) {
                const poster = posterMatch[1];
                if (poster) videoPoster = poster.replace(/\\/g, '');
            }
        }

        return {
            blogTitle: blog.title || blog.name || '',
            blogName: blog.name || '',
            blogDescription: blog.description,
            avatarUrl: blog.avatar_url_512 || blog.avatar_url_128,
            postId: post.id || '',
            postType: (post.type || 'regular') as TumblrPostType,
            title: post['regular-title'],
            body: post['regular-body'],
            date: post.date || '',
            timestamp: post['unix-timestamp'] || 0,
            noteCount: parseInt(post['note-count'] || '0', 10),
            tags: post.tags || [],
            slug: post.slug,
            postUrl: originalUrl,
            photos,
            videoUrl,
            videoPoster,
            videoEmbed: post['video-player'],
            quoteText: post['quote-text'],
            quoteSource: post['quote-source'],
            linkUrl: post['link-url'],
            linkTitle: post['link-text']
        };
    } catch (e) {
        console.error('[TumblrUtils] Error extracting post data:', e);
        return null;
    }
}

/**
 * Format a date for display
 */
export function formatTumblrDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return dateString;
    }
}

/**
 * Format note count for display
 */
export function formatNoteCount(count: number): string {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
}
