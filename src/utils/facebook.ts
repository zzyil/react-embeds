
export function extractFacebookPostId(url: string): string | null {
    try {
        const u = new URL(url);
        // Common formats:
        // /videos/ID
        // /watch/?v=ID
        // /username/videos/ID
        // /reel/ID
        // /reels/ID
        // /username/posts/ID

        if (u.pathname.includes("/videos/")) {
            const parts = u.pathname.split("/videos/");
            if (parts[1]) {
                const id = parts[1].split("/")[0];
                return id || null;
            }
        }

        if (u.pathname.includes("/reel/") || u.pathname.includes("/reels/")) {
            const parts = u.pathname.split(/\/reel(s)?\//);
            // parts[2] should be the ID because split regex has a capturing group
            const potentialId = parts[2] || parts[1];
            if (potentialId) return potentialId.split("/")[0] || null;
        }

        if (u.searchParams.has("v")) {
            return u.searchParams.get("v");
        }

        // Fallback for posts
        if (u.pathname.includes("/posts/")) {
            const parts = u.pathname.split("/posts/");
            if (parts[1]) {
                const id = parts[1].split("/")[0];
                return id || null;
            }
        }

        // Fallback: try to just grab the last numeric segments
        const match = u.pathname.match(/\/(\d+)\/?$/);
        if (match) return match[1] || null;

        return null;
    } catch {
        return null;
    }
}
