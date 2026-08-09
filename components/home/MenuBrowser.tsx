"use client";

import { useMemo, useState } from "react";
import SearchSection from "@/components/home/SearchSection";
import MenuGrid from "@/components/menu/MenuGrid";
import type {
  PublicCategory,
  PublicMenuItem,
} from "@/lib/menu-data";

export default function MenuBrowser({
  items,
  categories,
}: {
  items: PublicMenuItem[];
  categories: PublicCategory[];
}) {
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("all");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return items.filter((item) => {
      const categoryMatch =
        category === "All" ||
        item.category === category;

      let priceMatch = true;

      if (price === "under200") {
        priceMatch = item.price < 200;
      }

      if (price === "200to500") {
        priceMatch =
          item.price >= 200 && item.price <= 500;
      }

      if (price === "above500") {
        priceMatch = item.price > 500;
      }

      const searchMatch =
        searchText === "" ||
        item.name
          .toLowerCase()
          .includes(searchText) ||
        item.nameAm
          .toLowerCase()
          .includes(searchText) ||
        item.description
          .toLowerCase()
          .includes(searchText) ||
        item.descriptionAm
          .toLowerCase()
          .includes(searchText) ||
        item.category
          .toLowerCase()
          .includes(searchText) ||
        item.categoryAm
          .toLowerCase()
          .includes(searchText);

      return (
        categoryMatch &&
        priceMatch &&
        searchMatch
      );
    });
  }, [items, category, price, search]);

  return (
    <>
      <SearchSection
        categories={categories}
        category={category}
        price={price}
        search={search}
        onCategory={setCategory}
        onPrice={setPrice}
        onSearch={setSearch}
      />

      <MenuGrid items={filteredItems} />
    </>
  );
}
