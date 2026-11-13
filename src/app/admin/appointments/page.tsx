/**
 * Admin: view and manage appointment submissions (Executive Light theme).
 */
import Link from "next/link";
import { RecentAppointmentsTable } from "@/components/admin/recent-appointments-table";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Appointments" };
export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const statusFilter = sp.status as "PENDING" | "CONFIRMED" | "CANCELLED" | undefined;
  const q = sp.q?.trim() ?? "";

  const appointments = await prisma.appointment.findMany({
    where: {
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { contactNumber: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b39149] font-bold">
            Client Inquiries
          </p>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
            Appointments
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">{appointments.length} matching records</p>
        </div>
      </div>

      {/* Filters */}
      <form method="GET" className="flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, email, phone…"
          className="admin-input max-w-xs"
        />
        <select
          name="status"
          defaultValue={statusFilter ?? ""}
          className="admin-input max-w-[180px]"
        >
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <button type="submit" className="admin-btn-primary">
          Filter
        </button>
        {(q || statusFilter) ? (
          <Link href="/admin/appointments" className="admin-btn-secondary">
            Clear
          </Link>
        ) : null}
      </form>

      {/* Table */}
      <div className="rounded-xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <RecentAppointmentsTable
          appointments={appointments.map((a) => ({
            id: a.id,
            name: a.name,
            contactNumber: a.contactNumber,
            email: a.email,
            preferredTime: a.preferredTime,
            status: a.status,
            createdAt: a.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
