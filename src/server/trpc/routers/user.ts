import { TRPCError } from "@trpc/server";
import { procedure, router } from "../trpc";

export const userRouter = router({
    getUser: procedure.query(({ ctx }) => {
        if (!ctx.session) {
            throw new TRPCError({ code: "UNAUTHORIZED" })
        }
        return ctx.session.user;
    })
})