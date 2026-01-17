
export const ARCHIVE_REGEX = /archive\.org\/(?:details|embed|download)\/([^\/\?#]+)/;

export interface ArchiveData {
    title: string;
    description: string;
    creator: string;
    uploadDate: string;
    mediaUrl?: string; // Video or Audio path
    mediaType: 'video' | 'audio';
    posterUrl?: string;
    streamUrl?: string; // Full URL
    views?: number;
    size?: string;
    reviewCount?: number;
    rating?: number;
}

export const matchArchiveUrl = (url: string): string | null => {
    const match = url.match(ARCHIVE_REGEX);
    return match ? (match[1] || null) : null;
};

// Helper for cleaning description
const cleanDescription = (html: string): string => {
    if (!html) return "";
    let text = html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<[^>]+>/g, '');

    text = text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/\u00A0/g, " ")
        .replace(/[ \t]{2,}/g, " - ");

    return text.trim();
};

// JSONP Helper
let jsonpCounter = 0;
const fetchJsonp = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            // Server-side fallback or error
            return reject(new Error('JSONP only works in browser'));
        }

        const callbackName = 'archive_cb_' + (++jsonpCounter) + '_' + Math.round(100000 * Math.random());

        (window as any)[callbackName] = (data: any) => {
            delete (window as any)[callbackName];
            try {
                document.body.removeChild(script);
            } catch (e) { }
            resolve(data);
        };

        const script = document.createElement('script');
        script.src = `${url}&callback=${callbackName}`;
        script.onerror = (e) => {
            delete (window as any)[callbackName];
            try { document.body.removeChild(script); } catch (e) { }
            reject(new Error('Script load error'));
        };
        document.body.appendChild(script);
    });
};

const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const fetchArchiveData = async (id: string): Promise<ArchiveData | null> => {
    try {
        // Use details output=json via JSONP to get stats
        const url = `https://archive.org/details/${id}?output=json`;
        const json = await fetchJsonp(url);

        const metadata = json.metadata || {};
        const title = Array.isArray(metadata.title) ? metadata.title[0] : metadata.title;
        const description = Array.isArray(metadata.description) ? metadata.description[0] : metadata.description;
        const creator = Array.isArray(metadata.creator) ? metadata.creator[0] : metadata.creator;
        const date = metadata.date || metadata.publicdate || metadata.addeddate;

        // Views from item stats
        const views = (json.item && json.item.downloads) ? json.item.downloads : (metadata.views || metadata.downloads);

        // Reviews stats
        let reviewCount: number | undefined;
        let rating: number | undefined;
        if (json.reviews && json.reviews.info) {
            reviewCount = parseInt(json.reviews.info.num_reviews, 10);
            rating = parseFloat(json.reviews.info.avg_rating);
        }

        // Find media in files (same structure as metadata api)
        // Ensure files exist

        let mediaFile = null;
        let mediaType: 'video' | 'audio' = 'video';
        let posterFile = null;
        let fileSize: number = 0;

        // "files" in output=json is an OBJECT with filenames as keys, e.g. {"/file.mp4": {...}}
        // Wait, check Step 1964 and 1934 difference.
        // check_archive_details.js (output=json): Root keys ... 'files'.
        // I should verify if files is array or object.
        // Usually output=json files is an object: { "/fname.mp4": { format: ... } }
        // While metadata api files was an array.

        // Handling both just in case, or verify.
        // Let's assume Object first for output=json, but convert to Array for processing.

        let filesArray: any[] = [];
        if (json.files) {
            if (Array.isArray(json.files)) {
                filesArray = json.files;
            } else {
                // Convert map to array and add name property
                filesArray = Object.keys(json.files).map(key => ({
                    name: key.startsWith('/') ? key.slice(1) : key,
                    ...json.files[key]
                }));
            }
        }

        if (filesArray.length > 0) {
            // Priority: MP4 > MP3
            const vid = filesArray.find((f: any) =>
                (f.format === 'MPEG4' || f.name.endsWith('.mp4')) &&
                !f.name.endsWith('_512kb.mp4')
            );

            if (vid) {
                mediaFile = vid.name;
                mediaType = 'video';
                fileSize = parseInt(vid.size, 10);
            } else {
                const aud = filesArray.find((f: any) =>
                    f.format === 'VBR MP3' || f.name.endsWith('.mp3')
                );
                if (aud) {
                    mediaFile = aud.name;
                    mediaType = 'audio';
                    fileSize = parseInt(aud.size, 10);
                }
            }

            // Poster
            const img = filesArray.find((f: any) =>
                f.format === 'JPEG' || f.format === 'PNG' || f.name.endsWith('.jpg') || f.format === 'Item Image'
            );
            if (img) posterFile = img.name;
        }

        if (!mediaFile) return null;

        return {
            title: title || id,
            description: cleanDescription(description || ""),
            creator: creator || "Internet Archive",
            uploadDate: date,
            mediaUrl: mediaFile,
            mediaType,
            posterUrl: posterFile ? `https://archive.org/download/${id}/${posterFile}` : undefined,
            streamUrl: `https://archive.org/download/${id}/${mediaFile}`,
            views: views ? parseInt(views, 10) : undefined,
            size: fileSize ? formatBytes(fileSize) : undefined,
            reviewCount,
            rating
        };
    } catch (e) {
        console.error("Archive fetch error:", e);
        // Fallback or just fail?
        // Since CORS metadata API is reliable but limited, maybe fallback?
        // But user wants stats. 
        // JSONP failure means network issue usually.
        return null;
    }
};
