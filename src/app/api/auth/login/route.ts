import { NextResponse } from "next/server";
import { z } from "zod";
import { route, HttpError } from "@/lib/http";
import { verifyLogin, setSession } from "@/lib/auth";
const body = z.object({ email: z.string().email(), password: z.string().min(1).max(200) });
const tries = new Map<string, { n: number; t: number }>(); // best-effort throttle per server instance
export const POST = route(async (req) => {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown", now = Date.now(), e = tries.get(ip);
  const live = e && now - e.t < 600000 ? e : undefined;
  if (live && live.n >= 8) throw new HttpError(429, "Too many attempts. Please try again in a few minutes.");
  const { email, password } = body.parse(await req.json().catch(() => ({})));
  const admin = await verifyLogin(email, password);
  if (!admin) { tries.set(ip, { n: (live?.n ?? 0) + 1, t: live?.t ?? now }); throw new HttpError(401, "Email or password is incorrect."); }
  tries.delete(ip);
  const res = NextResponse.json({ ok: true }); await setSession(res, admin.id); return res;
});
