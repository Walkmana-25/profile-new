import type { Route } from "./+types/apps";
import { Outlet, useLocation } from "react-router";
import { AppList } from "~/apps/AppList";
import { getApps } from "~/apps/utils";

export async function loader() {
  return await getApps();
}

export default function Apps({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const isDetailPage = location.pathname !== "/apps";

  return (
    <>
      {!isDetailPage && <AppList apps={loaderData} />}
      <Outlet />
    </>
  );
}
