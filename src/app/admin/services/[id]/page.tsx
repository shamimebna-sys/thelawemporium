/**
 * Admin: edit an existing service (Executive Light theme).
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { upsertServiceAction } from "../actions";
import { ServiceFormFields } from "../service-form-fields";

export const metadata = { title: "Edit Service" };
export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const svc = await prisma.service.findUnique({ where: { id } });
  if (!svc) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/admin/services" className="text-xs font-semibold text-[#b39149] hover:underline">
          ← Back to Services
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900 mt-2">Edit Service</h1>
        <p className="text-sm text-slate-600">/{svc.slug}</p>
      </div>
      <form
        action={upsertServiceAction}
        className="rounded-xl bg-white border border-slate-200/80 shadow-sm p-6 space-y-5"
      >
        <input type="hidden" name="id" value={svc.id} />
        <ServiceFormFields defaults={svc as unknown as Record<string, string | number>} />
        <div className="flex gap-3 pt-2 border-t border-slate-200">
          <button type="submit" className="admin-btn-primary">Save Changes</button>
          <Link href="/admin/services" className="admin-btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
