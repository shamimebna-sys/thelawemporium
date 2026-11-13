"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveSettingsJsonAction } from "./actions";

export function SettingsForm({
  initialSettings,
}: {
  initialSettings: { id: string; key: string; value: string }[];
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(initialSettings.map((s) => [s.key, s.value])),
  );
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveSettingsJsonAction(values);
      if (res.ok) toast.success("Site settings saved");
      else toast.error(res.error ?? "Failed to update settings");
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white border border-slate-200/80 shadow-sm p-6 space-y-5"
    >
      {initialSettings.map((s) => (
        <div key={s.id}>
          <label className="admin-label">{s.key}</label>
          <input
            value={values[s.key] ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, [s.key]: e.target.value }))}
            className="admin-input"
          />
        </div>
      ))}
      <div className="pt-2 border-t border-slate-200">
        <button type="submit" disabled={isPending} className="admin-btn-primary">
          {isPending ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
