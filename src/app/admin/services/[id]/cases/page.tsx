/**
 * Admin: manage cases for a specific service.
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { prisma } from "@/lib/prisma";
import { addCaseAction, deleteCaseAction } from "./case-actions";

export const metadata = { title: "Service Cases" };

export default async function ServiceCasesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const svc = await prisma.service.findUnique({
    where: { id },
    include: { cases: { orderBy: { order: "asc" } } },
  });
  if (!svc) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/services" className="text-xs text-neutral-400 hover:text-black">← Services</Link>
        <h1 className="text-2xl font-extrabold text-neutral-900 mt-1">Cases: {svc.titleEn}</h1>
        <p className="text-sm text-neutral-500">{svc.cases.length} cases</p>
      </div>

      {/* Existing cases */}
      {svc.cases.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-8">
          {svc.cases.map((c, idx) => (
            <div
              key={c.id}
              className={`flex items-start gap-4 px-5 py-4 ${idx < svc.cases.length - 1 ? "border-b border-neutral-100" : ""}`}
            >
              <span className="text-xs font-black text-neutral-300 w-6 shrink-0 mt-0.5">
                {String(c.caseNumber).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900">{c.titleEn}</p>
                <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">{c.descriptionEn}</p>
                {c.newsLink && (
                  <a href={c.newsLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mt-0.5 block">
                    News Link
                  </a>
                )}
              </div>
              <form action={deleteCaseAction}>
                <input type="hidden" name="caseId" value={c.id} />
                <input type="hidden" name="serviceId" value={svc.id} />
                <AdminDeleteButton
                  confirmMessage="Delete this case?"
                  className="text-xs text-red-400 hover:text-red-600 border border-red-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                />
              </form>
            </div>
          ))}
        </div>
      )}

      {/* Add new case */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-neutral-700 mb-4">Add New Case</h2>
        <form action={addCaseAction} className="space-y-4">
          <input type="hidden" name="serviceId" value={svc.id} />
          <input type="hidden" name="caseNumber" value={svc.cases.length + 1} />
          <input type="hidden" name="order" value={svc.cases.length} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Title (English)</label>
              <input name="titleEn" className="admin-input" placeholder="State versus..." required />
            </div>
            <div>
              <label className="admin-label">Title (Bangla)</label>
              <input name="titleBn" className="admin-input" placeholder="State versus..." />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Description (English)</label>
              <textarea name="descriptionEn" rows={3} className="admin-input text-xs" required />
            </div>
            <div>
              <label className="admin-label">Description (Bangla)</label>
              <textarea name="descriptionBn" rows={3} className="admin-input text-xs" />
            </div>
          </div>
          <div>
            <label className="admin-label">News Link (optional)</label>
            <input name="newsLink" type="url" className="admin-input" placeholder="https://..." />
          </div>
          <button type="submit" className="admin-btn-primary">Add Case</button>
        </form>
      </div>
    </div>
  );
}
