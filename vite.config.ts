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
import { createStaticHandler, createStaticRouter } from "react-router";

// Create static handler from routes
const handler = createStaticHandler(build.routes);

// Create request handler for Cloudflare Workers
async function handleRequest(request, env, ctx) {
  // Create load context with Cloudflare bindings
  const loadContext = {
    env,
    cf: request.cf,
    waitUntil: ctx.waitUntil.bind(ctx),
  };

  try {
    // Use React Router's static handler to properly handle the request
    const context = await handler.query(request, {
      requestContext: loadContext,
    });

    // If context is a Response, return it directly (e.g., redirects)
    if (context instanceof Response) {
      return context;
    }

    // Create static router with the context
    const router = createStaticRouter(build.routes, context);

    // Create the entry context for React Router
    const entryContext = {
      manifest: build.assets,
      routeModules: build.routes,
      staticHandlerContext: context,
      router,
      isSpaMode: false,
    };

    // Call the handleRequest from entry.server
    const response = await build.entry.module.default(
      request,
      context.statusCode || 200,
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