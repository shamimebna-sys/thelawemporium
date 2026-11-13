"use client";
/**
 * Login form with crisp light styling and toast feedback.
 */
import { Lock, Mail } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { loginAction } from "./actions";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await loginAction({ email, password });
      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="admin-label">Email Address</label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="email"
            autoComplete="email"
            placeholder="admin@thelawemporium.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="admin-input pl-10"
          />
        </div>
      </div>
      <div>
        <label className="admin-label">Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-input pl-10"
          />
        </div>
      </div>
      {error ? (
        <div className="rounded-lg bg-rose-50 border border-rose-200 px-3.5 py-2.5 text-xs text-rose-700 font-medium">
          {error}
        </div>
      ) : null}
      <button type="submit" disabled={isPending} className="admin-btn-primary w-full py-3">
        {isPending ? "Authenticating…" : "Sign In"}
      </button>
    </form>
  );
}
