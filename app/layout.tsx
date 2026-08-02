// import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        {/* <Navbar /> */}

        {children}

      </body>
    </html>
  );
}