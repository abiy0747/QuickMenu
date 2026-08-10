"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

type CategoryRow = {
  id: string;
  name: string;
  nameAm?: string | null;
  _count?: { menuItems: number };
};

export default function CategoryList({
  categories: initialCategories,
}: {
  categories: CategoryRow[];
}) {
  const [categories, setCategories] = useState(initialCategories);

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const restoreCategory = (category: CategoryRow) => {
    setCategories((prev) =>
      prev.some((existing) => existing.id === category.id)
        ? prev
        : [category, ...prev]
    );
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={removeCategory}
          onRestore={restoreCategory}
        />
      ))}
    </div>
  );
}

function CategoryCard({
  category,
  onDelete,
  onRestore,
}: {
  category: CategoryRow;
  onDelete: (id: string) => void;
  onRestore: (category: CategoryRow) => void;
}) {
  const router = useRouter();
  const [dialog, setDialog] = useState<"confirm" | "info" | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const count = category._count?.menuItems ?? 0;

  const remove = async () => {
    setDeleting(true);
    setError(null);

    onDelete(category.id);

    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Failed to delete category");
        onRestore(category);
        return;
      }

      setDialog(null);
      router.refresh();
    } catch {
      setError("Failed to delete category");
      onRestore(category);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F1E194]/40 text-[#5B8E14] dark:bg-[#F1E194]/10">
          <FolderOpen size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-zinc-900 dark:text-white">
            {category.name}
            {category.nameAm && (
              <span className="ml-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                · {category.nameAm}
              </span>
            )}
          </p>

          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {count} item{count === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/categories/${category.id}/edit`}
            title="Edit category"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-[#5B8E14]/30 hover:bg-[#5B8E14]/5 hover:text-[#5B8E14] dark:border-white/10 dark:text-zinc-400 dark:hover:border-[#5B8E14]/40 dark:hover:text-[#7CB342]"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            onClick={() =>
              setDialog(count > 0 ? "info" : "confirm")
            }
            disabled={deleting}
            title={count > 0 ? "Cannot delete — has items" : "Delete category"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:border-white/10 dark:text-zinc-400 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            {deleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={dialog === "confirm"}
        title="Delete category"
        message={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleting}
        error={error}
        onConfirm={remove}
        onClose={() => {
          setDialog(null);
          setError(null);
        }}
      />

      <ConfirmDialog
        open={dialog === "info"}
        title="Cannot delete category"
        message={`"${category.name}" has ${count} menu item${count === 1 ? "" : "s"}. Move or remove them first.`}
        destructive={false}
        onClose={() => {
          setDialog(null);
          setError(null);
        }}
      />
    </>
  );
}
