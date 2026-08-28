import { Redis } from "@upstash/redis";

// ─────────────────────────────────────────────────────────────────────────────
// Vercel KV (Upstash Redis) — the store Taha already runs, wired the same way
// as tahaabbasi-website: KV_REST_API_URL + KV_REST_API_TOKEN.
//
// Every key this app touches is namespaced under `runway:` so it cannot
// collide with anything else sharing the same store.
// ─────────────────────────────────────────────────────────────────────────────

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const NS = "runway:";
export const hasKv = () => Boolean(url && token);

let client: Redis | null = null;

export function kv(): Redis {
  if (!url || !token) throw new Error("KV is not configured.");
  if (!client) client = new Redis({ url, token });
  return client;
}
