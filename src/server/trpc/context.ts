import { auth } from "@/auth";
import { prisma } from "../prisma";

export async function createContext() {
    const session = await auth()
    return {
        session,
        prisma
    }
}
export type Context = Awaited<ReturnType<typeof createContext>>;