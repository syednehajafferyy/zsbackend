"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { send } from "@/lib/api.client";
import type { Category } from "@/lib/types";
export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter(); const [err, setErr] = useState(""); const i = "border border-sand bg-white px-3 py-2";
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; setErr("");
    const body = Object.fromEntries(new FormData(form));
    const r = category ? await send(`/api/admin/categories/${category.id}`, "PUT", body) : await send("/api/admin/categories", "POST", body);
    if (r.ok) { if (!category) form.reset(); router.refresh(); } else setErr(r.error);
  }
  return (<form onSubmit={onSubmit} className="flex flex-wrap gap-2 flex-1">
    <input name="name" required defaultValue={category?.name} placeholder="Category name" className={i} />
    <input name="description" defaultValue={category?.description ?? ""} placeholder="Description" className={`${i} flex-1`} />
    <button className={category ? "underline" : "bg-forest text-paper px-4"}>{category ? "Save changes" : "Add category"}</button>
    {err && <span role="alert" className="text-sm text-red-800 basis-full">{err}</span>}</form>);
}
