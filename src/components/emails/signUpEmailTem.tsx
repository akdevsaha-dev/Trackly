import * as React from "react";

interface EmailTemplateProps {
  name: string;
}

export function EmailTemplate({ name }: EmailTemplateProps) {
  const displayName = name?.trim();
  return (
    <div>
      <h1>Hi {displayName}, thank you for trusting us!</h1>
      <p>
        We are excited to have you onboard, put your tension aside get
        notification everytime your site goes down.
      </p>
      <p style={{ marginTop: "20px" }}>— Trackly Team</p>
    </div>
  );
}
