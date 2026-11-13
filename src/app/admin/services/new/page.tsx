/**
 * Admin: create new service form (Executive Light theme).
 */
import Link from "next/link";
import { upsertServiceAction } from "../actions";
import { ServiceFormFields } from "../service-form-fields";

export const metadata = { title: "New Service" };

export default function NewServicePage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/admin/services" className="text-xs font-semibold text-[#b39149] hover:underline">
          ← Back to Services
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900 mt-2">New Service</h1>
      </div>
      <form
        action={upsertServiceAction}
        className="rounded-xl bg-white border border-slate-200/80 shadow-sm p-6 space-y-5"
      >
        <input type="hidden" name="id" value="" />
        <ServiceFormFields />
        <div className="flex gap-3 pt-2 border-t border-slate-200">
          <button type="submit" className="admin-btn-primary">Create Service</button>
          <Link href="/admin/services" className="admin-btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
