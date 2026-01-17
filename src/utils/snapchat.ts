
export const isValidSnapchatUrl = (url: string): boolean => {
    return /^https?:\/\/(www\.)?snapchat\.com\/(lens|story|spotlight|add)\/[a-zA-Z0-9_-]+(\/embed)?/.test(url);
};

export const getSnapchatEmbedUrl = (url: string): string => {
    if (!isValidSnapchatUrl(url)) return '';
    // Ensure it ends with /embed if not already present
    if (url.endsWith('/embed')) return url;
    return `${url}/embed`;
};
