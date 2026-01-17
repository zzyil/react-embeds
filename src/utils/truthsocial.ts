import { fetchJsonp } from "./jsonp";

export type TruthSocialOembed = {
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

export type TruthSocialOembedParams = {
    maxwidth?: number;
    maxheight?: number;
};

export type TruthSocialOembedOptions = TruthSocialOembedParams & {
    proxyUrl?: string;
    useJsonp?: boolean;
    jsonpParam?: string;
};

const buildProxyUrl = (
    proxyUrl: string,
    statusUrl: string,
    params?: TruthSocialOembedParams
) => {
    const base = typeof window !== "undefined" ? window.location.href : "http://localhost";
    const proxy = new URL(proxyUrl, base);
    proxy.searchParams.set("url", statusUrl);
    if (params?.maxwidth) proxy.searchParams.set("maxwidth", String(params.maxwidth));
    if (params?.maxheight) proxy.searchParams.set("maxheight", String(params.maxheight));
    return proxy.toString();
};

const buildDirectOembedUrl = (statusUrl: string, params?: TruthSocialOembedParams) => {
    const oembed = new URL("https://truthsocial.com/api/oembed");
    oembed.searchParams.set("url", statusUrl);
    if (params?.maxwidth) oembed.searchParams.set("maxwidth", String(params.maxwidth));
    if (params?.maxheight) oembed.searchParams.set("maxheight", String(params.maxheight));
    return oembed.toString();
};

export async function fetchTruthSocialOembed(
    statusUrl: string,
    options?: TruthSocialOembedOptions
): Promise<TruthSocialOembed> {
    // Normalize URL: remove /posts/ if present to handle https://truthsocial.com/@user/posts/id
    const normalizedUrl = statusUrl.replace("/posts/", "/");

    const requestUrl = options?.proxyUrl
        ? buildProxyUrl(options.proxyUrl, normalizedUrl, options)
        : buildDirectOembedUrl(normalizedUrl, options);

    if (options?.useJsonp && typeof window !== "undefined" && !options?.proxyUrl) {
        const callbackParam = options?.jsonpParam || "callback";
        return fetchJsonp<TruthSocialOembed>(requestUrl, callbackParam);
    }

    const response = await fetch(requestUrl);
    if (!response.ok) {
        throw new Error(`Truth Social oEmbed returned ${response.status}`);
    }
    return response.json();
}
