"use client";

import FoodCard from "./FoodCard";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import type { PublicMenuItem } from "@/lib/menu-data";

export default function MenuGrid({
  items,
}: {
  items: PublicMenuItem[];
}) {
  const searchParams = useSearchParams();
  const { lang, t } = useLanguage();

  const category = searchParams.get("category") || "All";
  const price = searchParams.get("price") || "all";
  const search = searchParams.get("search") || "";

  const filteredItems = items.filter((item) => {
    // Category filter
    const categoryMatch =
      category === "All" || item.category === category;

    // Price filter
    let priceMatch = true;

    if (price === "under200") {
      priceMatch = item.price < 200;
    }

    if (price === "200to500") {
      priceMatch =
        item.price >= 200 &&
        item.price <= 500;
    }

    if (price === "above500") {
      priceMatch = item.price > 500;
    }

    // Search filter (English + Amharic)
    const searchText = search.toLowerCase().trim();

    const searchMatch =
      searchText === "" ||
      item.name.toLowerCase().includes(searchText) ||
      item.nameAm.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText) ||
      item.descriptionAm.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText) ||
      item.categoryAm.toLowerCase().includes(searchText);

    return (
      categoryMatch &&
      priceMatch &&
      searchMatch
    );
  });

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
          {filteredItems.length === 1
            ? t("menu.oneDishAvailable")
            : t("menu.dishesAvailable", {
                count: filteredItems.length,
              })}
        </p>
      </div>

      {/* Food Grid */}

      {filteredItems.length > 0 ? (
        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:gap-6
            lg:grid-cols-3
          "
        >
          {filteredItems.map((item) => (
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