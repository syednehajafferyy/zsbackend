import { db } from "@/lib/db";
import ActionButton from "@/components/ActionButton";
const st = ["PENDING", "READ", "RESOLVED"] as const;
export default async function Inq() {
  const list = await db.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return (<><h1 className="font-display text-3xl text-forest">Inquiries</h1>{list.length === 0 && <p className="mt-8 text-soil">No inquiries yet.</p>}
    <ul className="mt-6 grid gap-3">{list.map(q => (<li key={q.id} className="bg-white border border-sand"><details><summary className="p-4 cursor-pointer flex flex-wrap justify-between gap-2"><span><strong>{q.subject}</strong> from {q.name}</span><span className="text-sm text-soil">{q.status.toLowerCase()} | {q.createdAt.toLocaleDateString("en-GB")}</span></summary>
      <div className="px-4 pb-4 grid gap-3"><p className="whitespace-pre-line">{q.message}</p><p className="text-sm text-soil">{q.email} | {q.phone}</p>
        <div className="flex flex-wrap gap-4 text-sm">{st.map(s => <ActionButton key={s} url={`/api/admin/inquiries/${q.id}`} method="PATCH" body={{ status: s }} label={`Mark ${s.toLowerCase()}`} disabled={q.status === s} />)}
          <ActionButton url={`/api/admin/inquiries/${q.id}`} method="DELETE" label="Delete" danger confirmText="Delete this inquiry?" /></div></div></details></li>))}</ul></>);
}
