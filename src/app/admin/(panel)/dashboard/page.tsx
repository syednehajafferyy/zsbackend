import { db } from "@/lib/db";
export default async function Dash() {
  const [a, b, c, d] = await Promise.all([db.product.count(), db.product.count({ where: { published: true } }), db.inquiry.count(), db.inquiry.count({ where: { status: "PENDING" } })]);
  const s: [string, number][] = [["Total products", a], ["Published products", b], ["Total inquiries", c], ["Pending inquiries", d]];
  return (<><h1 className="font-display text-3xl text-forest">Dashboard</h1><dl className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">{s.map(([l, n]) => <div key={l} className="bg-white border border-sand p-5"><dt className="text-sm text-soil">{l}</dt><dd className="font-display text-3xl mt-1">{n}</dd></div>)}</dl></>);
}
