import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { prisma } from "./server/prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: { label: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = await signInSchema.parseAsync(credentials);
                if (!email || !password) {
                    throw new Error("Please fill the credentials.")
                }
                const user = await prisma.user.findUnique({
                    where: { email },
                    include: { accounts: true }
                })

                if (!user) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const newUser = await prisma.user.create({
                        data: { email, password: hashedPassword },
                    })
                    return {
                        id: newUser.id,
                        email: newUser.email
                    }
                }

                if (!user.password) {
                    const providers = user.accounts.map((acc) => acc.provider).join(", ");
                    throw new Error(`Account exist via ${providers}, please login via ${providers}`);
                }
                const isPasswordValid = await bcrypt.compare(password, user.password)

                if (!isPasswordValid) {
                    throw new Error("Invalid password.")
                }
                return {
                    id: user.id,
                    email: user.email
                }
            },
        }),
        GitHub({ allowDangerousEmailAccountLinking: true }),
        Google({ allowDangerousEmailAccountLinking: true })
    ],

})