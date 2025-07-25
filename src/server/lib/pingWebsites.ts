
export const pingWebsites = async (url: string) => {
    const startTime = Date.now()
    try {
        const res = await fetch(url, { method: "GET", redirect: "manual" })
        const responseMs = startTime - Date.now();
        return { statusCode: res.status, responseMs }
    } catch {
        return { statusCode: 0, responseMs: 0 }
    }
}

export const detectHostingProvider = async (url: string) => {
    try {
        const res = await fetch(url, { method: "HEAD" })
        const headers = Object.fromEntries(res.headers.entries())
        const server = headers["server"]?.toLowerCase() || "";
        const via = headers["via"]?.toLowerCase() || "";

        // Match known providers by signature headers
        if (headers["x-vercel-id"]) return "Vercel";
        if (headers["x-nf-request-id"]) return "Netlify";
        if (headers["x-amz-cf-id"] || via.includes("amazon")) return "AWS (CloudFront)";
        if (headers["fly-request-id"]) return "Fly.io";
        if (headers["cf-ray"] || server.includes("cloudflare")) return "Cloudflare";
        if (server.includes("github.com") || server.includes("gh-pages")) return "GitHub Pages";
        if (server.includes("render")) return "Render";
        if (server.includes("heroku")) return "Heroku";
        if (server.includes("digitalocean")) return "DigitalOcean App Platform";
        return "Unknown";
    } catch (error) {
        console.error(`Failed to detect hosting provider for ${url}:`, error);
        return "Unreachable";
    }
}
