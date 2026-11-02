import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#25291F] px-6 py-12 md:py-20 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-8">
        <header className="border-b border-[#EAE2D0] pb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#1F3D2B]">
              Zaheer Seed Corporation
            </h1>
            <p className="text-sm text-[#6B7340] mt-1 font-mono">
              Backend Service &amp; REST API
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1F3D2B]/10 text-[#1F3D2B]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Operational
          </span>
        </header>

        <section className="bg-white border border-[#EAE2D0] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-xl font-semibold text-[#1F3D2B]">
            Admin Control Panel
          </h2>
          <p className="text-sm text-[#5A4A38]">
            Manage crop seed catalog, categories, incoming inquiries, and cart orders.
          </p>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="inline-block bg-[#1F3D2B] hover:bg-[#6B7340] text-[#FAF7F0] px-5 py-2.5 rounded-lg text-sm font-medium transition"
            >
              Open Admin Dashboard &rarr;
            </Link>
            <Link
              href="/admin/login"
              className="inline-block border border-[#1F3D2B] text-[#1F3D2B] hover:bg-[#FAF7F0] px-5 py-2.5 rounded-lg text-sm font-medium transition"
            >
              Admin Sign In
            </Link>
          </div>
        </section>

        <section className="bg-white border border-[#EAE2D0] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-xl font-semibold text-[#1F3D2B]">
            Public API Endpoints
          </h2>
          <p className="text-sm text-[#5A4A38]">
            Endpoints consumed by the frontend client:
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 bg-[#FAF7F0] rounded-lg border border-[#EAE2D0]">
              <span className="font-semibold text-emerald-800">GET /api/categories</span>
              <span className="text-gray-500">Seed categories list</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-[#FAF7F0] rounded-lg border border-[#EAE2D0]">
              <span className="font-semibold text-emerald-800">GET /api/products</span>
              <span className="text-gray-500">Published seed products</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-[#FAF7F0] rounded-lg border border-[#EAE2D0]">
              <span className="font-semibold text-emerald-800">GET /api/products/[slug]</span>
              <span className="text-gray-500">Single seed details</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-[#FAF7F0] rounded-lg border border-[#EAE2D0]">
              <span className="font-semibold text-blue-800">POST /api/inquiries</span>
              <span className="text-gray-500">Submit inquiry or order request</span>
            </div>
          </div>
        </section>

        <footer className="text-center text-xs text-[#5A4A38] pt-4">
          &copy; 2026 Zaheer Seed Corporation. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

