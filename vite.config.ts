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
import { createRequestHandler } from "react-router";

// Let React Router handle route matching/data APIs from the server build.
const handler = createRequestHandler(build, "production");

// Create request handler for Cloudflare Workers
async function handleRequest(request, env, ctx) {
  // Expose Cloudflare bindings/utilities to loaders/actions via load context.
  const loadContext = {
    env,
    cf: request.cf,
    waitUntil: ctx.waitUntil.bind(ctx),
    passThroughOnException: ctx.passThroughOnException.bind(ctx),
  };

  try {
    return await handler(request, loadContext);
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