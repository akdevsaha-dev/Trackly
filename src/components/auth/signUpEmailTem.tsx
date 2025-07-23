import * as React from "react";

interface EmailTemplateProps {
  name?: string;
  email?: string;
}

export function EmailTemplate({ name, email }: EmailTemplateProps) {
  const fallBack = email ? email.split("@")[0] : "there stranger";
  const displayName = name?.trim() || fallBack;
  return (
    <div>
      <h1>Hi {displayName}, thank you for trusting us!</h1>
      <p>
        We are excited to have you onboard, put your tension aside get
        notification everytime your site goes down.
      </p>
    </div>
  );
}
