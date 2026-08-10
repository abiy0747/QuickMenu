"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FolderOpen,
  Leaf,
  MessageSquareText,
  Smartphone,
  UtensilsCrossed,
  Zap,
  Star,
} from "lucide-react";
import { restaurant } from "@/constants/restaurant";
import { useLanguage } from "@/context/LanguageContext";

export type AboutStats = {
  menuItems: number;
  categories: number;
  reviews: number;
  rating: number | null;
};

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-5
        shadow-sm

        dark:border-gray-700
        dark:bg-gray-800
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#5B8E14]/10
          text-[#5B8E14]

          dark:bg-[#5B8E14]/15
          dark:text-[#7CB342]
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            text-2xl
            font-black
            tracking-tight
            text-gray-900

            dark:text-white
          "
        >
          {value}
        </p>

        <p
          className="
            truncate
            text-xs
            text-gray-500

            dark:text-gray-400
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        dark:border-gray-700
        dark:bg-gray-800
      "
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md ${accent}`}
      >
        {icon}
      </div>

      <h3
        className="
          mt-5
          text-lg
          font-bold
          text-gray-900

          dark:text-white
        "
      >
        {title}
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
        {description}
      </p>
    </div>
  );
}

export default function AboutContent({
  stats,
}: {
  stats: AboutStats;
}) {
  const { t } = useLanguage();

  const rating =
    stats.rating !== null ? stats.rating.toFixed(1) : "—";

  const statCards = [
    {
      label: t("about.statsDishes"),
      value: stats.menuItems.toString(),
      icon: <UtensilsCrossed size={22} />,
    },
    {
      label: t("about.statsCategories"),
      value: stats.categories.toString(),
      icon: <FolderOpen size={22} />,
    },
    {
      label: t("about.statsReviews"),
      value: stats.reviews.toString(),
      icon: <MessageSquareText size={22} />,
    },
    {
      label: t("about.statsRating"),
      value: `${rating} / 5`,
      icon: <Star size={22} />,
    },
  ];

  const values = [
    {
      icon: <Leaf size={26} />,
      title: t("about.valueFreshTitle"),
      description: t("about.valueFreshDesc"),
      accent: "bg-gradient-to-br from-[#5B8E14] to-[#7CB342]",
    },
    {
      icon: <Zap size={26} />,
      title: t("about.valueFastTitle"),
      description: t("about.valueFastDesc"),
      accent: "bg-gradient-to-br from-yellow-500 to-amber-600",
    },
    {
      icon: <Smartphone size={26} />,
      title: t("about.valueDigitalTitle"),
      description: t("about.valueDigitalDesc"),
      accent: "bg-gradient-to-br from-zinc-700 to-zinc-900 dark:from-gray-600 dark:to-gray-800",
    },
  ];

  return (
    <main
      className="
        min-h-screen
        bg-gray-50
        pb-32

        dark:bg-gray-950
      "
    >
      {/* Top bar */}
      <div
        className="
          mx-auto
          flex
          max-w-5xl
          items-center
          px-4
          py-4

          sm:px-6
        "
      >
        <Link
          href="/profile"
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-4
            py-2
            text-sm
            font-semibold
            text-gray-700
            shadow-sm
            transition
            hover:bg-gray-50

            dark:bg-gray-800
            dark:text-gray-200
            dark:hover:bg-gray-700
          "
        >
          <ArrowLeft size={18} />

          <span className="hidden sm:inline">
            {t("about.back")}
          </span>
        </Link>
      </div>

      {/* Hero */}
      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#5B8E14]
          via-[#4B7411]
          to-[#2E4A0A]
        "
      >
        <div
          className="
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-[#F1E194]/20
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-5xl
            px-4
            py-16
            text-center

            sm:px-6
            sm:py-20
          "
        >
          {/* Logo */}
          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              border-2
              border-[#F1E194]
              bg-[#5B8E14]
              shadow-2xl

              sm:h-28
              sm:w-28
            "
          >
            <span
              className="
                text-3xl
                font-black
                text-[#F1E194]

                sm:text-4xl
              "
            >
              RH
            </span>
          </div>

          <p
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#F1E194]/40
              bg-black/20
              px-4
              py-1.5
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#F1E194]
              backdrop-blur-sm
            "
          >
            {t("about.title")}
          </p>

          <h1
            className="
              mt-4
              text-4xl
              font-black
              tracking-tight
              text-white

              sm:text-5xl
            "
          >
            {restaurant.name}
          </h1>

          <p
            className="
              mt-3
              text-lg
              font-medium
              italic
              text-[#F1E194]

              sm:text-xl
            "
          >
            {t("about.tagline")}
          </p>
        </div>
      </section>

      {/* Story */}
      <section
        className="
          mx-auto
          max-w-3xl
          px-4
          py-14

          sm:px-6
        "
      >
        <div
          className="
            mb-6
            flex
            items-center
            gap-4
          "
        >
          <span
            className="
              h-10
              w-1
              rounded-full
              bg-[#5B8E14]
            "
          />

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-gray-900

              dark:text-white
            "
          >
            {t("about.storyTitle")}
          </h2>
        </div>

        <p
          className="
            text-base
            leading-relaxed
            text-gray-600

            dark:text-gray-300
          "
        >
          {t("about.storyP1")}
        </p>

        <p
          className="
            mt-4
            text-base
            leading-relaxed
            text-gray-600

            dark:text-gray-300
          "
        >
          {t("about.storyP2")}
        </p>
      </section>

      {/* Stats */}
      <section
        className="
          mx-auto
          max-w-5xl
          px-4

          sm:px-6
        "
      >
        <h2
          className="
            mb-6
            text-center
            text-2xl
            font-bold
            tracking-tight
            text-gray-900

            dark:text-white
          "
        >
          {t("about.statsTitle")}
        </h2>

        <div
          className="
            grid
            grid-cols-2
            gap-3

            sm:grid-cols-4
            sm:gap-4
          "
        >
          {statCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>
      </section>

      {/* Values */}
      <section
        className="
          mx-auto
          max-w-5xl
          px-4
          py-14

          sm:px-6
        "
      >
        <h2
          className="
            mb-2
            text-center
            text-3xl
            font-bold
            tracking-tight
            text-gray-900

            dark:text-white
          "
        >
          {t("about.valuesTitle")}
        </h2>

        <p
          className="
            mb-8
            text-center
            text-sm
            text-gray-500

            dark:text-gray-400
          "
        >
          {t("about.ctaDesc")}
        </p>

        <div
          className="
            grid
            gap-4

            sm:grid-cols-3
          "
        >
          {values.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="
          mx-auto
          max-w-5xl
          px-4

          sm:px-6
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-[#5B8E14]
            to-[#7CB342]
            p-8
            text-center
            shadow-xl

            sm:p-12
          "
        >
          <div
            className="
              absolute
              -left-16
              -top-16
              h-48
              w-48
              rounded-full
              bg-white/10
              blur-2xl
            "
          />

          <div
            className="
              absolute
              -bottom-16
              -right-16
              h-48
              w-48
              rounded-full
              bg-[#F1E194]/20
              blur-2xl
            "
          />

          <h2
            className="
              relative
              text-2xl
              font-black
              tracking-tight
              text-white

              sm:text-3xl
            "
          >
            {t("about.ctaTitle")}
          </h2>

          <p
            className="
              relative
              mx-auto
              mt-2
              max-w-md
              text-sm
              text-white/80
            "
          >
            {t("about.ctaDesc")}
          </p>

          <Link
            href="/"
            className="
              relative
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-8
              py-3
              font-bold
              text-[#5B8E14]
              shadow-lg
              transition
              hover:scale-105
            "
          >
            <UtensilsCrossed size={18} />

            {t("about.ctaButton")}
          </Link>
        </div>
      </section>
    </main>
  );
}
