import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";

import { LightRays } from "@/components/site/light-rays";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://etienneschwab.ch"),
  title: {
    default: "Etienne Schwab · IMS-Schüler & Entwickler",
    template: "%s · Etienne Schwab",
  },
  description:
    "Portfolio von Etienne Schwab, IMS-Schüler und Entwickler aus Bern – mit Web-, Schul-, Hardware- und Mobile-Projekten.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Etienne Schwab · IMS-Schüler & Entwickler",
    description:
      "Portfolio von Etienne Schwab mit ausgewählten Web-, Schul-, Hardware- und Mobile-Projekten.",
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
    title: "Etienne Schwab · IMS-Schüler & Entwickler",
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
      className={`${sourceSans.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var v=t==='dark'||t==='light'?t:(m?'dark':'light');document.documentElement.dataset.theme=v;document.documentElement.style.colorScheme=v;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark';}})();`,
          }}
        />
      </head>
      <body>
        <LightRays />
        {children}
      </body>
    </html>
  );
}
