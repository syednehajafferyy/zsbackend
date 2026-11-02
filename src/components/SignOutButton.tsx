"use client";
import { useRouter } from "next/navigation";
import { send } from "@/lib/api.client";
export default function SignOutButton() {
  const router = useRouter();
  return <button className="text-sm underline" onClick={async () => { await send("/api/auth/logout", "POST"); router.push("/admin/login"); router.refresh(); }}>Sign out</button>;
}
