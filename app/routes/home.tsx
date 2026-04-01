import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio | Y.Takahashi" },
    { name: "description", content: "Welcome to my portfolio!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
