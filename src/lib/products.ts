import { z } from "zod";
import { put, del } from "@vercel/blob";
import { db } from "./db";
import { HttpError, slugify } from "./http";
const schema = z.object({ name: z.string().trim().min(2).max(120), description: z.string().trim().min(5).max(5000), categoryId: z.string().optional() });
/** Parses the multipart product form, uploads an image if present, and creates/updates the product. */
export async function saveProduct(fd: FormData, id?: string) {
  const p = schema.parse(Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string")));
  const old = id ? await db.product.findUnique({ where: { id } }) : null;
  if (id && !old) throw new HttpError(404, "Product not found.");
  let image = old?.image ?? null;
  const file = fd.get("file");
  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/") || file.size > 4_000_000) throw new HttpError(400, "Upload an image under 4 MB.");
    if (!process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN.startsWith("REPLACE")) throw new HttpError(503, "Image upload is not configured. Set BLOB_READ_WRITE_TOKEN on the backend.");
    image = (await put(`products/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`, file, { access: "public" })).url;
    if (old?.image) await del(old.image).catch(() => {});
  }
  const data = { name: p.name, description: p.description, image, published: fd.get("published") === "on" || fd.get("published") === "true", categoryId: p.categoryId || null };
  return old ? db.product.update({ where: { id }, data }) : db.product.create({ data: { ...data, slug: `${slugify(p.name)}-${Date.now().toString(36)}` } });
}
