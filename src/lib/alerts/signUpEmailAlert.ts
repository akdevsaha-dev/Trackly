import { Site, User } from "@prisma/client";
import { resend } from "../resend";
import { EmailTemplate } from "@/components/emails/signUpEmailTem";



export const sendSignUpEmail = async (user: User) => {
    if (!user.email)
        return;
    try {
        const { error } = await resend.emails.send({
            from: 'Trackly <onboarding@resend.dev>',
            to: user.email,
            subject: 'Thank you for signing up',
            react: EmailTemplate({ name: user.name ?? "there" })
        })
        if (error) {
            console.error("Failed to send after signup email:", error);
        }
    } catch (error) {
        console.error("Unexpected error sending site down email:", error);
    }
}