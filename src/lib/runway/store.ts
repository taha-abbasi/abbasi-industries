import { NS, hasKv, kv } from "./kv";
import { normalise, clone, SEED } from "./model";
import type { RunwayModel } from "./types";

const MODEL_KEY = `${NS}model`;

/**
 * One shared model, so Taha and Asad see the same figures.
 * With no store configured the page still works — it just shows the seed
 * and says it cannot remember edits.
 */
export async function loadModel(): Promise<{ model: RunwayModel; persisted: boolean }> {
  if (!hasKv()) return { model: clone(SEED), persisted: false };
  const stored = await kv().get<RunwayModel>(MODEL_KEY);
  if (!stored) return { model: clone(SEED), persisted: true };
  return { model: normalise(stored), persisted: true };
}

export async function saveModel(input: unknown): Promise<RunwayModel> {
  const model = normalise(input as Partial<RunwayModel>);
  if (!hasKv()) return model;
  await kv().set(MODEL_KEY, model);
  return model;
}

/* ---------------------------------------------------------------- lockout */

const attemptKey = (ip: string) => `${NS}attempts:${ip}`;
const lockKey = (ip: string) => `${NS}lock:${ip}`;

export async function isLockedOut(ip: string): Promise<boolean> {
  if (!hasKv()) return false;
  return Boolean(await kv().get(lockKey(ip)));
}

export async function attemptsUsed(ip: string): Promise<number> {
  if (!hasKv()) return 0;
  return Number((await kv().get<number>(attemptKey(ip))) ?? 0);
}

/** Returns true when this failure tripped the lockout. */
export async function recordFailure(ip: string, max: number, lockMinutes: number): Promise<boolean> {
  if (!hasKv()) return false;
  const count = await kv().incr(attemptKey(ip));
  await kv().expire(attemptKey(ip), lockMinutes * 60);
  if (count >= max) {
    await kv().set(lockKey(ip), 1, { ex: lockMinutes * 60 });
    await kv().del(attemptKey(ip));
    return true;
  }
  return false;
}

export async function clearFailures(ip: string): Promise<void> {
  if (!hasKv()) return;
  await kv().del(attemptKey(ip), lockKey(ip));
}
