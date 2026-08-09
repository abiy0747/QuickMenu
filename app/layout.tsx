import type { Metadata } from "next";
import "./globals.css";

import BottomNav from "@/components/navigation/BottomNav";
import { FavoriteProvider } from "@/context/FavoriteContext";
import { LanguageProvider } from "@/context/LanguageContext";
import ThemeProvider from "@/components/ThemeProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "QuickMenu",
  description: "Digital menus made simple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <FavoriteProvider>
              <ServiceWorkerRegister />

              {children}

              <BottomNav />
            </FavoriteProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}