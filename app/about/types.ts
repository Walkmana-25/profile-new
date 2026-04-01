export interface Profile {
  name: string;
  avatar: string;
  affiliations: Affiliation[];
  bio: string;
  skills: SkillCategory[];
  interests: string[];
  socialLinks: SocialLink[];
  media: MediaItem[];
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

/** Media Section の各カードデータ */
export interface MediaItem {
  /** リンク先URL */
  url: string;
  /** ページタイトル */
  title: string;
  /** ページの説明 */
  description: string;
  /** OG画像のURL（nullの場合はフォールバック画像を使用） */
  ogImage: string | null;
}

/** スクレイピング結果のJSONファイル形式 */
export interface MediaData {
  items: MediaItem[];
  scrapedAt: string;
}
