import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  UtensilsCrossed,
  FolderOpen,
  Star,
  Plus,
} from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats(restaurantId: string) {
  const [menuItems, categories, reviews] = await Promise.all([
    prisma.menuItem.count({
      where: { restaurantId },
    }),
    prisma.category.count({
      where: { restaurantId },
    }),
    prisma.review.count({
      where: { restaurantId },
    }),
  ]);

  return { menuItems, categories, reviews };
}

export default async function AdminDashboardPage() {
  const session = await auth();

  const stats = await getStats(session!.user.restaurantId);

  const statCards = [
    {
      label: "Menu Items",
      value: stats.menuItems,
      hint: "Dishes on your digital menu",
      icon: UtensilsCrossed,
      accent: "bg-[#5B8E14]",
      href: "/admin/menu",
    },
    {
      label: "Categories",
      value: stats.categories,
      hint: "Organized menu sections",
      icon: FolderOpen,
      accent: "bg-[#F1E194] text-zinc-900",
      href: "/admin/categories",
    },
    {
      label: "Reviews",
      value: stats.reviews,
      hint: "Customer feedback",
      icon: Star,
      accent: "bg-zinc-900 text-[#F1E194] dark:bg-white dark:text-zinc-900",
      href: "/admin/reviews",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#5B8E14]/20 bg-[#5B8E14]/5 px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#5B8E14] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B8E14]" />
            Admin Panel
          </p>

          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Welcome back, {session!.user.name?.split(" ")[0]} 👋
          </h1>

          <p className="mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
            Manage your restaurant menu, categories and customer
            feedback from one luxurious place.
          </p>
        </div>

        <Link
          href="/admin/menu/new"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#5B8E14] to-[#7CB342] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#5B8E14]/25 transition hover:brightness-110"
        >
          <Plus size={18} />
          Add Menu Item
        </Link>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {card.label}
                  </p>

                  <p className="mt-2 text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                    {card.value}
                  </p>
                </div>

                <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md ${card.accent}`}>
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
                {card.hint}
              </p>
            </Link>
          );
        })}
      </section>

      {/* Quick actions */}
      <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 text-white shadow-xl sm:p-8 dark:from-zinc-900 dark:to-black">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#F1E194] uppercase">
              Quick Actions
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Keep your menu fresh
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
              Add a new dish, organize your categories or update
              availability in just a few clicks.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/menu/new"
              className="rounded-xl bg-[#F1E194] px-5 py-3 text-sm font-bold text-zinc-900 transition hover:opacity-90"
            >
              + New Menu Item
            </Link>

            <Link
              href="/admin/categories/new"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              + New Category
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
