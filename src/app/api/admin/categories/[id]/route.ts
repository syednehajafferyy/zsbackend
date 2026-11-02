import { z } from "zod";
import { route, slugify } from "@/lib/http";
import { db } from "@/lib/db";
const catSchema = z.object({ name: z.string().trim().min(2).max(80), description: z.string().trim().max(300).optional() });
export const PUT = route(async (req, { params }) => {
  const d = catSchema.parse(await req.json().catch(() => ({})));
  await db.category.update({ where: { id: params.id }, data: { name: d.name, slug: slugify(d.name), description: d.description || null } }); return { ok: true };
}, { admin: true });
export const DELETE = route(async (_req, { params }) => { await db.category.delete({ where: { id: params.id } }); return { ok: true }; }, { admin: true });
