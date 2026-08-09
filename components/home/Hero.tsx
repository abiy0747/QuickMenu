"use client";

import Image from "next/image";
import { restaurant } from "@/constants/restaurant";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <section
      className="
        relative
        w-full
        h-[70vh]
        min-h-[500px]
        overflow-hidden
        lg:h-[90vh]
      "
    >
      {/* Background Image */}
      <Image
        src="/images/hero/hero.png"
        alt="Restaurant Hero"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Light Mode Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/20
          dark:bg-black/50
        "
      />

      {/* Green Gradient Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#5B8E14]/40
          via-black/30
          to-black/70

          dark:from-[#5B8E14]/50
          dark:via-black/50
          dark:to-black/90
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          flex-col
          px-4
          py-6
          sm:px-6
          sm:py-8
        "
      >
        {/* Top Bar */}
        <div
          className="
            flex
            w-full
            items-center
            justify-between
          "
        >
          {/* Logo + Restaurant Name */}
          <div
            className="
              flex
              items-center
              gap-3
              sm:gap-4
            "
          >
            {/* Logo */}
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border-2
                border-[#F1E194]
                bg-[#5B8E14]
                shadow-xl
                sm:h-16
                sm:w-16
              "
            >
              <span
                className="
                  text-2xl
                  font-black
                  text-[#F1E194]
                  sm:text-3xl
                "
              >
                RH
              </span>
            </div>

            {/* Name */}
            <h2
              className="
                text-lg
                font-bold
                text-white
                sm:text-2xl
                md:text-3xl
              "
            >
              {restaurant.name}
            </h2>
          </div>

          {/* Language */}
          <button
            onClick={toggleLang}
            aria-label="Switch language"
            className="
              rounded-full
              border
              border-[#F1E194]
              bg-black/40
              px-3
              py-1.5
              text-sm
              text-white
              backdrop-blur-md
              transition
              hover:bg-black/60
              sm:px-5
              sm:py-2
              sm:text-base
            "
          >
            🌐 {lang === "en" ? "EN" : "አማ"}
          </button>
        </div>

        {/* Hero Center */}
        <div
          className="
            flex
            flex-1
            items-center
            justify-center
          "
        >
          <div className="text-center">
            <h1
              className="
                text-4xl
                font-black
                leading-tight
                text-white
                sm:text-5xl
                md:text-7xl
              "
            >
              {t("hero.line1")}

              <br />

              <span
                className="
                  italic
                  text-[#F1E194]
                "
              >
                {t("hero.slogan")}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}