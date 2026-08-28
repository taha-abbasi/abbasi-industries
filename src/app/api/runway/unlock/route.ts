import { NextResponse } from "next/server";
import { COOKIE, SESSION_HOURS, signSession, timingSafeEqual } from "@/lib/runway/auth";
import { attemptsUsed, clearFailures, isLockedOut, recordFailure } from "@/lib/runway/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

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

  if (await isLockedOut(ip)) {
    return NextResponse.json({ error: "locked-out", minutes: LOCKOUT_MINUTES }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const supplied = String(body?.pin ?? "");

  if (!timingSafeEqual(supplied, pin)) {
    const tripped = await recordFailure(ip, MAX_ATTEMPTS, LOCKOUT_MINUTES);
    if (tripped) {
      return NextResponse.json({ error: "locked-out", minutes: LOCKOUT_MINUTES }, { status: 429 });
    }
    const remaining = Math.max(0, MAX_ATTEMPTS - (await attemptsUsed(ip)));
    return NextResponse.json({ error: "wrong-pin", remaining }, { status: 401 });
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
