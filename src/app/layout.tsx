import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PlusBackground } from "@/components/site/plus-background";
import { ScrollRevealController } from "@/components/site/scroll-reveal-controller";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Etienne Schwab | IMS Portfolio",
  description:
    "Persönliche IMS-Website mit GitHub-Projekten, Kurzprofil und geschütztem Bereich für sensible Daten.",
  icons: {
    icon: "/images/esch.png",
    shortcut: "/images/esch.png",
    apple: "/images/esch.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <PlusBackground />
        <ScrollRevealController />
        {children}
      </body>
    </html>
  );
}
