import type { Route } from "./+types/projects";
import { ProjectList } from "~/projects/ProjectList";
import { getProjects } from "~/projects/utils";

export async function loader() {
  return await getProjects();
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  return <ProjectList projects={loaderData} />;
}
