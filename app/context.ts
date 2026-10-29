import { createContext } from "react-router";

export interface CloudflareLoadContext {
  env: unknown;
  ctx: unknown;
  cf: unknown;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
}

export const cloudflareContext = createContext<CloudflareLoadContext>();
