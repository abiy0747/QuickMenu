"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import type { PublicCategory } from "@/lib/menu-data";

export default function SearchSection({
  categories: categoryNames,
}: {
  categories: PublicCategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang, t } = useLanguage();

  const currentCategory =
    searchParams.get("category") || "All";

  const currentPrice =
    searchParams.get("price") || "all";

  const currentSearch =
    searchParams.get("search") || "";

  const [search, setSearch] = useState(currentSearch);

  /* Keep input synchronized with URL */
  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  /* Update URL filters */
  const updateFilters = (
    category: string = currentCategory,
    price: string = currentPrice,
    searchValue: string = search
  ) => {
    const params = new URLSearchParams();

    if (category !== "All") {
      params.set("category", category);
    }

    if (price !== "all") {
      params.set("price", price);
    }

    if (searchValue.trim() !== "") {
      params.set("search", searchValue.trim());
    }

    const query = params.toString();

    router.replace(
      query ? `/?${query}` : "/",
      {
        scroll: false,
      }
    );
  };

  /* Category filter */
  const handleCategory = (category: string) => {
    updateFilters(
      category,
      currentPrice,
      search
    );
  };

  /* Price filter */
  const handlePrice = (price: string) => {
    updateFilters(
      currentCategory,
      price,
      search
    );
  };

  /* Search filter */
  const handleSearch = (value: string) => {
    setSearch(value);

    updateFilters(
      currentCategory,
      currentPrice,
      value
    );
  };

  const categoryEmojis: Record<string, string> = {
    ethiopian: "🍽",
    burger: "🍔",
    pizza: "🍕",
    drinks: "🥤",
    breakfast: "🍳",
    lunch: "🍱",
    dinner: "🍝",
    pasta: "🍝",
    salad: "🥗",
    dessert: "🍰",
    juice: "🧃",
  };

  const categories = categoryNames.map((category) => ({
    name: category.name,
    label: `${categoryEmojis[category.name.toLowerCase()] ?? "📋"} ${
      lang === "am" && category.nameAm
        ? category.nameAm
        : category.name
    }`,
  }));

  const prices = [
    {
      id: "under200",
      label: `💰 ${t("search.under200")}`,
    },
    {
      id: "200to500",
      label: `💰 ${t("search.price200to500")}`,
    },
    {
      id: "above500",
      label: `💰 ${t("search.above500")}`,
    },
  ];

  return (
    <section
      className="
        relative
        z-20
        -mt-16
        w-full
        px-3
        sm:px-5
      "
    >
      <div
        className="
          mx-auto
          max-w-6xl
          rounded-3xl
          bg-white
          p-3
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          dark:bg-gray-800
          sm:p-6
        "
      >
        {/* Search */}
        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-4
          "
        >
          <div
            className="
              flex
              flex-1
              items-center
              rounded-full
              border
              border-gray-200
              bg-gray-50
              px-3
              py-2.5
              dark:border-gray-700
              dark:bg-gray-700
              sm:px-5
              sm:py-4
            "
          >
            <Search
              className="
                mr-2
                h-4
                w-4
                text-gray-400
                sm:h-5
                sm:w-5
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              placeholder={t("search.placeholder")}
              className="
                w-full
                bg-transparent
                text-sm
                text-gray-900
                outline-none
                placeholder:text-gray-400
                dark:text-white
                sm:text-base
              "
            />
          </div>

          <button
            type="button"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#5B8E14]
              text-white
              sm:h-14
              sm:w-14
            "
          >
            <SlidersHorizontal
              size={18}
              className="sm:w-[22px]"
            />
          </button>
        </div>

        {/* Categories */}
        <div
          className="
            mt-4
            flex
            gap-2
            overflow-x-auto
            pb-1
            sm:mt-6
          "
        >
          {/* All */}
          <button
            type="button"
            onClick={() =>
              handleCategory("All")
            }
            className={`
              whitespace-nowrap
              rounded-full
              px-3
              py-1.5
              text-xs
              font-medium
              transition
              sm:px-5
              sm:py-2
              sm:text-base

              ${
                currentCategory === "All"
                  ? "bg-[#5B8E14] text-white"
                  : "bg-[#F5F5F5] text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              }
            `}
          >
            {t("search.all")}
          </button>

          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() =>
                handleCategory(
                  category.name
                )
              }
              className={`
                whitespace-nowrap
                rounded-full
                px-3
                py-1.5
                text-xs
                transition
                sm:px-5
                sm:py-2
                sm:text-base

                ${
                  currentCategory ===
                  category.name
                    ? "bg-[#5B8E14] text-white"
                    : "bg-[#F5F5F5] text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Price Filters */}
        <div
          className="
            mt-3
            flex
            gap-2
            overflow-x-auto
            pb-1
          "
        >
          {/* All Prices */}
          <button
            type="button"
            onClick={() =>
              handlePrice("all")
            }
            className={`
              whitespace-nowrap
              rounded-full
              px-3
              py-1.5
              text-xs
              transition
              sm:text-sm

              ${
                currentPrice === "all"
                  ? "bg-[#F1E194] text-gray-900"
                  : "bg-[#F5F5F5] text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              }
            `}
          >
            💰 {t("search.allPrices")}
          </button>

          {prices.map((price) => (
            <button
              key={price.id}
              type="button"
              onClick={() =>
                handlePrice(price.id)
              }
              className={`
                whitespace-nowrap
                rounded-full
                px-3
                py-1.5
                text-xs
                transition
                sm:text-sm

                ${
                  currentPrice === price.id
                    ? "bg-[#F1E194] text-gray-900"
                    : "bg-[#F5F5F5] text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                }
              `}
            >
              {price.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}