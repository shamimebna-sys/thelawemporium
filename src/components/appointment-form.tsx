"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { submitAppointmentAction } from "@/app/appointment/actions";
import { AppointmentTimePicker } from "@/components/appointment-time-picker";
import { t } from "@/lib/messages";
import type { Locale } from "@/lib/types";

type Fields = {
  name: string;
  contactNo: string;
  email: string;
  appointmentTime: string;
};

const empty: Fields = { name: "", contactNo: "", email: "", appointmentTime: "" };

export function AppointmentForm({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function validate(next: Fields) {
    const result: Partial<Fields> = {};
    if (next.name.trim().length < 3) result.name = "3–100";
    if (next.contactNo.trim().length < 3) result.contactNo = "3–50";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) result.email = "email";
    if (next.appointmentTime.trim().length < 3) result.appointmentTime = "3–60";
    return result;
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setServerError(null);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    startTransition(async () => {
      const result = await submitAppointmentAction(values);
      if (result.ok) {
        router.push(`/successful-appointment/${result.id}`);
      } else {
        setServerError(result.error);
      }
    });
  }

  function field(key: keyof Fields, label: string, placeholder: string, type = "text") {
    return (
      <label className="block space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {label}
        </span>
        <input
          name={key}
          type={type}
          autoComplete={key === "email" ? "email" : key === "name" ? "name" : "tel"}
          placeholder={placeholder}
          value={values[key]}
          onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
          required
          className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-black focus:outline-none rounded-lg p-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors duration-200"
        />
        {errors[key] ? <span className="field-error block">{errors[key]}</span> : null}
      </label>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {field("name", t(locale, "name"), t(locale, "namePlaceholder"))}
      {field("contactNo", t(locale, "contactNumber"), t(locale, "contactNumberPlaceholder"), "tel")}
      {field("email", t(locale, "email"), t(locale, "emailPlaceholder"), "email")}
      <AppointmentTimePicker
        name="appointmentTime"
        label={t(locale, "appointmentTime")}
        value={values.appointmentTime}
        onChange={(nextValue) => setValues((v) => ({ ...v, appointmentTime: nextValue }))}
        locale={locale}
        error={errors.appointmentTime}
      />
      {serverError ? (
        <p className="text-sm font-medium text-red-600">{serverError}</p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-black text-white hover:bg-gold hover:text-black font-bold text-sm uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md cursor-pointer disabled:opacity-60"
      >
        {isPending ? `${t(locale, "submit")}…` : t(locale, "submit")}
      </button>
      <p className="text-xs text-neutral-400 text-center leading-relaxed">
        {t(locale, "recaptcha")}
      </p>
    </form>
  );
}
