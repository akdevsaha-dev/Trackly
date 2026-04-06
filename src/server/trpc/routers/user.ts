import { TRPCError } from "@trpc/server";
import { procedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
    getUser: procedure.query(({ ctx }) => {
        if (!ctx.session) {
            throw new TRPCError({ code: "UNAUTHORIZED" })
        }
        return ctx.session.user;
    }),

    updateName: procedure
        .input(z.object({ name: z.string().min(2).max(50) }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session?.user?.id;
            if (!userId) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }

            return await ctx.prisma.user.update({
                where: { id: userId },
                data: { name: input.name }
            });
        }),
})