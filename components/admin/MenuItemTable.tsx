"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Pencil,
  Trash2,
  Loader2,
  ImageOff,
} from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

type MenuItemRow = {
  id: string;
  name: string;
  nameAm: string | null;
  description: string | null;
  price: number;
  image: string | null;
  available: boolean;
  category: { id: string; name: string; nameAm: string | null } | null;
};

function Price({ value }: { value: number }) {
  const formatted = Number.isInteger(value)
    ? value.toString()
    : value.toFixed(2);

  return (
    <span className="text-sm font-black tracking-tight text-[#5B8E14] dark:text-[#7CB342]">
      {formatted} ETB
    </span>
  );
}

function Thumb({ image, name }: { image: string | null; name: string }) {
  if (!image) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 dark:bg-white/5 dark:text-zinc-600">
        <ImageOff size={18} />
      </div>
    );
  }

  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
      <Image src={image} alt={name} fill sizes="48px" className="object-cover" />
    </div>
  );
}

function AvailabilityToggle({
  item,
  onChange,
}: {
  item: MenuItemRow;
  onChange: (id: string, available: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const available = item.available;

  const toggle = async () => {
    if (loading) return;

    const next = !available;

    onChange(item.id, next);

    setLoading(true);

    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: next }),
      });

      if (!res.ok) {
        onChange(item.id, available);
        alert("Failed to update availability");
      }
    } catch {
      onChange(item.id, available);
      alert("Failed to update availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      title={available ? "Click to hide" : "Click to make available"}
      className={`relative h-6 w-11 shrink-0 rounded-full p-1 transition ${
        available ? "bg-[#5B8E14]" : "bg-zinc-300 dark:bg-white/10"
      } ${loading ? "opacity-60" : ""}`}
    >
      <span
        className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          available ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function DeleteButton({
  item,
  onDelete,
  onRestore,
}: {
  item: MenuItemRow;
  onDelete: (id: string) => void;
  onRestore: (item: MenuItemRow) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async () => {
    setLoading(true);
    setError(null);

    onDelete(item.id);

    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Failed to delete menu item");
        onRestore(item);
        return;
      }

      setOpen(false);
      router.refresh();
    } catch {
      setError("Failed to delete menu item");
      onRestore(item);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Delete item"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 dark:border-white/10 dark:text-zinc-400 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      </button>

      <ConfirmDialog
        open={open}
        title="Delete menu item"
        message={`Are you sure you want to delete "${item.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={loading}
        error={error}
        onConfirm={remove}
        onClose={() => {
          setOpen(false);
          setError(null);
        }}
      />
    </>
  );
}

export default function MenuItemTable({
  items: initialItems,
}: {
  items: MenuItemRow[];
}) {
  const [items, setItems] = useState(initialItems);

  const updateAvailability = (id: string, available: boolean) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const restoreItem = (item: MenuItemRow) => {
    setItems((prev) =>
      prev.some((existing) => existing.id === item.id)
        ? prev
        : [item, ...prev]
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      {/* Column header (desktop) */}
      <div className="hidden grid-cols-12 gap-4 border-b border-zinc-100 px-6 py-3 text-[11px] font-bold tracking-[0.15em] text-zinc-400 uppercase dark:border-white/5 dark:text-zinc-500 md:grid">
        <span className="col-span-6">Item</span>
        <span className="col-span-2">Price</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-2 text-right">Actions</span>
      </div>

      <ul className="divide-y divide-zinc-100 dark:divide-white/5">
        {items.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-1 items-center gap-4 px-6 py-4 transition hover:bg-zinc-50/70 dark:hover:bg-white/[0.02] md:grid-cols-12"
          >
            {/* Item */}
            <div className="flex items-center gap-4 md:col-span-6">
              <Thumb image={item.image} name={item.name} />

              <div className="min-w-0">
                <p className="truncate font-bold text-zinc-900 dark:text-white">
                  {item.name}
                  {item.nameAm && (
                    <span className="ml-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                      · {item.nameAm}
                    </span>
                  )}
                </p>

                <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {item.category?.name ?? "Uncategorized"}
                  {item.category?.nameAm
                    ? ` · ${item.category.nameAm}`
                    : ""}
                  {item.description ? ` · ${item.description}` : ""}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="md:col-span-2">
              <Price value={item.price} />
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 md:col-span-2">
              <AvailabilityToggle item={item} onChange={updateAvailability} />

              <span
                className={`text-xs font-semibold ${
                  item.available
                    ? "text-[#5B8E14] dark:text-[#7CB342]"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {item.available ? "Available" : "Hidden"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:col-span-2 md:justify-end">
              <Link
                href={`/admin/menu/${item.id}/edit`}
                title="Edit item"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-[#5B8E14]/30 hover:bg-[#5B8E14]/5 hover:text-[#5B8E14] dark:border-white/10 dark:text-zinc-400 dark:hover:border-[#5B8E14]/40 dark:hover:text-[#7CB342]"
              >
                <Pencil size={16} />
              </Link>

              <DeleteButton
                item={item}
                onDelete={removeItem}
                onRestore={restoreItem}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
