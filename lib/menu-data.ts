import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const PUBLIC_MENU_TAG = "public-menu";

export type PublicMenuItem = {
  id: string;
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  ingredients: string;
  ingredientsAm: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  image: string;
  price: number;
  rating: number;
  category: string;
  categoryAm: string;
};

export type PublicCategory = {
  name: string;
  nameAm: string;
};

export async function loadPublicMenu() {
  const restaurant = await prisma.restaurant.findFirst({
    include: {
      menuItems: {
        where: { available: true },
        include: {
          category: {
            select: {
              name: true,
              nameAm: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      reviews: {
        select: { rating: true },
      },
    },
  });

  const reviews = restaurant?.reviews ?? [];

  const rating =
    reviews.length > 0
      ? Math.round(
          (reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length) *
            10
        ) / 10
      : 4.5;

  const items: PublicMenuItem[] = (restaurant?.menuItems ?? []).map(
    (item) => ({
      id: item.id,
      name: item.name,
      nameAm: item.nameAm ?? "",
      description: item.description ?? "",
      descriptionAm: item.descriptionAm ?? "",
      ingredients: item.ingredients ?? "",
      ingredientsAm: item.ingredientsAm ?? "",
      calories: item.calories ?? undefined,
      protein: item.protein ?? undefined,
      carbs: item.carbs ?? undefined,
      fat: item.fat ?? undefined,
      image: item.image ?? "",
      price: item.price,
      rating,
      category: item.category?.name ?? "Other",
      categoryAm: item.category?.nameAm ?? "",
    })
  );

  const categoryMap = new Map<string, PublicCategory>();

  for (const item of restaurant?.menuItems ?? []) {
    const name = item.category?.name ?? "Other";
    const nameAm = item.category?.nameAm ?? "";

    if (!categoryMap.has(name)) {
      categoryMap.set(name, { name, nameAm });
    }
  }

  const categories = [...categoryMap.values()].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return { items, categories };
}

export const getPublicMenu = unstable_cache(
  loadPublicMenu,
  ["public-menu"],
  {
    tags: [PUBLIC_MENU_TAG],
    revalidate: 60,
  }
);
