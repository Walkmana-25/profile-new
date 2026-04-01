import type { Route } from "./+types/about";
import { AboutPage } from "~/about/AboutPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | Y.Takahashi" },
  ];
}

export default function About() {
  return <AboutPage />;
}
