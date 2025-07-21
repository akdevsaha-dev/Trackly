import { siteRouter } from "./routers/site";
import { userRouter } from "./routers/user";
import { router } from "./trpc";


export const appRouter = router({
    user: userRouter,
    site: siteRouter
})
export type AppRouter = typeof appRouter;