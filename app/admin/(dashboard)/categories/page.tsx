import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FolderOpen, Plus } from "lucide-react";
import CategoryList from "@/components/admin/CategoryList";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const session = await auth();

  const categories = await prisma.category.findMany({
    where: {
      restaurantId: session!.user.restaurantId,
    },
    include: {
      _count: {
        select: {
          menuItems: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#5B8E14]/20 bg-[#5B8E14]/5 px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#5B8E14] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B8E14]" />
            Organization
          </p>

          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Categories
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {categories.length} categor{categories.length === 1 ? "y" : "ies"} organizing your menu
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#5B8E14] to-[#7CB342] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#5B8E14]/25 transition hover:brightness-110"
        >
          <Plus size={18} />
          New Category
        </Link>
      </div>

      {/* List */}
      {categories.length > 0 ? (
        <CategoryList categories={categories} />
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-14 text-center dark:border-white/10 dark:bg-white/[0.02]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F1E194]/40 text-[#5B8E14]">
            <FolderOpen size={30} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white">
            No categories yet
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            Create categories like Breakfast, Lunch or Drinks to
            organize your menu items.
          </p>

          <Link
            href="/admin/categories/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5B8E14] px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            <Plus size={18} />
            Create your first category
          </Link>
        </div>
      )}
    </div>
  );
}
