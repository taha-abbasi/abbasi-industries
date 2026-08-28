import { NextResponse } from "next/server";
import { COOKIE, SESSION_HOURS, signSession, timingSafeEqual } from "@/lib/runway/auth";
import { collection, hasDb } from "@/lib/runway/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

type Attempt = { _id: string; count: number; until: Date | null; at: Date };

/** A four-digit PIN is only 10,000 guesses, so throttle by client. */
async function checkLock(ip: string) {
  if (!hasDb()) return { locked: false, remaining: MAX_ATTEMPTS };
  const col = await collection<Attempt>("attempts");
  const doc = await col.findOne({ _id: ip });
  if (doc?.until && doc.until.getTime() > Date.now()) {
    return { locked: true, remaining: 0, until: doc.until };
  }
  return { locked: false, remaining: MAX_ATTEMPTS - (doc?.count ?? 0) };
}

async function recordFailure(ip: string) {
  if (!hasDb()) return;
  const col = await collection<Attempt>("attempts");
  const doc = await col.findOne({ _id: ip });
  const count = (doc?.count ?? 0) + 1;
  const until = count >= MAX_ATTEMPTS ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000) : null;
  await col.updateOne(
    { _id: ip },
    { $set: { count: until ? 0 : count, until, at: new Date() } },
    { upsert: true }
  );
  return until;
}

async function clearFailures(ip: string) {
  if (!hasDb()) return;
  const col = await collection<Attempt>("attempts");
  await col.deleteOne({ _id: ip });
}

export async function POST(req: Request) {
  const pin = String(process.env.RUNWAY_PIN ?? "");
  const secret = String(process.env.RUNWAY_SECRET ?? "");
  if (!pin || !secret) {
    return NextResponse.json({ error: "not-configured" }, { status: 500 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const lock = await checkLock(ip);
  if (lock.locked) {
    return NextResponse.json(
      { error: "locked-out", minutes: LOCKOUT_MINUTES },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const supplied = String(body?.pin ?? "");

  if (!timingSafeEqual(supplied, pin)) {
    const until = await recordFailure(ip);
    return NextResponse.json(
      until
        ? { error: "locked-out", minutes: LOCKOUT_MINUTES }
        : { error: "wrong-pin", remaining: Math.max(0, lock.remaining - 1) },
      { status: until ? 429 : 401 }
    );
  }

  await clearFailures(ip);
  const expiresAt = Date.now() + SESSION_HOURS * 3600_000;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await signSession(expiresAt, secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
  return res;
}
