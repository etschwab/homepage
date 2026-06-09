import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PageLoader } from "@/components/site/page-loader";
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
  title: "Bewerbung | Portfolio",
  description: "Onepage-Bewerbungsseite mit geschuetztem Login-Bereich.",
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
        <PageLoader />
        <ScrollRevealController />
        {children}
      </body>
    </html>
  );
}
