import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#5B8E14]/20 bg-[#5B8E14]/5 px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#5B8E14] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B8E14]" />
          Organization
        </p>

        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          New Category
        </h1>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Create a new section to organize your menu items.
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}
