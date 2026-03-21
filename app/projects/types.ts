export interface Project {
  slug: string;
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
  image?: string;
  tags: string[];
  pinned: boolean;
  links?: { label: string; url: string }[];
  content: string;
}

export interface ProjectFrontmatter {
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
  image?: string;
  tags: string[];
  pinned?: boolean;
  links?: { label: string; url: string }[];
}
