import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ProductForm from "@/components/ProductForm";
export default async function Edit({ params }: { params: { id: string } }) {
  const cats = await db.category.findMany({ orderBy: { name: "asc" } });
  const p = params.id === "new" ? null : await db.product.findUnique({ where: { id: params.id } });
  if (params.id !== "new" && !p) notFound();
  return (<><h1 className="font-display text-3xl text-forest mb-6">{p ? "Edit product" : "Add product"}</h1>
    <ProductForm categories={cats} product={p ? { id: p.id, name: p.name, slug: p.slug, description: p.description, image: p.image, published: p.published, categoryId: p.categoryId } : undefined} /></>);
}
