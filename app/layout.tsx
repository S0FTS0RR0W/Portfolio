import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import BurgerMenu from "@/components/ui/burger-menu";
import { NavigationMenu } from "@/components/ui/navigation-menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "$./portfolio.sh",
  description: "Charlie Brown's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavigationMenu />
          <BurgerMenu />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
        <footer className="flex h-20 flex-col items-center justify-center text-center text-4x1 font-mono w-full bg-gray-800 text-white">
          <p>Charlie Brown © 2026</p>
          <p>Powered By MtnDEW</p>
        </footer>
      </body>
    </html>
  );
}
