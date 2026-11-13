/**
 * Admin Dashboard Overview — Crisp Executive Light & Gold theme.
 * Shows stat widgets and Recent Appointments table with quick status actions.
 */
import {
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  Images,
  Newspaper,
  Scale,
  Users,
} from "lucide-react";
import Link from "next/link";
import { RecentAppointmentsTable } from "@/components/admin/recent-appointments-table";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    totalInquiries,
    pendingInquiries,
    totalServices,
    totalCases,
    pressItems,
    photoAssets,
    resourceItems,
    advocateCount,
    recentAppointments,
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: "PENDING" } }),
    prisma.service.count(),
    prisma.serviceCase.count(),
    prisma.mediaCoverage.count(),
    prisma.galleryItem.count(),
    prisma.resourceItem.count(),
    prisma.advocateProfile.count(),
    prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const stats = [
    {
      label: "Total Inquiries",
      value: totalInquiries,
      sub: `${pendingInquiries} pending review`,
      href: "/admin/appointments",
      icon: CalendarClock,
    },
    {
      label: "Total Services",
      value: totalServices,
      sub: `${totalCases} recorded cases`,
      href: "/admin/services",
      icon: Scale,
    },
    {
      label: "Press Items",
      value: pressItems,
      sub: `${resourceItems} legal resources`,
      href: "/admin/media",
      icon: Newspaper,
    },
    {
      label: "Photo Assets",
      value: photoAssets,
      sub: `${advocateCount} team advocates`,
      href: "/admin/photos",
      icon: Images,
    },
  ];

  const quickModules = [
    { href: "/admin/photos", title: "Photo Gallery", desc: "Court, Events & Office", icon: Images },
    { href: "/admin/media", title: "Press & Media", desc: "Print & Electronic outlets", icon: Newspaper },
    { href: "/admin/resources", title: "Resources", desc: "Research, Stories & PDFs", icon: BookOpen },
    { href: "/admin/we", title: "We / Advocates", desc: "Partners & Bar Council IDs", icon: Users },
    { href: "/admin/services", title: "Services & Cases", desc: "Inline drawers & case log", icon: Scale },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b39149] font-bold">
            Chambers Command Center
          </p>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Real-time snapshot across legal services, press coverage, resources, and client inquiries.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/admin/services" className="admin-btn-secondary">
            Manage Services
          </Link>
          <Link href="/admin/appointments" className="admin-btn-primary">
            View Inquiries
          </Link>
        </div>
      </div>

      {/* Stat Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#c5a869]/60 p-5 flex flex-col justify-between transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </span>
                <div className="h-9 w-9 rounded-xl bg-amber-50 border border-[#c5a869]/30 flex items-center justify-center text-[#b39149] group-hover:bg-neutral-900 group-hover:text-[#c5a869] transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-black text-neutral-900 tracking-tight">{stat.value}</p>
                <p className="text-xs font-medium text-[#b39149] mt-1 flex items-center gap-1">
                  <span>{stat.sub}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Module Shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {quickModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className="group rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-[#c5a869]/60 p-4 transition-all hover:shadow-md"
            >
              <Icon className="w-4 h-4 text-[#b39149] mb-2.5" />
              <p className="text-sm font-bold text-neutral-900 group-hover:text-[#b39149] transition-colors">
                {mod.title}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">{mod.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Appointments Table */}
      <section className="rounded-xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Recent Appointments</h2>
            <p className="text-xs text-slate-600">
              Latest consultation inquiries submitted through the public booking form
            </p>
          </div>
          <Link
            href="/admin/appointments"
            className="text-xs font-bold text-[#b39149] hover:text-neutral-900 flex items-center gap-1 transition-colors"
          >
            All appointments <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <RecentAppointmentsTable
          appointments={recentAppointments.map((a) => ({
            id: a.id,
            name: a.name,
            contactNumber: a.contactNumber,
            email: a.email,
            preferredTime: a.preferredTime,
            status: a.status,
            createdAt: a.createdAt.toISOString(),
          }))}
        />
      </section>
    </div>
  );
}
