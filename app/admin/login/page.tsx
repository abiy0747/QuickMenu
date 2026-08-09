"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Moon,
  Sun,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <main className="flex min-h-screen bg-[#F6F6F3] dark:bg-[#08080A]">
      {/* Left panel */}
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-zinc-900 p-12 lg:flex">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#5B8E14]/25 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#F1E194]/15 blur-3xl" />
        </div>

        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B8E14] to-[#7CB342] text-xl font-black text-white shadow-lg shadow-[#5B8E14]/25">
            Q
          </div>

          <div>
            <p className="text-xl font-black tracking-tight text-white">
              QuickMenu
            </p>

            <p className="text-[11px] font-medium tracking-[0.18em] text-[#F1E194] uppercase">
              Admin Suite
            </p>
          </div>
        </div>

        <div className="relative max-w-md">
          <p className="text-xs font-bold tracking-[0.2em] text-[#F1E194] uppercase">
            Restaurant Management
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white">
            Run your restaurant from{" "}
            <span className="bg-gradient-to-r from-[#F1E194] to-[#A8C86A] bg-clip-text text-transparent">
              one place
            </span>
          </h1>

          <p className="mt-4 text-sm leading-6 text-white/60">
            Add dishes, organize categories and keep your digital
            menu fresh — all with a modern dashboard built for
            luxury and speed.
          </p>
        </div>

        <div className="relative flex items-center gap-4 text-xs text-white/50">
          <span>🍽️ Menu CRUD</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>📂 Categories</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>🌗 Dark & Light</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          {/* Mobile brand */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B8E14] to-[#7CB342] text-xl font-black text-white shadow-lg shadow-[#5B8E14]/25">
              Q
            </div>

            <div>
              <p className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                QuickMenu
              </p>

              <p className="text-[11px] font-medium tracking-[0.18em] text-[#5B8E14] uppercase">
                Admin Suite
              </p>
            </div>
          </div>

          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                Sign in
              </h2>

              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Access your restaurant dashboard
              </p>
            </div>

            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-zinc-400"
                />

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@restaurant.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pr-4 pl-11 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-[#5B8E14]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-zinc-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pr-11 pl-11 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-[#5B8E14]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-br from-[#5B8E14] to-[#7CB342] py-3 text-sm font-bold text-white shadow-lg shadow-[#5B8E14]/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in to Dashboard"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
            QuickMenu Admin · Managed by your restaurant team
          </p>
        </div>
      </div>
    </main>
  );
}
