import { z } from "zod";
import { route, slugify } from "@/lib/http";
import { db } from "@/lib/db";
const catSchema = z.object({ name: z.string().trim().min(2).max(80), description: z.string().trim().max(300).optional() });
export const POST = route(async (req) => {
  const d = catSchema.parse(await req.json().catch(() => ({})));
  await db.category.create({ data: { name: d.name, slug: slugify(d.name), description: d.description || null } }); return { ok: true };
}, { admin: true });
