"use client";

import FoodCard from "./FoodCard";
import { useLanguage } from "@/context/LanguageContext";
import type { PublicMenuItem } from "@/lib/menu-data";

export default function MenuGrid({
  items,
}: {
  items: PublicMenuItem[];
}) {
  const { lang, t } = useLanguage();

  const displayName = (item: PublicMenuItem) =>
    lang === "am" && item.nameAm ? item.nameAm : item.name;

  const displayDescription = (item: PublicMenuItem) =>
    lang === "am" && item.descriptionAm
      ? item.descriptionAm
      : item.description;

  return (
    <section
      className="
        mx-auto
        mt-12
        max-w-7xl
        px-5
        pb-32
      "
    >
      {/* Header */}

      <div className="mb-8">
        <h2
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          {t("menu.popularDishes")}
        </h2>

        <p
          className="
            text-gray-500
            dark:text-gray-300
          "
        >
          {items.length === 1
            ? t("menu.oneDishAvailable")
            : t("menu.dishesAvailable", {
                count: items.length,
              })}
        </p>
      </div>

      {/* Food Grid */}

      {items.length > 0 ? (
        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:gap-6
            lg:grid-cols-3
          "
        >
          {items.map((item) => (
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
      ) : (
        <div
          className="
            rounded-3xl
            bg-white
            p-10
            text-center
            shadow-sm
            dark:bg-gray-800
          "
        >
          <div className="text-5xl">
            🍽️
          </div>

          <h3
            className="
              mt-4
              text-xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {t("menu.noDishes")}
          </h3>

          <p
            className="
              mt-2
              text-gray-500
              dark:text-gray-300
            "
          >
            {t("menu.noDishesHint")}
          </p>
        </div>
      )}
    </section>
  );
}