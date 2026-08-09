"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BellRing, Heart, Star, X } from "lucide-react";
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

  const [orderOpen, setOrderOpen] = useState(false);

  const displayIngredients =
    lang === "am" && ingredientsAm ? ingredientsAm : ingredients;

  const ingredientList = displayIngredients
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  useEffect(() => {
    if (!orderOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOrderOpen(false);
      }
    };

    const timeout = window.setTimeout(() => {
      setOrderOpen(false);
    }, 4000);

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.clearTimeout(timeout);

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [orderOpen]);

  const closeOrder = () => setOrderOpen(false);

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
              mb-2
              flex
              items-center
              justify-between
            "
          >
            <h3
              className="
                text-sm
                font-bold
                text-gray-900

                dark:text-white

                sm:text-xl
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
                {t("menu.name")}:
              </span>

              {name}
            </h3>

            <div
              className="
                flex
                items-center
                gap-1
                text-yellow-500
              "
            >
              <Star size={16} fill="currentColor" />

              <span className="text-gray-700 dark:text-gray-200">
                {rating}
              </span>
            </div>
          </div>

          {description && (
            <p
              className="
                text-sm
                leading-relaxed
                text-gray-500
                line-clamp-2

                dark:text-gray-300
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
                text-sm
                leading-relaxed
                text-gray-500
                line-clamp-2

                dark:text-gray-300
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
              mt-5
              flex
              items-center
              justify-between
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
              onClick={() => setOrderOpen(true)}
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
              <BellRing size={14} className="sm:hidden" />

              <span>{t("menu.order")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order confirmation popup (portal escapes transformed card ancestors) */}
      {orderOpen &&
        createPortal(
          <div
            className="
              animate-fade
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/60
              p-4
              backdrop-blur-sm
            "
            onClick={closeOrder}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                animate-pop
                relative
                w-full
                max-w-sm
                rounded-3xl
                bg-white
                p-8
                text-center
                shadow-2xl

                dark:bg-gray-800
              "
            >
              <button
                type="button"
                onClick={closeOrder}
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
                  text-zinc-400
                  transition
                  hover:bg-zinc-100
                  hover:text-zinc-600

                  dark:hover:bg-white/10
                  dark:hover:text-zinc-200
                "
              >
                <X size={18} />
              </button>

              {/* Bell icon */}
              <div
                className="
                  animate-bounce-in
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-[#5B8E14]/10
                  text-[#5B8E14]

                  dark:text-[#7CB342]
                "
              >
                <BellRing size={40} />
              </div>

              <h3
                className="
                  mt-5
                  text-2xl
                  font-black
                  text-gray-900

                  dark:text-white
                "
              >
                {t("menu.orderSent")}
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-relaxed
                  text-gray-500

                  dark:text-gray-300
                "
              >
                {t("menu.orderMessage")}
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  text-gray-400

                  dark:text-gray-500
                "
              >
                {t("menu.orderHint")}
              </p>

              <button
                type="button"
                onClick={closeOrder}
                className="
                  mt-6
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
                {t("menu.ok")}
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
