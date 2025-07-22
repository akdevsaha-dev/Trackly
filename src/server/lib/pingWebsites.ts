
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