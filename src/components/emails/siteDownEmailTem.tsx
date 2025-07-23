import * as React from "react";

interface SiteDownEmailProps {
  siteUrl: string;
  time: string;
}

export function SiteDownEmail({ siteUrl, time }: SiteDownEmailProps) {
  return (
    <div>
      <h1>⚠️ Heads up!</h1>
      <p>
        Your site <strong>{siteUrl}</strong> just went{" "}
        <strong style={{ color: "red" }}>DOWN</strong> as of{" "}
        <strong>{time}</strong>.
      </p>
      <p>
        Our systems detected a failure or timeout. We'll notify you once it's
        back online.
      </p>
      <p style={{ marginTop: "20px" }}>— Trackly Team</p>
    </div>
  );
}
