import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAdminId } from "./auth";

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

type Ctx = { params: Record<string, string> };
type Fn = (req: NextRequest, ctx: Ctx) => Promise<Response | object>;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

export const handleOptions = () => new NextResponse(null, { status: 204, headers: corsHeaders });

/** Wraps a route handler: optional admin check, JSON output, uniform error handling. */
export const route = (fn: Fn, opts: { admin?: boolean } = {}) => async (req: NextRequest, ctx: Ctx) => {
  try {
    if (opts.admin && !(await getAdminId(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }
    const r = await fn(req, ctx);
    const res = r instanceof Response ? r : NextResponse.json(r);
    Object.entries(corsHeaders).forEach(([k, v]) => res.headers.set(k, v));
    return res;
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        { error: "Please check the highlighted fields.", fields: e.flatten().fieldErrors },
        { status: 400, headers: corsHeaders }
      );
    }
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status, headers: corsHeaders });
    }
    const code = (e as { code?: string }).code;
    if (code === "P2002") {
      return NextResponse.json({ error: "That name already exists." }, { status: 409, headers: corsHeaders });
    }
    if (code === "P2025") {
      return NextResponse.json({ error: "Not found." }, { status: 404, headers: corsHeaders });
    }
    console.error(e);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500, headers: corsHeaders });
  }
};

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
