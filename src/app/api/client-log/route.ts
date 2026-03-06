import { NextRequest, NextResponse } from "next/server";

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value.length > 300 ? `${value.slice(0, 300)}...` : value;
  }
  return value;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = {
      ts: new Date().toISOString(),
      source: typeof body?.source === "string" ? body.source : "unknown",
      event: typeof body?.event === "string" ? body.event : "unknown",
      session_id:
        typeof body?.session_id === "string" ? body.session_id : "unknown",
      data:
        body?.data && typeof body.data === "object"
          ? Object.fromEntries(
              Object.entries(body.data as Record<string, unknown>).map(
                ([k, v]) => [k, sanitizeValue(v)],
              ),
            )
          : {},
    };
    console.info("[client-diag]", JSON.stringify(payload));
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
