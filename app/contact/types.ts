export interface ContactMethod {
  type: "email" | "social";
  platform: string;
  value: string;
  url: string;
  icon: ContactIcon;
}

export type ContactIcon = "email" | "twitter";
