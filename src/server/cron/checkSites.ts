import { AlertType } from "@prisma/client"
import { pingWebsites } from "../lib/pingWebsites"
import { prisma } from "../prisma"
import { sendDownEmail } from "@/lib/alerts/downEmailAlert"
import { sendBackUpEmail } from "@/lib/alerts/upEmailAlert"

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
                const isCurrentlyDown = statusCode >= 500;
                const wasDownBefore = site.isDown;

                if (isCurrentlyDown && !wasDownBefore) {
                    await prisma.site.update({
                        where: {
                            id: site.id
                        },
                        data: {
                            isDown: true
                        }
                    })
                    await prisma.alertLog.create({
                        data: {
                            siteId: site.id,
                            alertReason: `Site responded with ${statusCode}`,
                            type: AlertType.DOWN
                        }
                    });
                    if (site.user.email) {
                        sendDownEmail(site.url, site.user.email)
                    }
                } else if (!isCurrentlyDown && wasDownBefore) {
                    await prisma.site.update({
                        where: {
                            id: site.id
                        },
                        data: {
                            isDown: false
                        }
                    })
                    await prisma.alertLog.create({
                        data: {
                            siteId: site.id,
                            alertReason: `Site is back up with ${statusCode}`,
                            type: AlertType.UP
                        }
                    })
                    if (site.user.email) {
                        sendBackUpEmail(site.url, site.user.email)
                    }
                }
            } catch (error) {
                console.error(`failed to ping ${site.url}`, error)
            }
        })
    )
}