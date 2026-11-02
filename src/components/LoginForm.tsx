"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { send } from "@/lib/api.client";
export default function LoginForm() {
  const router = useRouter(); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const r = await send("/api/auth/login", "POST", Object.fromEntries(new FormData(e.currentTarget)));
    setBusy(false);
    if (r.ok) { router.push("/admin/dashboard"); router.refresh(); } else setErr(r.status === 401 ? "Email or password is incorrect." : r.error);
  }
  return (<form onSubmit={onSubmit} className="w-full max-w-sm grid gap-4">
    <h1 className="font-display text-2xl">Admin sign in</h1>
    <input name="email" type="email" required placeholder="Email" autoComplete="username" className="border border-sand px-3 py-2" />
    <input name="password" type="password" required placeholder="Password" autoComplete="current-password" className="border border-sand px-3 py-2" />
    {err && <p role="alert" className="text-red-800">{err}</p>}
    <button disabled={busy} className="bg-forest text-paper py-3 disabled:opacity-60">{busy ? "Signing in" : "Sign in"}</button></form>);
}
