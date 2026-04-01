import matter from "gray-matter";
import type { App, AppFrontmatter } from "./types";

const appFiles = import.meta.glob<string>("./markdown/*.md", {
  query: "?raw",
  import: "default",
});

export async function getApps(): Promise<App[]> {
  const apps: App[] = [];

  for (const [path, loadFile] of Object.entries(appFiles)) {
    const content = await loadFile();
    const { data, content: body } = matter(content);
    const frontmatter = data as AppFrontmatter;

    const slug = path.replace("./markdown/", "").replace(".md", "");

    apps.push({
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      image: frontmatter.image,
      tags: frontmatter.tags || [],
      pinned: frontmatter.pinned || false,
      links: frontmatter.links,
      content: body.trim(),
    });
  }

  return apps.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return a.title.localeCompare(b.title);
  });
}

export async function getApp(slug: string): Promise<App | null> {
  const apps = await getApps();
  return apps.find((a) => a.slug === slug) || null;
}
