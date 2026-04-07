import { TRPCError } from "@trpc/server";
import { procedure, router } from "../trpc";
import { z } from "zod"
import { detectHostingProvider } from "@/server/lib/pingWebsites";
import { resend } from "@/lib/resend";

const MAX_SITES = {
    FREE: 2,
    PAID: 20
}

export const siteRouter = router({
    addSite: procedure.input(z.object({
        url: z.url({ message: "Invalid URL" })
    }))
        .mutation(async ({ input, ctx }) => {
            const session = ctx.session
            if (!session || !session.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const userId = session.user.id
            const user = await ctx.prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    sites: true
                }
            });
            if (!user) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const plan = user?.plan;
            const maxSites = plan === "PAID" ? MAX_SITES.PAID : MAX_SITES.FREE;
            if ((user?.sites.length ?? 0) >= maxSites) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: `You can monitor upto ${maxSites} with the ${plan.toLowerCase()} plan`
                })
            }

            const site = await ctx.prisma.site.create({
                data: {
                    url: input.url,
                    userId,
                }
            })
            const provider = await detectHostingProvider(site.url)
            await ctx.prisma.site.update({
                where: {
                    id: site.id
                }, data: {
                    provider
                }
            })
            return site;
        }),

    getSites: procedure
        .query(async ({ ctx }) => {
            const session = ctx.session;
            if (!session?.user?.id) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You must be signed in to view monitors."
                })
            }

            const userId = session.user.id;
            try {
                const sites = await ctx.prisma.site.findMany({
                    where: {
                        userId
                    },
                    include: {
                        statusLogs: {
                            take: 1,
                            orderBy: {
                                checkedAt: "desc"
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
                return sites || [];
            } catch (err) {
                console.error("Failed to fetch sites:", err);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Could not fetch your monitors from the database."
                });
            }
        }),
    // add cloudinary
    addBrandLogo: procedure.input(z.object({
        brandImage: z.url(),
        url: z.url()

    }))
        .mutation(async ({ input, ctx }) => {
            const session = ctx.session;
            if (!session?.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const userId = session.user.id
            const user = await ctx.prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            if (!user) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const site = await ctx.prisma.site.findUnique({
                where: {
                    userId_url: {
                        userId,
                        url: input.url
                    }
                }
            });

            if (!site) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Site not found." });
            }
            const updatedSite = await ctx.prisma.site.update({
                where: {
                    userId_url: {
                        userId,
                        url: input.url
                    }
                },
                data: {
                    brandImage: input.brandImage
                }
            })
            return updatedSite;
        }),
    getSiteStatus: procedure
        .input(z.object({
            siteId: z.string()
        }))
        .query(async ({ input, ctx }) => {
            const userId = ctx.session?.user.id
            if (!userId) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const site = await ctx.prisma.site.findUnique({
                where: {
                    id: input.siteId,
                    userId,
                },
                select: {
                    id: true,
                    provider: true,
                    warmupUrl: true,
                    warmUpEnabled: true,
                    url: true,
                    brandImage: true,
                    isDown: true,
                    createdAt: true,
                    statusLogs: {
                        take: 50,
                        orderBy: {
                            checkedAt: "desc",
                        },
                        select: { checkedAt: true, responseMs: true, statusCode: true },
                    },
                    alertLogs: {
                        take: 10,
                        orderBy: { sentAt: "desc" },
                        select: {
                            type: true,
                            sentAt: true,
                            alertReason: true
                        }
                    }
                },

            })
            return site;
        }),
    testAlert: procedure.input(z.object({ siteId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session?.user.id
            if (!userId || !ctx.session?.user.email) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const site = await ctx.prisma.site.findUnique({
                where: { id: input.siteId, userId }
            });
            if (!site) {
                throw new TRPCError({ code: "NOT_FOUND" })
            }

            try {
                await resend.emails.send({
                    from: 'Trackly <onboarding@resend.dev>',
                    to: ctx.session.user.email,
                    subject: `Test Alert - ${site.url}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1c1f2b; color: #ffffff; border-radius: 12px;">
                            <h2 style="color: #7E87F0;">Test Alert from Trackly</h2>
                            <p>This is a test alert for your monitor: <strong>${site.url}</strong></p>
                            <p>If you received this, your email notifications are working correctly!</p>
                            <div style="margin-top: 30px; border-top: 1px solid #2c3141; padding-top: 20px; font-size: 12px; color: #64748b;">
                                Sent via Trackly Monitoring Service
                            </div>
                        </div>
                    `
                });
                return { success: true, message: "Test alert sent to " + ctx.session.user.email };
            } catch (err) {
                return { success: false, message: "Failed to send email. Check your RESEND_API_KEY." };
            }
        }),

    deleteSite: procedure.input(z.object({ siteId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session?.user.id
            if (!userId) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const site = await ctx.prisma.site.findUnique({
                where: { id: input.siteId, userId }
            });
            if (!site) {
                throw new TRPCError({ code: "NOT_FOUND" })
            }
            // Delete associated records first
            await ctx.prisma.statusLog.deleteMany({ where: { siteId: input.siteId } });
            await ctx.prisma.alertLog.deleteMany({ where: { siteId: input.siteId } });
            await ctx.prisma.visit.deleteMany({ where: { siteId: input.siteId } });

            return await ctx.prisma.site.delete({
                where: { id: input.siteId }
            });
        }),

    getIncidents: procedure.query(async ({ ctx }) => {
        const userId = ctx.session?.user?.id;
        if (!userId) {
            console.warn("Unauthorized getIncidents call attempted");
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You must be signed in to view incidents."
            });
        }

        try {
            const logs = await ctx.prisma.alertLog.findMany({
                where: {
                    site: {
                        userId: userId
                    }
                },
                orderBy: { sentAt: 'desc' },
                include: { site: true },
                take: 50
            });
            console.log(`Successfully fetched ${logs.length} incidents for user ${userId}`);
            return logs;
        } catch (err) {
            console.error("Failed to fetch incidents for user " + userId, err);
            return [];
        }
    }),
    updateWarmupSettings: procedure.input(z.object({
        siteId: z.string(),
        enabled: z.boolean(),
        warmupUrl: z.string().optional()
    }))
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session?.user.id
            if (!userId) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const site = await ctx.prisma.site.findUnique({
                where: { id: input.siteId, userId }
            });
            if (!site) {
                throw new TRPCError({ code: "NOT_FOUND" })
            }

            return await ctx.prisma.site.update({
                where: { id: input.siteId },
                data: {
                    warmUpEnabled: input.enabled,
                    warmupUrl: input.warmupUrl
                }
            });
        }),
})