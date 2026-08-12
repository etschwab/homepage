import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Newsreader,
  Source_Sans_3,
} from "next/font/google";

import { PlusBackground } from "@/components/site/plus-background";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://etienneschwab.ch"),
  title: "Etienne Schwab | IMS Portfolio",
  description:
    "Portfolio von Etienne Schwab, IMS-Schüler und Entwickler aus der Region Bern.",
  openGraph: {
    title: "Etienne Schwab | IMS Portfolio",
    description:
      "Portfolio von Etienne Schwab, IMS-Schüler und Entwickler aus der Region Bern.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1728,
        height: 900,
        alt: "Etienne Schwab – IMS-Schüler und Entwickler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etienne Schwab | IMS Portfolio",
    description:
      "Portfolio von Etienne Schwab, IMS-Schüler und Entwickler aus der Region Bern.",
    images: ["/og.png"],
  },
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
      className={`${sourceSans.variable} ${barlowCondensed.variable} ${newsreader.variable}`}
    >
      <body>
        <PlusBackground />
        {children}
      </body>
    </html>
  );
}
