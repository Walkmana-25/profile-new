import { ProjectDetail } from "~/projects/ProjectDetail";
import { getProject } from "~/projects/utils";
import type { Project } from "~/projects/types";

export async function loader({ params }: { params: { slug: string } }): Promise<Project> {
  const project = await getProject(params.slug);
  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }
  return project;
}

export default function ProjectDetailPage({ loaderData }: { loaderData: Project }) {
  return <ProjectDetail project={loaderData} />;
}
