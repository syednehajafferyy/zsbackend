import { z } from "zod";
import { route } from "@/lib/http";
import { db } from "@/lib/db";
export const PATCH = route(async (req, { params }) => {
  const { status } = z.object({ status: z.enum(["PENDING", "READ", "RESOLVED"]) }).parse(await req.json().catch(() => ({})));
  await db.inquiry.update({ where: { id: params.id }, data: { status } }); return { ok: true };
}, { admin: true });
export const DELETE = route(async (_req, { params }) => { await db.inquiry.delete({ where: { id: params.id } }); return { ok: true }; }, { admin: true });
