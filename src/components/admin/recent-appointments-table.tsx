"use client";
/**
 * Recent Appointments table with quick inline status updates + Sonner toast feedback (Light theme).
 */
import { Check, Clock, X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { setAppointmentStatusAction } from "@/app/admin/appointments/actions";

export type AppointmentRow = {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  preferredTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
};

const BADGE: Record<AppointmentRow["status"], string> = {
  PENDING: "bg-amber-50 text-amber-800 border-amber-200",
  CONFIRMED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
};

export function RecentAppointmentsTable({ appointments }: { appointments: AppointmentRow[] }) {
  const [isPending, startTransition] = useTransition();

  function updateStatus(id: string, status: AppointmentRow["status"]) {
    startTransition(async () => {
      const res = await setAppointmentStatusAction(id, status);
      if (res.ok) {
        toast.success(`Appointment marked ${status.toLowerCase()}`);
      } else {
        toast.error(res.error ?? "Failed to update appointment");
      }
    });
  }

  if (appointments.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-sm text-slate-500">
        No appointment inquiries yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {["Client", "Contact", "Preferred Time", "Status", "Submitted", "Quick Action"].map((h) => (
              <th
                key={h}
                className="text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 px-5 py-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr
              key={appt.id}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors"
            >
              <td className="px-5 py-3.5">
                <p className="font-semibold text-neutral-900">{appt.name}</p>
                <p className="text-xs text-slate-500">{appt.email}</p>
              </td>
              <td className="px-5 py-3.5 text-slate-700 text-xs">{appt.contactNumber}</td>
              <td className="px-5 py-3.5 text-slate-700 text-xs max-w-[200px] truncate">
                {appt.preferredTime}
              </td>
              <td className="px-5 py-3.5">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${BADGE[appt.status]}`}
                >
                  {appt.status}
                </span>
              </td>
              <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                {new Date(appt.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-1.5">
                  {appt.status !== "CONFIRMED" ? (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => updateStatus(appt.id, "CONFIRMED")}
                      title="Confirm"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      <Check className="w-3 h-3" /> Confirm
                    </button>
                  ) : null}
                  {appt.status !== "PENDING" ? (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => updateStatus(appt.id, "PENDING")}
                      title="Mark Pending"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                    >
                      <Clock className="w-3 h-3" /> Pending
                    </button>
                  ) : null}
                  {appt.status !== "CANCELLED" ? (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => updateStatus(appt.id, "CANCELLED")}
                      title="Cancel"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" /> Cancel
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
