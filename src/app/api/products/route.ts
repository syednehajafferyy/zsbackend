import { route, handleOptions } from "@/lib/http";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const OPTIONS = handleOptions;
export const GET = route(async (req) => {
  const cat = req.nextUrl.searchParams.get("category");
  return db.product.findMany({
    where: { published: true, ...(cat ? { category: { slug: cat } } : {}) },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
});
