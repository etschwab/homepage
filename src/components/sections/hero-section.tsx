import { ArrowRight, Mail } from "lucide-react";

import { AnimatedHeroTitle } from "@/components/sections/animated-hero-title";
import { EmailLink } from "@/components/ui/email-link";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section
      id="start"
      className="site-container flex items-start pt-10 pb-12 sm:min-h-[calc(100svh-4rem)] sm:items-center sm:py-16 lg:py-20"
    >
      <div className="w-full min-w-0 max-w-3xl">
        <p className="reveal-up font-mono text-sm font-semibold text-orange-400">
          {`/* ${profile.role} */`}
        </p>
        <AnimatedHeroTitle name={profile.name} title={profile.title} />
        <p className="reveal-up reveal-delay-2 mt-7 w-full max-w-xl break-words text-pretty text-base leading-7 text-zinc-400 sm:max-w-2xl sm:text-lg sm:leading-8">
          {profile.intro}
        </p>

        <div className="reveal-up reveal-delay-3 mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projekte"
            className="button-motion rounded-soft inline-flex h-12 items-center justify-center gap-3 bg-orange-500 px-7 font-mono text-sm font-bold text-black transition-colors hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Zu den Projekten
            <ArrowRight aria-hidden="true" size={17} />
          </a>
          <EmailLink
            className="button-motion rounded-soft inline-flex h-12 items-center justify-center gap-3 border border-white/12 px-7 font-mono text-sm font-bold text-white transition-colors hover:border-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300/70"
          >
            <Mail aria-hidden="true" size={17} />
            Kontakt
          </EmailLink>
        </div>
      </div>
    </section>
  );
}
