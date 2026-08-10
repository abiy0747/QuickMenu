import { prisma } from "@/lib/prisma";
import AboutContent, {
  type AboutStats,
} from "@/components/about/AboutContent";

export const dynamic = "force-dynamic";

const fallbackStats: AboutStats = {
  menuItems: 0,
  categories: 0,
  reviews: 0,
  rating: null,
};

export default async function AboutPage() {
  let stats = fallbackStats;

  try {
    const [menuItems, categories, reviewResult] = await Promise.all([
      prisma.menuItem.count(),
      prisma.category.count(),
      prisma.review.aggregate({
        _count: true,
        _avg: { rating: true },
      }),
    ]);

    stats = {
      menuItems,
      categories,
      reviews: reviewResult._count,
      rating: reviewResult._avg.rating,
    };
  } catch (error) {
    console.error("ABOUT STATS ERROR:", error);
  }

  return <AboutContent stats={stats} />;
}
