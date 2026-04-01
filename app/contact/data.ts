import type { ContactMethod } from "./types";

export const contactData: ContactMethod[] = [
  {
    type: "email",
    platform: "Email",
    value: "y.takahashi@mail.floorp.app",
    url: "mailto:y.takahashi@mail.floorp.app",
    icon: "email",
  },
  {
    type: "social",
    platform: "X (Twitter)",
    value: "@yourusername",
    url: "https://x.com/yourusername",
    icon: "twitter",
  },
];
