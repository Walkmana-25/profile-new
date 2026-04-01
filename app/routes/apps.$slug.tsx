import type { Route } from "./+types/apps.$slug";
import { AppDetail } from "~/apps/AppDetail";
import { getApp } from "~/apps/utils";
import type { App } from "~/apps/types";

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${loaderData.title} | Y.Takahashi` },
  ];
}

export async function loader({ params }: { params: { slug: string } }): Promise<App> {
  const app = await getApp(params.slug);
  if (!app) {
    throw new Response("Not Found", { status: 404 });
  }
  return app;
}

export default function AppDetailPage({ loaderData }: { loaderData: App }) {
  return <AppDetail app={loaderData} />;
}
