import Hero from "@/components/home/Hero";
import MenuBrowser from "@/components/home/MenuBrowser";
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

      <MenuBrowser
        items={items}
        categories={categories}
      />
    </main>
  );
}
