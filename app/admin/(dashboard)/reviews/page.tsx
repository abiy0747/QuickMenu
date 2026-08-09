import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ReviewsList from "@/components/admin/ReviewsList";
import { Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const session = await auth();

  const reviews = await prisma.review.findMany({
    where: {
      restaurantId: session!.user.restaurantId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const average =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "—";

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#5B8E14]/20 bg-[#5B8E14]/5 px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#5B8E14] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B8E14]" />
            Feedback
          </p>

          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Reviews
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {reviews.length} review{reviews.length === 1 ? "" : "s"} from your customers
          </p>
        </div>

        <div className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-3 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1E194]/40 text-zinc-900">
            <Star size={18} fill="currentColor" className="text-yellow-500" />
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.15em] text-zinc-400 uppercase dark:text-zinc-500">
              Average Rating
            </p>

            <p className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
              {average}
              {reviews.length > 0 && (
                <span className="text-sm font-medium text-zinc-400"> / 5</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <ReviewsList
        reviews={reviews.map((review) => ({
          id: review.id,
          customerName: review.customerName,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
