import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Custom plugin to generate Cloudflare Worker compatible entry
function cloudflareWorkerEntry() {
  return {
    name: "cloudflare-worker-entry",
    writeBundle(options: any) {
      // Only process the SSR build
      if (!options.dir?.includes("server")) return;

      const indexPath = join(options.dir, "index.js");
      const workerPath = join(options.dir, "worker.js");

      try {
        // Create a Cloudflare Worker wrapper
        const workerContent = `
import { createCloudflareRequestHandler } from "@react-router/cloudflare";
import * as build from "./index.js";

// Create the request handler
const handler = createCloudflareRequestHandler(build);

// Export Cloudflare Worker fetch handler
export default {
  async fetch(request, env, ctx) {
    return handler(request, env);
  },
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
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), cloudflareWorkerEntry()],
});