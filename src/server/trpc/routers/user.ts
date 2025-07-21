import { procedure, router } from "../trpc";

export const userRouter = router({
    getUser: procedure.query(({ ctx }) => {
        if (!ctx.session) {
            throw new Error("unauthorised")
        }
        return ctx.session.user;
    })
})