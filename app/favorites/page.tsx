import { getPublicMenu } from "@/lib/menu-data";
import FavoritesGrid from "@/components/menu/FavoritesGrid";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const { items } = await getPublicMenu();

  return <FavoritesGrid items={items} />;
}
