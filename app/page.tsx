import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import MenuGrid from "@/components/menu/MenuGrid";
import { getPublicMenu } from "@/lib/menu-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { items, categories } = await getPublicMenu();

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-white
        dark:bg-black
      "
    >
      <Hero />

      <SearchSection categories={categories} />

      <MenuGrid items={items} />
    </main>
  );
}
