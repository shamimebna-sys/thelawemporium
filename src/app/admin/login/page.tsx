/**
 * Admin login page — Crisp Executive Light & Gold theme.
 */
import { Scale } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login | The Law Emporium",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200/90 shadow-xl p-8 md:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-neutral-900 flex items-center justify-center shadow-sm">
            <Scale className="w-5 h-5 text-[#c5a869]" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#b39149] font-bold mb-1.5">
            The Law Emporium
          </p>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            Chambers Admin CMS
          </h1>
          <p className="text-xs text-slate-500 mt-1.5">
            Sign in to manage legal services, press coverage, resources & appointments
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
