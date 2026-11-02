import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionAdminId } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";
export const dynamic = "force-dynamic";
export default async function Panel({ children }: { children: React.ReactNode }) {
  if (!(await getSessionAdminId())) redirect("/admin/login");
  return (<div className="min-h-screen"><header className="border-b border-sand bg-white px-4 md:px-8 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
    <span className="font-display text-forest">Admin</span>
    <nav className="flex flex-wrap gap-4 text-sm flex-1" aria-label="Admin">{["dashboard", "products", "categories", "inquiries"].map(s => <Link key={s} href={`/admin/${s}`} className="navlink capitalize">{s}</Link>)}</nav>
    <SignOutButton /></header><div className="p-4 md:p-8 max-w-5xl">{children}</div></div>);
}
