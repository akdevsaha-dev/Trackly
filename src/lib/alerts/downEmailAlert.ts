import { resend } from "../resend";
import { SiteDownEmail } from "@/components/emails/siteDownEmailTem";

export const sendDownEmail = async (siteUrl: string, email: string) => {
    if (!email)
        return;
    try {
        const { error } = await resend.emails.send({
            from: 'Trackly <onboarding@resend.dev>',
            to: email,
            subject: `🚨 Your site is down: ${siteUrl}`,
            react: SiteDownEmail({ siteUrl, time: new Date().toLocaleString() })
        })
        if (error) {
            console.error("Failed to send site down email:", error);
        }
    } catch (error) {
        console.error("Unexpected error sending site down email:", error);
    }
}