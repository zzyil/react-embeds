import { fetchJsonp } from "./jsonp";

export type MastodonOembed = {
    type?: string;
    version?: string;
    title?: string;
    author_name?: string;
    author_url?: string;
    provider_name?: string;
    provider_url?: string;
    cache_age?: number;
    html?: string;
    width?: number;
    height?: number | null;
};

export type MastodonOembedParams = {
    maxwidth?: number;
    maxheight?: number;
};

export type MastodonOembedOptions = MastodonOembedParams & {
    proxyUrl?: string;
    useJsonp?: boolean;
    jsonpParam?: string;
};

const buildProxyUrl = (
    proxyUrl: string,
    statusUrl: string,
    params?: MastodonOembedParams
) => {
    const base = typeof window !== "undefined" ? window.location.href : "http://localhost";
    const proxy = new URL(proxyUrl, base);
    proxy.searchParams.set("url", statusUrl);
    if (params?.maxwidth) proxy.searchParams.set("maxwidth", String(params.maxwidth));
    if (params?.maxheight) proxy.searchParams.set("maxheight", String(params.maxheight));
    return proxy.toString();
};

const buildInstanceOembedUrl = (statusUrl: string, params?: MastodonOembedParams) => {
    const status = new URL(statusUrl);
    const oembed = new URL("/api/oembed", status.origin);
    oembed.searchParams.set("url", statusUrl);
    if (params?.maxwidth) oembed.searchParams.set("maxwidth", String(params.maxwidth));
    if (params?.maxheight) oembed.searchParams.set("maxheight", String(params.maxheight));
    return oembed.toString();
};

export async function fetchMastodonOembed(
    statusUrl: string,
    options?: MastodonOembedOptions
): Promise<MastodonOembed> {
    const requestUrl = options?.proxyUrl
        ? buildProxyUrl(options.proxyUrl, statusUrl, options)
        : buildInstanceOembedUrl(statusUrl, options);

    if (options?.useJsonp && typeof window !== "undefined" && !options?.proxyUrl) {
        const callbackParam = options?.jsonpParam || "callback";
        return fetchJsonp<MastodonOembed>(requestUrl, callbackParam);
    }

    const response = await fetch(requestUrl);
    if (!response.ok) {
        throw new Error(`Mastodon oEmbed returned ${response.status}`);
    }
    return response.json();
}
