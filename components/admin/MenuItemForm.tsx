"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type CategoryOption = {
  id: string;
  name: string;
  nameAm?: string | null;
};

export type MenuItemFormValues = {
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  ingredients: string;
  ingredientsAm: string;
  price: string;
  image: string;
  categoryId: string;
  available: boolean;
};

const emptyValues: MenuItemFormValues = {
  name: "",
  nameAm: "",
  description: "",
  descriptionAm: "",
  ingredients: "",
  ingredientsAm: "",
  price: "",
  image: "",
  categoryId: "",
  available: true,
};

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
    >
      {children}
    </label>
  );
}

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  min,
  step,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  min?: string;
  step?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      required={required}
      min={min}
      step={step}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-[#5B8E14]"
    />
  );
}

export default function MenuItemForm({
  categories,
  itemId,
  initialValues,
}: {
  categories: CategoryOption[];
  itemId?: string;
  initialValues?: MenuItemFormValues;
}) {
  const router = useRouter();
  const isEdit = Boolean(itemId);

  const [values, setValues] = useState<MenuItemFormValues>(
    initialValues ?? emptyValues
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof MenuItemFormValues>(
    key: K,
    value: MenuItemFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.name.trim()) {
      setError("Item name is required");
      return;
    }

    if (!values.categoryId) {
      setError("Please choose a category");
      return;
    }

    const price = Number(values.price);

    if (values.price === "" || Number.isNaN(price) || price < 0) {
      setError("Please enter a valid price");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const payload = {
        name: values.name.trim(),
        nameAm: values.nameAm.trim() || null,
        description: values.description.trim() || null,
        descriptionAm: values.descriptionAm.trim() || null,
        ingredients: values.ingredients.trim() || null,
        ingredientsAm: values.ingredientsAm.trim() || null,
        price,
        image: values.image.trim() || null,
        categoryId: values.categoryId,
        available: values.available,
      };

      const url = isEdit ? `/api/menu/${itemId}` : "/api/menu";

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong");
        return;
      }

      router.push("/admin/menu");
      router.refresh();
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
      {/* Name + Price */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name">Item name *</FieldLabel>

          <TextInput
            id="name"
            required
            value={values.name}
            onChange={(v) => set("name", v)}
            placeholder="e.g. Special Tibs"
          />
        </div>

        <div>
          <FieldLabel htmlFor="nameAm">
            የምግብ ስም (አማርኛ){" "}
            <span className="font-normal text-zinc-400">- optional</span>
          </FieldLabel>

          <TextInput
            id="nameAm"
            value={values.nameAm}
            onChange={(v) => set("nameAm", v)}
            placeholder="ለምሳሌ ልዩ ጥብስ"
          />
        </div>
      </div>

      {/* Category + Price */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="categoryId">Category *</FieldLabel>

          <select
            id="categoryId"
            required
            value={values.categoryId}
            onChange={(e) => set("categoryId", e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
          >
            <option value="" disabled>
              Choose a category
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
                {category.nameAm ? ` · ${category.nameAm}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel htmlFor="price">Price (ETB) *</FieldLabel>

          <TextInput
            id="price"
            required
            type="number"
            min="0"
            step="0.01"
            value={values.price}
            onChange={(v) => set("price", v)}
            placeholder="e.g. 320"
          />
        </div>
      </div>

      {/* Availability */}
      <div>
        <FieldLabel htmlFor="available">Availability</FieldLabel>

        <button
          type="button"
          onClick={() => set("available", !values.available)}
          className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <span>{values.available ? "Available to customers" : "Hidden from menu"}</span>

          <span
            className={`relative h-6 w-11 shrink-0 rounded-full p-1 transition ${
              values.available ? "bg-[#5B8E14]" : "bg-zinc-300 dark:bg-white/10"
            }`}
          >
            <span
              className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                values.available ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Description */}
      <div>
        <FieldLabel htmlFor="description">Description</FieldLabel>

        <textarea
          id="description"
          rows={3}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Short, appetizing description..."
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-[#5B8E14]"
        />
      </div>

      {/* Description (Amharic) */}
      <div>
        <FieldLabel htmlFor="descriptionAm">
          መግለጫ (አማርኛ){" "}
          <span className="font-normal text-zinc-400">- optional</span>
        </FieldLabel>

        <textarea
          id="descriptionAm"
          rows={3}
          value={values.descriptionAm}
          onChange={(e) => set("descriptionAm", e.target.value)}
          placeholder="አጭር አፍቃሪ መግለጫ..."
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-[#5B8E14]"
        />
      </div>

      {/* Ingredients */}
      <div>
        <FieldLabel htmlFor="ingredients">Ingredients</FieldLabel>

        <textarea
          id="ingredients"
          rows={2}
          value={values.ingredients}
          onChange={(e) => set("ingredients", e.target.value)}
          placeholder="e.g. Beef, Onion, Spices, Injera"
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-[#5B8E14]"
        />

        <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
          Separate each ingredient with a comma.
        </p>
      </div>

      {/* Ingredients (Amharic) */}
      <div>
        <FieldLabel htmlFor="ingredientsAm">
          ንጥረ ነገሮች (አማርኛ){" "}
          <span className="font-normal text-zinc-400">- optional</span>
        </FieldLabel>

        <textarea
          id="ingredientsAm"
          rows={2}
          value={values.ingredientsAm}
          onChange={(e) => set("ingredientsAm", e.target.value)}
          placeholder="ለምሳሌ ሥጋ፣ ሽንኩርት፣ ቅመማ ቅመም፣ ኢንጅራ"
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#5B8E14] focus:ring-4 focus:ring-[#5B8E14]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-[#5B8E14]"
        />
      </div>

      {/* Image */}
      <div>
        <FieldLabel htmlFor="image">Image URL</FieldLabel>

        <TextInput
          id="image"
          value={values.image}
          onChange={(v) => set("image", v)}
          placeholder="https://example.com/dish.jpg"
        />

        <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
          Leave empty if you don&apos;t have an image.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Actions */}
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
          {isEdit ? "Save Changes" : "Create Menu Item"}
        </button>
      </div>
    </form>
  );
}
