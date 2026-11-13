/**
 * Admin: edit a single page section (Executive Light theme).
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSectionAction } from "./section-actions";

export const metadata = { title: "Edit Section" };
export const dynamic = "force-dynamic";

export default async function EditSectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sec = await prisma.pageSection.findUnique({ where: { id } });
  if (!sec) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/admin/sections" className="text-xs font-semibold text-[#b39149] hover:underline">
          ← Back to Page Sections
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900 mt-2">
          Edit: {sec.pageSlug} / {sec.sectionKey}
        </h1>
      </div>

      <form
        action={updateSectionAction}
        className="rounded-xl bg-white border border-slate-200/80 shadow-sm p-6 space-y-5"
      >
        <input type="hidden" name="id" value={sec.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Badge Number</label>
            <input name="badgeNumber" defaultValue={sec.badgeNumber ?? ""} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Sort Order</label>
            <input name="order" type="number" defaultValue={String(sec.order)} className="admin-input" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Title (English)</label>
            <input name="titleEn" defaultValue={sec.titleEn} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Title (Bangla)</label>
            <input name="titleBn" defaultValue={sec.titleBn} className="admin-input" />
          </div>
        </div>
        <div>
          <label className="admin-label">Content (English)</label>
          <textarea name="contentEn" rows={5} defaultValue={sec.contentEn} className="admin-input" />
        </div>
        <div>
          <label className="admin-label">Content (Bangla)</label>
          <textarea name="contentBn" rows={5} defaultValue={sec.contentBn} className="admin-input" />
        </div>
        <div className="flex gap-3 pt-2 border-t border-slate-200">
          <button type="submit" className="admin-btn-primary">
            Save Changes
          </button>
          <Link href="/admin/sections" className="admin-btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
