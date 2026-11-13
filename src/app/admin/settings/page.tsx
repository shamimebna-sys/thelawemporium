/**
 * Admin: edit site-wide settings (Executive Light theme).
 */
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "./settings-form";

export const metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#b39149] font-bold">
          Configuration
        </p>
        <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
          Site Settings
        </h1>
        <p className="text-sm text-slate-600 mt-0.5">
          Update chambers phone, email, address, and office hours across the website
        </p>
      </div>

      <SettingsForm
        initialSettings={settings.map((s) => ({
          id: s.id,
          key: s.key,
          value: s.value,
        }))}
      />
    </div>
  );
}
