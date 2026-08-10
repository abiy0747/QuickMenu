"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Trash2, Loader2, MessageSquareText } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export type ReviewRow = {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function ReviewCard({
  review,
  onDelete,
  onRestore,
}: {
  review: ReviewRow;
  onDelete: (id: string) => void;
  onRestore: (review: ReviewRow) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async () => {
    setDeleting(true);
    setError(null);

    onDelete(review.id);

    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Failed to delete review");
        onRestore(review);
        return;
      }

      setOpen(false);
      router.refresh();
    } catch {
      setError("Failed to delete review");
      onRestore(review);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F1E194] to-[#D4B63C] text-sm font-black text-zinc-900">
              {review.customerName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate font-bold text-zinc-900 dark:text-white">
                {review.customerName}
              </p>

              <div className="mt-0.5 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    className={
                      star <= review.rating
                        ? "text-yellow-500"
                        : "text-zinc-300 dark:text-zinc-600"
                    }
                    fill="currentColor"
                  />
                ))}

                <span className="ml-1 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                  {review.rating}.0
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={deleting}
            title="Delete review"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 dark:border-white/10 dark:text-zinc-400 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            {deleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {review.comment}
        </p>

        <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
          {formatDate(review.createdAt)}
        </p>
      </div>

      <ConfirmDialog
        open={open}
        title="Delete review"
        message={`Are you sure you want to delete the review by "${review.customerName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleting}
        error={error}
        onConfirm={remove}
        onClose={() => {
          setOpen(false);
          setError(null);
        }}
      />
    </>
  );
}

export default function ReviewsList({
  reviews: initialReviews,
}: {
  reviews: ReviewRow[];
}) {
  const [reviews, setReviews] = useState(initialReviews);

  const removeReview = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  const restoreReview = (review: ReviewRow) => {
    setReviews((prev) =>
      prev.some((existing) => existing.id === review.id)
        ? prev
        : [review, ...prev]
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-14 text-center dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F1E194]/40 text-[#5B8E14]">
          <MessageSquareText size={30} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white">
          No reviews yet
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          Reviews submitted by customers on the Reviews page will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onDelete={removeReview}
          onRestore={restoreReview}
        />
      ))}
    </div>
  );
}
