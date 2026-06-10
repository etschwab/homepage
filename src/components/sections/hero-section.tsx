import { ArrowRight, Mail } from "lucide-react";
import type { CSSProperties } from "react";

import { AnimatedHeroTitle } from "@/components/sections/animated-hero-title";
import { EmailLink } from "@/components/ui/email-link";
import { heroSection, siteCopy } from "@/data/profile";

export function HeroSection() {
  return (
    <section
      id="start"
      className="site-container relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-20 sm:py-24"
    >
      <div
        className="hero-particle left-[10%] top-[22%]"
        style={{ animationDelay: "0ms" } as CSSProperties}
      />
      <div
        className="hero-particle right-[18%] top-[30%]"
        style={{ animationDelay: "1200ms" } as CSSProperties}
      />
      <div
        className="hero-particle bottom-[24%] left-[58%]"
        style={{ animationDelay: "2400ms" } as CSSProperties}
      />

      <div className="scroll-reveal relative max-w-3xl">
        <p className="font-mono text-sm font-medium uppercase tracking-normal text-cyan-200">
          {heroSection.eyebrow}
        </p>
        <div className="mt-5">
          <AnimatedHeroTitle
            text={heroSection.typedText}
            rolePrefix={heroSection.rolePrefix}
            roles={heroSection.roles}
          />
        </div>
        <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-zinc-300">
          {heroSection.intro}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projekte"
            className="button-motion rounded-soft inline-flex h-12 items-center justify-center gap-3 bg-cyan-200 px-7 font-mono text-sm font-bold text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
          >
            {siteCopy.actions.projects}
            <ArrowRight aria-hidden="true" size={17} />
          </a>
          <EmailLink className="button-motion rounded-soft inline-flex h-12 items-center justify-center gap-3 border border-white/10 px-7 font-mono text-sm font-bold text-zinc-100 hover:border-cyan-300/45 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/30">
            <Mail aria-hidden="true" size={17} />
            {siteCopy.actions.contact}
          </EmailLink>
        </div>
      </div>
    </section>
  );
}
