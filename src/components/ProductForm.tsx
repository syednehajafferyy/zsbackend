"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { send } from "@/lib/api.client";
import type { Category, Product } from "@/lib/types";
export default function ProductForm({ product, categories }: { product?: Product; categories: Category[] }) {
  const router = useRouter(); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const fd = new FormData(e.currentTarget);
    const r = product ? await send(`/api/admin/products/${product.id}`, "PUT", fd) : await send("/api/admin/products", "POST", fd);
    setBusy(false);
    if (r.ok) { router.push("/admin/products"); router.refresh(); } else setErr(r.error);
  }
  const i = "mt-1 w-full border border-sand bg-white px-3 py-2";
  return (<form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
    <label>Product name<input name="name" required defaultValue={product?.name} className={i} /></label>
    <label>Category<select name="categoryId" defaultValue={product?.categoryId ?? ""} className={i}><option value="">Uncategorised</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
    <label>Description<textarea name="description" required rows={6} defaultValue={product?.description} className={i} /></label>
    <label>Image{product?.image && <img src={product.image} alt="" className="h-24 my-2" />}<input name="file" type="file" accept="image/*" className={i} /></label>
    <label className="flex gap-2 items-center"><input name="published" type="checkbox" defaultChecked={product?.published} />Published</label>
    {err && <p role="alert" className="text-red-800">{err}</p>}
    <button disabled={busy} className="bg-forest text-paper py-3 disabled:opacity-60">{busy ? "Saving" : "Save product"}</button></form>);
}
