import * as React from "react";

interface SiteUpEmailProps {
  siteUrl: string;
  time: string;
}

export function SiteUpEmail({ siteUrl, time }: SiteUpEmailProps) {
  return (
    <div>
      <h1>✅ Good news</h1>
      <p>
        Your site <strong>{siteUrl}</strong> is back{" "}
        <strong style={{ color: "green" }}>UP</strong> as of{" "}
        <strong>{time}</strong>.
      </p>
      <p>
        Everything seems to be working fine again. We'll keep monitoring it for
        you.
      </p>
      <p style={{ marginTop: "20px" }}>— The Trackly Team</p>
    </div>
  );
}
