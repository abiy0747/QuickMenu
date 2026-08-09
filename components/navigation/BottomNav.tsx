"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Star, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    {
      name: t("nav.home"),
      href: "/",
      icon: Home,
    },
    {
      name: t("nav.favorite"),
      href: "/favorites",
      icon: Heart,
    },
    {
      name: t("nav.reviews"),
      href: "/reviews",
      icon: Star,
    },
    {
      name: t("nav.profile"),
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <nav
      className="
        fixed
        bottom-5
        left-1/2
        z-50
        w-[92%]
        max-w-md
        -translate-x-1/2
        rounded-3xl
        border
        border-gray-200
        bg-white/95
        shadow-2xl
        backdrop-blur-xl
        dark:border-gray-700
        dark:bg-gray-900/95
      "
    >
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                flex
                flex-col
                items-center
                gap-1
              "
            >
              <div
                className={`
                  rounded-full
                  p-3
                  transition-all
                  duration-300
                  ${
                    active
                      ? "scale-110 bg-[#5B8E14] text-white shadow-lg"
                      : "text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }
                `}
              >
                <Icon size={22} />
              </div>

              <span
                className={`
                  text-xs
                  font-medium
                  ${
                    active
                      ? "text-[#5B8E14]"
                      : "text-gray-500 dark:text-gray-300"
                  }
                `}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}