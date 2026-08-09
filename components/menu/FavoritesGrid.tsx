"use client";

import { useFavorites } from "@/context/FavoriteContext";
import { useLanguage } from "@/context/LanguageContext";
import FoodCard from "@/components/menu/FoodCard";
import type { PublicMenuItem } from "@/lib/menu-data";

export default function FavoritesGrid({
  items,
}: {
  items: PublicMenuItem[];
}) {
  const { favorites } = useFavorites();
  const { lang, t } = useLanguage();

  const favoriteItems = items.filter((item) =>
    favorites.includes(item.id)
  );

  const displayName = (item: PublicMenuItem) =>
    lang === "am" && item.nameAm ? item.nameAm : item.name;

  const displayDescription = (item: PublicMenuItem) =>
    lang === "am" && item.descriptionAm
      ? item.descriptionAm
      : item.description;

  return (
    <main className="
      min-h-screen
      bg-[#F8F8F6]
      dark:bg-gray-950
      p-5
    ">
      <h1 className="
        mb-8
        text-3xl
        font-bold
        text-gray-900
        dark:text-white
      ">
        ❤️ {t("favorites.title")}
      </h1>

      {favoriteItems.length === 0 ? (
        <div className="
          rounded-3xl
          bg-white
          p-8
          text-center
          text-gray-500
          shadow-sm

          dark:bg-gray-800
          dark:text-gray-300
        ">
          {t("favorites.empty")}
        </div>
      ) : (
        <div className="
          grid
          grid-cols-2
          gap-3
          sm:gap-6
          lg:grid-cols-3
        ">
          {favoriteItems.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              name={displayName(item)}
              description={displayDescription(item)}
              ingredients={item.ingredients}
              ingredientsAm={item.ingredientsAm}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      )}
    </main>
  );
}
