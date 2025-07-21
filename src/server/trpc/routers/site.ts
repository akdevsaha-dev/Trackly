import { TRPCError } from "@trpc/server";
import { procedure, router } from "../trpc";
import { z } from "zod"
const MAX_SITES = {
    FREE: 2,
    PAID: 20
}
export const siteRouter = router({
    addSite: procedure.input(z.object({
        url: z.string()
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
                    userId
                }
            })
            return site;
        }),

    getSites: procedure
        .query(async ({ ctx }) => {
            const session = ctx.session;
            if (!session?.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }

            const userId = session.user.id;
            const sites = await ctx.prisma.site.findMany({
                where: {
                    userId
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return sites;
        })
})
