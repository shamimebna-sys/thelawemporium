/**
 * Admin: list and edit page sections (Executive Light theme).
 */
import { Pencil } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Page Sections" };
export const dynamic = "force-dynamic";

export default async function AdminSectionsPage() {
  const sections = await prisma.pageSection.findMany({
    orderBy: [{ pageSlug: "asc" }, { order: "asc" }],
  });

  const byPage: Record<string, typeof sections> = {};
  for (const s of sections) {
    if (!byPage[s.pageSlug]) byPage[s.pageSlug] = [];
    byPage[s.pageSlug].push(s);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#b39149] font-bold">
          Editorial Blocks
        </p>
        <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
          Page Sections
        </h1>
        <p className="text-sm text-slate-600 mt-0.5">
          Edit bilingual homepage intro & feature story blocks
        </p>
      </div>

      {Object.entries(byPage).map(([page, items]) => (
        <section key={page} className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#b39149] border-b border-slate-200 pb-2">
            {page}
          </h2>
          <div className="rounded-xl bg-white border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
            {items.map((sec) => (
              <div
                key={sec.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/70 transition-colors"
              >
                <span className="text-xs font-black text-[#b39149] w-6 shrink-0">
                  {sec.badgeNumber ?? "—"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-neutral-900">{sec.titleEn}</p>
                  <p className="text-xs text-slate-600 mt-0.5 truncate">{sec.contentEn}</p>
                </div>
                <Link
                  href={`/admin/sections/${sec.id}`}
                  className="admin-btn-secondary py-1.5 px-3 text-[11px]"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
