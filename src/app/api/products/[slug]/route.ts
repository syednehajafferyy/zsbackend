import { route, HttpError, handleOptions } from "@/lib/http";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const OPTIONS = handleOptions;
export const GET = route(async (_req, { params }) => {
  const p = await db.product.findFirst({
    where: { slug: params.slug, published: true },
    include: { category: true },
  });
  if (!p) throw new HttpError(404, "Product not found.");
  return p;
});
