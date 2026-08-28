import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, verifySession } from "@/lib/runway/auth";

// Everything under /runway is private. The unlock page and its API are the
// only ways in, so they stay reachable; nothing else is served without a
// valid session cookie — including the API that holds the figures.
const OPEN = ["/runway/unlock", "/api/runway/unlock"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (OPEN.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const ok = await verifySession(
    req.cookies.get(COOKIE)?.value,
    process.env.RUNWAY_SECRET ?? ""
  );
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/runway/unlock";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/runway/:path*", "/api/runway/:path*"] };
