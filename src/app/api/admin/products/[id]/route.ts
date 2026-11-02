import { z } from "zod";
import { del } from "@vercel/blob";
import { route } from "@/lib/http";
import { db } from "@/lib/db";
import { saveProduct } from "@/lib/products";
export const PUT = route(async (req, { params }) => ({ ok: true, id: (await saveProduct(await req.formData(), params.id)).id }), { admin: true });
export const PATCH = route(async (req, { params }) => {
  const { published } = z.object({ published: z.boolean() }).parse(await req.json());
  await db.product.update({ where: { id: params.id }, data: { published } }); return { ok: true };
}, { admin: true });
export const DELETE = route(async (_req, { params }) => {
  const p = await db.product.delete({ where: { id: params.id } });
  if (p.image) await del(p.image).catch(() => {});
  return { ok: true };
}, { admin: true });
