"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  FolderOpen,
  Star,
  Sun,
  Moon,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

type SidebarUser = {
  name?: string | null;
  email?: string | null;
};

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Menu Items", href: "/admin/menu", icon: UtensilsCrossed },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Reviews", href: "/admin/reviews", icon: Star },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname.startsWith(href);
}

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B8E14] to-[#7CB342] text-lg font-black text-white shadow-lg shadow-[#5B8E14]/25">
        Q
      </div>

      <div>
        <p className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
          QuickMenu
        </p>

        <p className="text-[11px] font-medium tracking-[0.18em] text-[#5B8E14] uppercase">
          Admin Suite
        </p>
      </div>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="mt-8 flex flex-1 flex-col gap-1.5">
      <p className="px-3 text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase dark:text-zinc-500">
        Menu
      </p>

      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`
              group
              flex
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-200
              ${
                active
                  ? "bg-[#5B8E14] text-white shadow-lg shadow-[#5B8E14]/25"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
              }
            `}
          >
            <Icon size={18} className={active ? "" : "text-zinc-400 transition group-hover:text-[#5B8E14] dark:text-zinc-500"} />

            <span>{item.name}</span>

            {active && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#F1E194]" />
            )}
          </Link>
        );
      })}

      <p className="mt-6 px-3 text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase dark:text-zinc-500">
        Links
      </p>

      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <ExternalLink size={18} className="text-zinc-400 dark:text-zinc-500" />

        <span>View Site</span>
      </Link>
    </nav>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200 hover:text-zinc-900 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function UserFooter({ user }: { user: SidebarUser }) {
  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F1E194] to-[#D4B63C] text-sm font-black text-zinc-900">
          {user.name?.charAt(0).toUpperCase() || "A"}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">
            {user.name || "Admin"}
          </p>

          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
            {user.email}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:text-zinc-300 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}

export default function AdminSidebar({ user }: { user: SidebarUser }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-200 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80 lg:hidden">
        <Brand />

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-white/5 dark:text-zinc-300"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute top-0 left-0 flex h-full w-72 flex-col bg-white p-5 shadow-2xl dark:bg-zinc-950">
            <div className="flex items-center justify-between">
              <Brand />

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-white/5 dark:text-zinc-300"
              >
                <X size={18} />
              </button>
            </div>

            <NavLinks onNavigate={() => setOpen(false)} />

            <UserFooter user={user} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-950 lg:flex">
        <Brand />

        <NavLinks />

        <div className="flex items-center justify-between rounded-2xl border border-zinc-200 p-3 dark:border-white/10">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Appearance
          </p>

          <ThemeToggle />
        </div>

        <UserFooter user={user} />
      </aside>
    </>
  );
}
