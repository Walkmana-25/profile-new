export interface App {
  slug: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  pinned: boolean;
  links?: { label: string; url: string }[];
  content: string;
}

export interface AppFrontmatter {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  pinned?: boolean;
  links?: { label: string; url: string }[];
}
