import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { db } from "./db";
export const COOKIE = "zsc_session";
function key() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32 || s.startsWith("REPLACE")) throw new Error("AUTH_SECRET is missing or still a placeholder (needs 32+ characters).");
  return new TextEncoder().encode(s);
}
let dummy: string | undefined; // valid hash used so unknown emails take similar time
export async function verifyLogin(email: string, password: string) {
  const admin = await db.admin.findUnique({ where: { email: email.toLowerCase().trim() } });
  dummy ??= await bcrypt.hash("not-a-real-password", 12);
  const ok = await bcrypt.compare(password, admin?.password ?? dummy);
  return admin && ok ? admin : null;
}
export async function setSession(res: NextResponse, adminId: string) {
  const token = await new SignJWT({}).setSubject(adminId).setProtectedHeader({ alg: "HS256" }).setExpirationTime("8h").sign(key());
  res.cookies.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 28800 });
}
export function clearSession(res: NextResponse) { res.cookies.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 }); }
async function check(t?: string) { if (!t) return null; try { return (await jwtVerify(t, key())).payload.sub ?? null; } catch { return null; } }
export const getAdminId = (req: NextRequest) => check(req.cookies.get(COOKIE)?.value);
export const getSessionAdminId = () => check(cookies().get(COOKIE)?.value);
