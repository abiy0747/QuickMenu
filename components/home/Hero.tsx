import Image from "next/image";
import { restaurant } from "@/constants/restaurant";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">

      {/* Background Image */}
      <Image
        src="/images/hero/hero-bg.jpg"
        alt="Restaurant Background"
        fill
        priority
        className="object-cover opacity-30"
      />

      {/* Dark + Green Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-[#234006]/70 to-black/40" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-6 py-10 lg:flex-row lg:items-center">

        {/* LEFT */}
        <div className="max-w-md text-white">

          {/* Header */}
          <div className="mb-12 flex items-start justify-between">

            <div className="flex items-center gap-4">

              {/* Logo */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F1E194] bg-[#28560F] shadow-xl">

                <span className="text-4xl font-black text-[#F1E194]">
                  RH
                </span>

              </div>

              {/* Restaurant Info */}
              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-3xl font-bold">
                    {restaurant.name}
                  </h2>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-sm text-white">
                    ✓
                  </span>

                </div>

                <p className="mt-1 text-[#F1E194] tracking-wider">
                  ★★★★★
                </p>

                <p className="text-sm text-white/80">
                  {restaurant.rating} • {restaurant.reviews}+ Reviews
                </p>

                <p className="mt-1 text-sm text-white/70">
                  📍 {restaurant.city}, {restaurant.country}
                </p>

              </div>

            </div>

            {/* Language */}
            <button className="rounded-full border border-[#F1E194] bg-white/10 px-5 py-2 backdrop-blur-md transition hover:bg-white/20">

              🇬🇧 {restaurant.language}

            </button>

          </div>

          {/* Hero Title */}
          <h1 className="text-6xl font-black leading-tight md:text-7xl lg:text-8xl">

            Your Table,

            <br />

            <span className="italic text-[#F1E194]">

              Your Taste

            </span>

          </h1>

          {/* Description */}
          <p className="mt-8 text-xl leading-9 text-gray-300">

            {restaurant.description}

          </p>

          {/* Status */}
          <div className="mt-10 flex flex-wrap gap-4">

            <span className="rounded-full bg-[#5B8E14] px-6 py-3 font-semibold text-white shadow-lg">

              🟢 {restaurant.status}

            </span>

            <span className="rounded-full bg-white/10 px-6 py-3 text-white backdrop-blur-md">

              🕒 {restaurant.openingHours}

            </span>

          </div>

        </div>

        {/* RIGHT */}
        <div className="relative mt-16 flex flex-1 justify-center lg:mt-0">

          {/* Glow */}
          <div className="absolute h-96 w-96 rounded-full bg-[#F1E194]/30 blur-3xl" />

          {/* Hero Food */}
          <Image
            src="/images/hero/hero-food.png"
            alt="Hero Food"
            width={620}
            height={620}
            priority
            className="relative z-10 rotate-[-5deg] drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:rotate-0 hover:scale-105"
          />

        </div>

      </div>

    </section>
  );
}