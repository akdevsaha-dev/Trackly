import { error } from "console"
import { pingWebsites } from "../lib/pingWebsites"
import { prisma } from "../prisma"

export const checkAllSites = async () => {
    const sites = await prisma.site.findMany({
        include: {
            user: true
        }
    })
    await Promise.all(
        sites.map(async (site) => {
            try {
                const result = await pingWebsites(site.url);
                const { statusCode, responseMs } = result;
                await prisma.statusLog.create({
                    data: {
                        siteId: site.id,
                        statusCode,
                        responseMs
                    }
                })
                //email alert if code >> 500
            } catch (error) {
                console.error(`failed to ping ${site.url}`, error)
            }
        })
    )
}