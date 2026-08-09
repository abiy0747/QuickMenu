"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ReviewsPage() {
  const { t } = useLanguage();

  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setRating(0);
    setName("");
    setComment("");
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError(t("reviews.selectRating"));
      return;
    }

    if (!name.trim()) {
      setError(t("reviews.writeName"));
      return;
    }

    if (!comment.trim()) {
      setError(t("reviews.writeComment"));
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? t("reviews.error"));
        return;
      }

      setSuccess(true);
    } catch {
      setError(t("reviews.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="
      min-h-screen
      bg-gray-50
      dark:bg-gray-950
      px-4
      py-8
      sm:px-8
    ">

      <section className="
        mx-auto
        max-w-3xl
      ">

        {/* Write Review Form */}
        <div className="
          rounded-3xl
          bg-white
          p-5
          shadow-sm
          dark:bg-gray-800
          sm:p-8
        ">

          {success ? (
            <div className="py-10 text-center">
              <CheckCircle2
                size={56}
                className="mx-auto text-[#5B8E14]"
              />

              <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {t("reviews.success")}
              </h1>

              <button
                type="button"
                onClick={resetForm}
                className="
                  mt-6
                  rounded-full
                  border
                  border-[#5B8E14]
                  px-7
                  py-3
                  font-medium
                  text-[#5B8E14]
                  transition
                  hover:bg-[#5B8E14]/5
                "
              >
                {t("reviews.writeAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1 className="
                text-3xl
                font-bold
                text-gray-900
                dark:text-white
              ">
                {t("reviews.writeReview")}
              </h1>

              <p className="
                mt-2
                text-gray-500
                dark:text-gray-300
              ">
                {t("reviews.hint")}
              </p>

              {/* Rating */}
              <div className="mt-6">
                <label className="
                  font-medium
                  text-gray-900
                  dark:text-white
                ">
                  {t("reviews.yourRating")}
                </label>

                <div className="
                  mt-3
                  flex
                  gap-2
                ">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`${star} star`}
                    >
                      <Star
                        size={30}
                        className="text-yellow-500"
                        fill={
                          star <= rating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("reviews.yourName")}
                className="
                  mt-6
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  placeholder:text-gray-400
                  focus:border-[#5B8E14]

                  dark:border-gray-600
                  dark:bg-gray-700
                  dark:text-white
                  dark:placeholder:text-gray-300
                "
              />

              {/* Review */}
              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("reviews.placeholder")}
                className="
                  mt-4
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  placeholder:text-gray-400
                  focus:border-[#5B8E14]

                  dark:border-gray-600
                  dark:bg-gray-700
                  dark:text-white
                  dark:placeholder:text-gray-300
                "
              />

              {error && (
                <p className="
                  mt-4
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-600

                  dark:border-red-500/30
                  dark:bg-red-500/10
                  dark:text-red-400
                ">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#5B8E14]
                  px-7
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-[#4B7411]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading && (
                  <Loader2 size={18} className="animate-spin" />
                )}
                {loading
                  ? t("reviews.submitting")
                  : t("reviews.submit")}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
