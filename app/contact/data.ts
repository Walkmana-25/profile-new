import type { ContactMethod } from "./types";

export const contactData: ContactMethod[] = [
  {
    type: "email",
    platform: "Email",
    value: "your.email@example.com",
    url: "mailto:your.email@example.com",
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
