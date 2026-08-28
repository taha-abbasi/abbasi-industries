import { NextResponse } from "next/server";
import { loadModel, saveModel } from "@/lib/runway/store";

// Reached only through the middleware gate, so a valid session already exists.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { model, persisted } = await loadModel();
    return NextResponse.json({ model, persisted });
  } catch {
    return NextResponse.json({ error: "load-failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const model = await saveModel(body?.model);
    return NextResponse.json({ model, saved: true });
  } catch {
    return NextResponse.json({ error: "save-failed" }, { status: 500 });
  }
}
