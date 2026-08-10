"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CategoryForm({
  categoryId,
  initialName,
  initialNameAm,
}: {
  categoryId?: string;
  initialName?: string;
  initialNameAm?: string;
}) {
  const router = useRouter();
  const isEdit = Boolean(categoryId);

  const [name, setName] = useState(initialName ?? "");
  const [nameAm, setNameAm] = useState(initialNameAm ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const url = isEdit
        ? `/api/categories/${categoryId}`
        : "/api/categories";

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          nameAm: nameAm.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong");
        return;
      }

      router.push("/admin/categories");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Category name *
        </label>

        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Breakfast"
          autoFocus
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-[#5B8E14]"
        />

        <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
          Categories group your menu items, e.g. Breakfast, Lunch,
          Drinks.
        </p>
      </div>

      <div>
        <label
          htmlFor="nameAm"
          className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          የምድብ ስም (አማርኛ){" "}
          <span className="font-normal text-zinc-400">- optional</span>
        </label>

        <input
          id="nameAm"
          type="text"
          value={nameAm}
          onChange={(e) => setNameAm(e.target.value)}
          placeholder="ለምሳሌ ቁርስ"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-[#5B8E14]"
        />

        <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
          Shown to customers when they switch the menu to አማርኛ.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#5B8E14] to-[#7CB342] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#5B8E14]/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {isEdit ? "Save Changes" : "Create Category"}
        </button>
      </div>
    </form>
  );
}
