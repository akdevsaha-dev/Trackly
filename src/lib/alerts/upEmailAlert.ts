import { resend } from "../resend";
import { SiteUpEmail } from "@/components/emails/siteUpEmailTem";

export const sendBackUpEmail = async (siteUrl: string, email: string) => {
    if (!email)
        return;
    try {
        const { error } = await resend.emails.send({
            from: 'Trackly <onboarding@resend.dev>',
            to: email,
            subject: `🚨 Site Back Up: ${siteUrl}`,
            react: SiteUpEmail({ siteUrl: siteUrl, time: new Date().toLocaleString() })
        })
        if (error) {
            console.error("Failed to send site up again email:", error);
        }
    } catch (error) {
        console.error("Unexpected error sending site down email:", error);
    }
}