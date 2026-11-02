import { NextResponse } from "next/server";
import { route } from "@/lib/http";
import { clearSession } from "@/lib/auth";
export const POST = route(async () => { const res = NextResponse.json({ ok: true }); clearSession(res); return res; });
