import type { Route } from "./+types/projects";
import { Outlet, useLocation } from "react-router";
import { ProjectList } from "~/projects/ProjectList";
import { getProjects } from "~/projects/utils";

export async function loader() {
  return await getProjects();
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const isDetailPage = location.pathname !== "/projects";

  return (
    <>
      {!isDetailPage && <ProjectList projects={loaderData} />}
      <Outlet />
    </>
  );
}
