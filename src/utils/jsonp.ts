/**
 * Performs a JSONP request by appending a script tag to the document head.
 * This is useful for fetching data from APIs that support JSONP (like Reddit)
 * to bypass CORS restrictions in client-side only environments (e.g. static sites).
 */
export function fetchJsonp<T>(url: string, callbackParam = "jsonp"): Promise<T> {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined") {
            reject(new Error("JSONP is only supported in the browser."));
            return;
        }

        const callbackName = `jsonp_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
        const script = document.createElement("script");

        // Cleanup function to remove script and callback
        const cleanup = () => {
            delete (window as any)[callbackName];
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };

        // Register the callback
        (window as any)[callbackName] = (data: T) => {
            cleanup();
            resolve(data);
        };

        // Construct the URL with the callback parameter
        const hasQuery = url.includes("?");
        const scriptUrl = `${url}${hasQuery ? "&" : "?"}${callbackParam}=${callbackName}`;

        script.src = scriptUrl;
        script.async = true;

        // Error handling
        script.onerror = () => {
            cleanup();
            reject(new Error(`JSONP request to ${url} failed.`));
        };

        // Append to DOM to trigger request
        document.head.appendChild(script);
    });
}
