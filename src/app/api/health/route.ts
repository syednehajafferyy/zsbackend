import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { handleOptions } from "@/lib/http";

export const dynamic = "force-dynamic";
export const OPTIONS = handleOptions;

export async function GET() {
  let dbStatus = "connected";
  try {
    await db.$queryRaw`SELECT 1`;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Database connection check failed in /api/health:", message);
    dbStatus = "not connected";
  }

  return NextResponse.json({
    status: "ok",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
}

