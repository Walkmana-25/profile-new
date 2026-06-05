import type { Route } from "./+types/media";
import { MediaPage } from "~/media/MediaPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Media | Y.Takahashi" },
  ];
}

export default function Media() {
  return <MediaPage />;
}
