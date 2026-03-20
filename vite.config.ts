import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

// Custom plugin to generate Cloudflare Worker compatible entry
function cloudflareWorkerEntry() {
  return {
    name: "cloudflare-worker-entry",
    writeBundle(options: any) {
      // Only process the SSR build
      if (!options.dir?.includes("server")) return;

      const workerPath = join(options.dir, "worker.js");

      try {
        // Create a Cloudflare Worker wrapper that bridges React Router to Cloudflare Workers
        const workerContent = `
import * as build from "./index.js";

// Create request handler for Cloudflare Workers
async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const routeId = "root";

  // Create the entry context for React Router
  // serverManifest is exported as "assets"
  const entryContext = {
    manifest: build.assets,
    routeModules: build.routes,
    staticHandlerContext: {
      loaderData: {},
      actionData: null,
      errors: null,
      statusCode: 200,
      loaderHeaders: {},
      actionHeaders: {},
      activeRouteId: null,
      isSpaMode: false
    },
    router: null,
    routeId
  };

  // Create load context with Cloudflare bindings
  const loadContext = {
    env,
    cf: request.cf,
    waitUntil: ctx.waitUntil.bind(ctx),
  };

  // Call the handleRequest from entry.server
  try {
    const response = await build.entry.module.default(
      request,
      200,
      new Headers({
        "Content-Type": "text/html; charset=UTF-8"
      }),
      entryContext,
      loadContext
    );
    return response;
  } catch (error) {
    console.error("Request handler error:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}

// Export Cloudflare Worker fetch handler
export default {
  fetch: handleRequest
};
`;

        writeFileSync(workerPath, workerContent);
        console.log("✓ Created Cloudflare Worker entry file");
      } catch (e) {
        console.error("Failed to create Cloudflare Worker entry:", e);
      }
    },
  };
}

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), cloudflareWorkerEntry()],
});