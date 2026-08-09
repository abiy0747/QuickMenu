import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const category = await prisma.category.findFirst({
    where: {
      id,
      restaurantId: session!.user.restaurantId,
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#5B8E14]/20 bg-[#5B8E14]/5 px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#5B8E14] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B8E14]" />
          Organization
        </p>

        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          Edit Category
        </h1>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Update <span className="font-semibold text-zinc-700 dark:text-zinc-200">{category.name}</span>.
        </p>
      </div>

      <CategoryForm categoryId={category.id} initialName={category.name} initialNameAm={category.nameAm ?? ""} />
    </div>
  );
}
