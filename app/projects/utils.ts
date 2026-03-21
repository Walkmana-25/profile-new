import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "./types";

const projectFiles = import.meta.glob<string>("./markdown/*.md", {
  query: "?raw",
  import: "default",
});

export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = [];

  for (const [path, loadFile] of Object.entries(projectFiles)) {
    const content = await loadFile();
    const { data, content: body } = matter(content);
    const frontmatter = data as ProjectFrontmatter;

    const slug = path.replace("./markdown/", "").replace(".md", "");

    projects.push({
      slug,
      title: frontmatter.title,
      startDate: frontmatter.startDate,
      endDate: frontmatter.endDate,
      description: frontmatter.description,
      image: frontmatter.image,
      tags: frontmatter.tags || [],
      pinned: frontmatter.pinned || false,
      links: frontmatter.links,
      content: body.trim(),
    });
  }

  return projects.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
}

export function formatDateRange(start: string, end?: string): string {
  if (!end) {
    return `${formatDate(start)}~`;
  }
  return `${formatDate(start)}~${formatDate(end)}`;
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}
