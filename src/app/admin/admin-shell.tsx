"use client";
/**
 * Executive Light & Gold Admin Shell:
 * - Main Canvas: Crisp slate-50 background
 * - Sidebar: Deep neutral-900 charcoal with warm #c5a869 gold highlights
 * - Sticky Blurred Top Bar: Crisp white/85 backdrop-blur with breadcrumbs, quick search & appointment counter
 * - Sonner toast notifications
 */
import {
  Bell,
  BookOpen,
  CalendarClock,
  ChevronRight,
  ExternalLink,
  Images,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  PanelLeftClose,
  PanelLeftOpen,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { Toaster } from "sonner";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, keywords: "overview stats home" },
  { href: "/admin/services", label: "Services", icon: Scale, keywords: "criminal civil constitutional cases" },
  { href: "/admin/photos", label: "Photos", icon: Images, keywords: "gallery court office events images" },
  { href: "/admin/media", label: "Media", icon: Newspaper, keywords: "press news coverage tv print" },
  { href: "/admin/resources", label: "Resources", icon: BookOpen, keywords: "articles research stories precedents pdf" },
  { href: "/admin/we", label: "We / Advocates", icon: Users, keywords: "team members partners profiles bio" },
  { href: "/admin/sections", label: "Page Sections", icon: Layers, keywords: "home features blocks copy" },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarClock, keywords: "inquiries consultations booking" },
  { href: "/admin/settings", label: "Settings", icon: Settings, keywords: "phone email address hours config" },
];

const LABEL_MAP: Record<string, string> = {
  admin: "Dashboard",
  services: "Services",
  photos: "Photos Gallery",
  media: "Press & Media",
  resources: "Legal Resources",
  we: "We / Advocates",
  sections: "Page Sections",
  appointments: "Appointments",
  settings: "Settings",
  cases: "Cases",
  new: "New",
};

export function AdminShell({
  children,
  pendingAppointments = 0,
}: {
  children: ReactNode;
  pendingAppointments?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const breadcrumbs = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    return parts.map((part, idx) => ({
      href: "/" + parts.slice(0, idx + 1).join("/"),
      label: LABEL_MAP[part] ?? decodeURIComponent(part),
      isLast: idx === parts.length - 1,
    }));
  }, [pathname]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return NAV_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q),
    );
  }, [query]);

  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-slate-50 text-neutral-900">
        <Toaster theme="light" richColors position="top-right" />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-neutral-900 selection:bg-[#c5a869]/25 selection:text-neutral-950">
      <Toaster theme="light" richColors position="top-right" />

      {/* Mobile backdrop */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      {/* Dark Charcoal Sidebar with Gold Accents */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-neutral-900 text-white border-r border-neutral-800 transition-all duration-300 lg:sticky lg:top-0 lg:h-screen ${
          collapsed ? "w-20" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-800 shrink-0">
          <Link
            href="/admin"
            className={`flex items-center gap-3 min-w-0 ${collapsed ? "justify-center w-full" : ""}`}
          >
            <div className="h-9 w-9 rounded-xl bg-[#c5a869]/15 border border-[#c5a869]/40 flex items-center justify-center shrink-0">
              <Scale className="w-4 h-4 text-[#c5a869]" />
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a869] font-semibold truncate">
                  The Law Emporium
                </p>
                <p className="text-sm font-bold text-white tracking-tight truncate">
                  Chambers CMS
                </p>
              </div>
            ) : null}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                  collapsed ? "justify-center" : ""
                } ${
                  active
                    ? "bg-[#c5a869] text-neutral-950 font-bold shadow-sm"
                    : "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active ? "text-neutral-950" : "text-neutral-400 group-hover:text-[#c5a869]"
                  }`}
                />
                {!collapsed ? <span className="truncate flex-1">{item.label}</span> : null}
                {!collapsed && item.href === "/admin/appointments" && pendingAppointments > 0 ? (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      active
                        ? "bg-neutral-950 text-[#c5a869]"
                        : "bg-[#c5a869]/20 text-[#c5a869]"
                    }`}
                  >
                    {pendingAppointments}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Bottom user badge + controls */}
        <div className="p-3 border-t border-neutral-800 space-y-2 shrink-0">
          {!collapsed ? (
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10">
              <div className="h-8 w-8 rounded-lg bg-[#c5a869]/15 border border-[#c5a869]/30 flex items-center justify-center text-[#c5a869] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">Admin Console</p>
                <p className="text-[11px] text-neutral-400 truncate">admin@thelawemporium.com</p>
              </div>
            </div>
          ) : null}

          <div className={`flex items-center gap-1.5 ${collapsed ? "flex-col" : ""}`}>
            <Link
              href="/"
              target="_blank"
              title="View Public Website"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#c5a869]" />
              {!collapsed ? <span>Public Site</span> : null}
            </Link>
            <a
              href="/admin/logout"
              title="Sign out"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-500/15 hover:bg-rose-500/25 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              {!collapsed ? <span>Exit</span> : null}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-[11px] text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <>
                <PanelLeftClose className="w-3.5 h-3.5" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area (Light Canvas) */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Sticky Blurred Light Top Bar */}
        <header className="sticky top-0 z-30 h-16 px-4 lg:px-8 flex items-center justify-between gap-4 backdrop-blur-md bg-white/85 border-b border-slate-200/80">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs min-w-0">
              {breadcrumbs.map((bc, idx) => (
                <div key={bc.href} className="flex items-center gap-1.5 min-w-0">
                  {idx > 0 ? <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" /> : null}
                  {bc.isLast ? (
                    <span className="font-bold text-neutral-900 truncate">{bc.label}</span>
                  ) : (
                    <Link
                      href={bc.href}
                      className="text-slate-500 hover:text-neutral-900 transition-colors truncate"
                    >
                      {bc.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Global Search */}
            <div className="relative hidden sm:block w-64 md:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 160)}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults[0]) {
                    router.push(searchResults[0].href);
                    setQuery("");
                  }
                }}
                placeholder="Quick jump to CMS module..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-neutral-900 transition-all"
              />
              {searchFocused && searchResults.length > 0 ? (
                <div className="absolute left-0 right-0 mt-2 rounded-xl bg-white border border-slate-200 shadow-lg overflow-hidden z-50">
                  {searchResults.map((res) => {
                    const Icon = res.icon;
                    return (
                      <Link
                        key={res.href}
                        href={res.href}
                        onClick={() => setQuery("")}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-neutral-900 transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#c5a869]" />
                        <span className="font-medium">{res.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {/* Appointment Notification Bell */}
            <Link
              href="/admin/appointments?status=PENDING"
              title={`${pendingAppointments} pending appointment inquiries`}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs"
            >
              <Bell className="w-4 h-4 text-[#b39149]" />
              <span className="hidden md:inline text-xs font-semibold text-slate-700">
                Inquiries
              </span>
              {pendingAppointments > 0 ? (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                  {pendingAppointments}
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">0</span>
              )}
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 lg:p-8 max-w-[1440px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
