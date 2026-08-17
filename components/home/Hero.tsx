"use client";

import Image from "next/image";
import { ChevronDown, Globe, Sparkles } from "lucide-react";
import { restaurant } from "@/constants/restaurant";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <section
      className="
        relative
        w-full
        h-[48vh]
        min-h-[320px]
        overflow-hidden
        sm:h-[52vh]
        lg:h-[58vh]
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

      {/* Bottom fade for a modern blend into the page */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-20
          bg-gradient-to-t
          from-black/40
          to-transparent

          sm:h-24
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
          py-5
          sm:px-6
          sm:py-6
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
            {/* Modern Logo (app-icon style) */}
            <div
              className="
                relative
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-[#7CB342]
                to-[#4B7411]
                shadow-xl
                shadow-black/30
                ring-1
                ring-white/30

                sm:h-14
                sm:w-14
              "
            >
              {/* Glossy highlight */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-gradient-to-b
                  from-white/30
                  to-transparent
                "
              />

              <span
                className="
                  relative
                  text-lg
                  font-black
                  tracking-tight
                  text-white
                  drop-shadow

                  sm:text-xl
                "
              >
                RH
              </span>

              {/* Accent badge */}
              <span
                className="
                  absolute
                  -right-1.5
                  -top-1.5
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F1E194]
                  text-[#5B8E14]
                  shadow-md
                "
              >
                <Sparkles size={11} />
              </span>
            </div>

            {/* Name */}
            <h2
              className="
                text-lg
                font-bold
                text-white
                drop-shadow-lg

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
              group
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/25
              bg-white/10
              px-3
              py-2
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-black/10
              backdrop-blur-md
              transition
              hover:bg-white/20

              sm:gap-2
              sm:px-4
              sm:py-2
              sm:text-base
            "
          >
            <Globe
              size={16}
              className="text-[#F1E194]"
            />

            <span>
              {lang === "en" ? "EN" : "አማ"}
            </span>

            <ChevronDown
              size={14}
              className="text-white/70 transition-transform group-hover:translate-y-0.5"
            />
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
                text-3xl
                font-black
                leading-tight
                text-white
                drop-shadow-lg

                sm:text-4xl
                md:text-5xl
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
