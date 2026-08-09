import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import MenuItemForm from "@/components/admin/MenuItemForm";

export const dynamic = "force-dynamic";

export default async function NewMenuItemPage() {
  const session = await auth();

  const categories = await prisma.category.findMany({
    where: {
      restaurantId: session!.user.restaurantId,
    },
    select: {
      id: true,
      name: true,
      nameAm: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#5B8E14]/20 bg-[#5B8E14]/5 px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#5B8E14] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B8E14]" />
          Menu
        </p>

        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          New Menu Item
        </h1>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Add a new dish to your digital menu.
        </p>
      </div>

      <MenuItemForm categories={categories} />
    </div>
  );
}
