import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/projects", "routes/projects.tsx", [
    route(":slug", "routes/projects.$slug.tsx"),
  ]),
  route("/contact", "routes/contact.tsx"),
  route("/apps", "routes/apps.tsx", [
    route(":slug", "routes/apps.$slug.tsx"),
  ]),
] satisfies RouteConfig;
