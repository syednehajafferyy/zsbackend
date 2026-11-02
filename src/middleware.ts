import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
// Guards every /admin page except the login page. API routes also check the session themselves.
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  try {
    await jwtVerify(req.cookies.get("zsc_session")?.value ?? "", new TextEncoder().encode(process.env.AUTH_SECRET));
    return NextResponse.next();
  } catch { return NextResponse.redirect(new URL("/admin/login", req.url)); }
}
export const config = { matcher: ["/admin/:path*"] };
