import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, UtensilsCrossed } from "lucide-react";
import MenuItemTable from "@/components/admin/MenuItemTable";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const session = await auth();

  const items = await prisma.menuItem.findMany({
    where: {
      restaurantId: session!.user.restaurantId,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          nameAm: true,
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
            Menu
          </p>

          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Menu Items
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {items.length} dish{items.length === 1 ? "" : "es"} on your digital menu
          </p>
        </div>

        <Link
          href="/admin/menu/new"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#5B8E14] to-[#7CB342] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#5B8E14]/25 transition hover:brightness-110"
        >
          <Plus size={18} />
          New Menu Item
        </Link>
      </div>

      {/* List */}
      {items.length > 0 ? (
        <MenuItemTable items={items} />
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-14 text-center dark:border-white/10 dark:bg-white/[0.02]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5B8E14]/10 text-[#5B8E14]">
            <UtensilsCrossed size={30} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white">
            No menu items yet
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            Add your first dish to start building the digital menu
            your customers will see.
          </p>

          <Link
            href="/admin/menu/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5B8E14] px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            <Plus size={18} />
            Add your first dish
          </Link>
        </div>
      )}
    </div>
  );
}
