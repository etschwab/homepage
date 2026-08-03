import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { profile, siteCopy } from "@/data/profile";

export function HeroSection() {
  return (
    <section id="start" className="hero-screen relative overflow-hidden">
      <div className="hero-stage" aria-hidden="true" />

      <div className="site-frame hero-screen relative">
        <div className="absolute bottom-20 left-0 z-10 max-w-[52rem] sm:bottom-12 lg:bottom-14">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-normal text-white/88 sm:text-sm">
            {profile.role} / Bern
          </p>
          <h1 className="hero-title text-[4.25rem] font-black uppercase leading-[0.8] tracking-normal text-white sm:text-[7rem] sm:leading-[0.76] md:text-[8.5rem] lg:text-[10.5rem]">
            Etienne
            <br />
            Schwab
          </h1>
          <Link
            href="/projekte"
            className="hero-cta button-motion mt-7 inline-flex h-14 w-fit items-center justify-center gap-3 rounded-full border border-white/78 px-8 font-mono text-sm font-bold text-white backdrop-blur-sm hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white/50 lg:hidden"
          >
            {siteCopy.actions.projects}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <Link
          href="/projekte"
          className="hero-cta button-motion absolute bottom-12 right-0 hidden h-14 w-fit items-center justify-center gap-3 rounded-full border border-white/78 px-8 font-mono text-sm font-bold text-white backdrop-blur-sm hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white/50 lg:inline-flex"
        >
          {siteCopy.actions.projects}
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </section>
  );
}
