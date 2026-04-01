export interface Profile {
  name: string;
  avatar: string;
  affiliations: Affiliation[];
  bio: string;
  skills: SkillCategory[];
  interests: string[];
  socialLinks: SocialLink[];
}

export interface Affiliation {
  organization: string;
  department?: string;
  role?: string;
  period?: string;
  highlighted?: boolean;
}

export interface SkillItem {
  name: string;
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: SocialIcon;
}

export type SocialIcon = "github" | "twitter" | "zenn" | "speakerdeck" | "email";
