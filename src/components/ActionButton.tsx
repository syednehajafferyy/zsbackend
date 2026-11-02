"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { send } from "@/lib/api.client";
export default function ActionButton({ url, method, body, label, confirmText, danger, disabled }: { url: string; method: "POST" | "PUT" | "PATCH" | "DELETE"; body?: unknown; label: string; confirmText?: string; danger?: boolean; disabled?: boolean }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  async function go() {
    if (confirmText && !confirm(confirmText)) return;
    setBusy(true); setErr(""); const r = await send(url, method, body); setBusy(false);
    if (r.ok) router.refresh(); else setErr(r.error);
  }
  return (<span><button type="button" onClick={go} disabled={busy || disabled} className={`underline disabled:no-underline disabled:text-soil ${danger ? "text-red-800" : ""}`}>{label}</button>
    {err && <span role="alert" className="ml-2 text-sm text-red-800">{err}</span>}</span>);
}
