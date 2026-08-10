"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, Info, Star, X } from "lucide-react";
import { useFavorites } from "@/context/FavoriteContext";
import { useLanguage } from "@/context/LanguageContext";

type FoodCardProps = {
  id: string;
  name: string;
  description: string;
  ingredients?: string;
  ingredientsAm?: string;
  image: string;
  price: number;
  rating: number;
};

export default function FoodCard({
  id,
  name,
  description,
  ingredients = "",
  ingredientsAm = "",
  image,
  price,
  rating,
}: FoodCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { lang, t } = useLanguage();

  const [detailsOpen, setDetailsOpen] = useState(false);

  const displayIngredients =
    lang === "am" && ingredientsAm ? ingredientsAm : ingredients;

  const ingredientList = displayIngredients
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  useEffect(() => {
    if (!detailsOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDetailsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [detailsOpen]);

  const closeDetails = () => setDetailsOpen(false);

  return (
    <>
      <div
        className="
          group
          overflow-hidden
          rounded-3xl
          border
          border-gray-100
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-2xl

          dark:border-gray-700
          dark:bg-gray-800
        "
      >
        {/* Image */}
        <div
          className="
            relative
            h-32
            overflow-hidden
            sm:h-48
            lg:h-56
          "
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="
                object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-gradient-to-br
                from-[#F1E194]/40
                to-[#5B8E14]/20
                text-4xl
              "
            >
              <span className="text-[#5B8E14] dark:text-[#F1E194]">
                🍽️
              </span>
            </div>
          )}

          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(id)}
            aria-label="Toggle favorite"
            className="
              absolute
              right-3
              top-3
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-md

              dark:bg-gray-700
            "
          >
            <Heart
              size={20}
              fill={isFavorite(id) ? "red" : "none"}
              color={isFavorite(id) ? "red" : "black"}
              className="dark:text-white"
            />
          </button>
        </div>

        {/* Content */}
        <div
          className="
            p-3
            sm:p-5
          "
        >
          <div
            className="
              flex
              items-start
              justify-between
              gap-2
            "
          >
            <h3
              className="
                text-base
                font-bold
                leading-tight
                text-gray-900
                line-clamp-2

                dark:text-white

                sm:text-xl
              "
            >
              {name}
            </h3>

            <div
              className="
                flex
                shrink-0
                items-center
                gap-1
                text-yellow-500
              "
            >
              <Star size={16} fill="currentColor" />

              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {rating}
              </span>
            </div>
          </div>

          {description && (
            <p
              className="
                mt-1
                hidden
                text-sm
                leading-relaxed
                text-gray-500
                line-clamp-2

                dark:text-gray-300

                sm:block
              "
            >
              <span
                className="
                  mr-1
                  font-semibold
                  text-gray-400

                  dark:text-gray-500
                "
              >
                {t("menu.description")}:
              </span>

              {description}
            </p>
          )}

          {ingredientList.length > 0 && (
            <p
              className="
                mt-1
                hidden
                text-sm
                leading-relaxed
                text-gray-500
                line-clamp-2

                dark:text-gray-300

                sm:block
              "
            >
              <span
                className="
                  mr-1
                  font-semibold
                  text-gray-400

                  dark:text-gray-500
                "
              >
                {t("menu.ingredients")}:
              </span>

              {ingredientList.join(", ")}
            </p>
          )}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between

              sm:mt-5
            "
          >
            <span
              className="
                text-base
                font-bold
                text-[#5B8E14]

                sm:text-2xl
              "
            >
              {price} ETB
            </span>

            <button
              onClick={() => setDetailsOpen(true)}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-[#5B8E14]
                px-3
                py-1
                text-xs
                font-semibold
                text-white
                transition
                hover:bg-[#4B7411]

                sm:px-5
                sm:py-2
                sm:text-base
              "
            >
              <Info size={14} className="sm:hidden" />

              <span>{t("menu.details")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Details modal (portal escapes transformed card ancestors and sits above bottom nav) */}
      {detailsOpen &&
        createPortal(
          <div
            className="
              animate-fade
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/60
              p-4
              backdrop-blur-sm
            "
            onClick={closeDetails}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                animate-pop
                relative
                flex
                max-h-[85vh]
                w-full
                max-w-md
                flex-col
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-2xl

                dark:bg-gray-800
              "
            >
              {/* Image */}
              <div
                className="
                  relative
                  h-48
                  shrink-0
                  overflow-hidden
                "
              >
                {image ? (
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      bg-gradient-to-br
                      from-[#F1E194]/40
                      to-[#5B8E14]/20
                      text-5xl
                    "
                  >
                    <span className="text-[#5B8E14] dark:text-[#F1E194]">
                      🍽️
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={closeDetails}
                  aria-label={t("menu.close")}
                  className="
                    absolute
                    right-3
                    top-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-zinc-500
                    shadow-md
                    transition
                    hover:text-zinc-800

                    dark:bg-gray-700
                    dark:text-zinc-300
                    dark:hover:text-white
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div
                className="
                  flex-1
                  space-y-4
                  overflow-y-auto
                  p-5

                  sm:p-6
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >
                  <h3
                    className="
                      text-2xl
                      font-black
                      leading-tight
                      text-gray-900

                      dark:text-white
                    "
                  >
                    {name}
                  </h3>

                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                      text-yellow-500
                    "
                  >
                    <Star size={18} fill="currentColor" />

                    <span className="font-bold text-gray-700 dark:text-gray-200">
                      {rating}
                    </span>
                  </div>
                </div>

                <p
                  className="
                    text-2xl
                    font-black
                    text-[#5B8E14]
                  "
                >
                  {price} ETB
                </p>

                {description && (
                  <div>
                    <p
                      className="
                        mb-1
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-gray-400

                        dark:text-gray-500
                      "
                    >
                      {t("menu.description")}
                    </p>

                    <p
                      className="
                        text-sm
                        leading-relaxed
                        text-gray-600

                        dark:text-gray-300
                      "
                    >
                      {description}
                    </p>
                  </div>
                )}

                {ingredientList.length > 0 && (
                  <div>
                    <p
                      className="
                        mb-2
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-gray-400

                        dark:text-gray-500
                      "
                    >
                      {t("menu.ingredients")}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {ingredientList.map((ingredient, index) => (
                        <span
                          key={`${ingredient}-${index}`}
                          className="
                            rounded-full
                            bg-[#5B8E14]/10
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-[#5B8E14]

                            dark:bg-[#5B8E14]/15
                            dark:text-[#7CB342]
                          "
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="
                  shrink-0
                  border-t
                  border-gray-100
                  p-4

                  dark:border-gray-700
                "
              >
                <button
                  type="button"
                  onClick={closeDetails}
                  className="
                    w-full
                    rounded-full
                    bg-[#5B8E14]
                    px-7
                    py-3
                    font-bold
                    text-white
                    transition
                    hover:bg-[#4B7411]
                  "
                >
                  {t("menu.close")}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
