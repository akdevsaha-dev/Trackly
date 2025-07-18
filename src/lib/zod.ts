import z from "zod/v3";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be atleast 6 characters.").max(32, "Password must not exceed 32 characters")
})