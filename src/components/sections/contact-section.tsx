import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";

type ContactSectionProps = {
  isProtected?: boolean;
};

export function ContactSection({ isProtected = false }: ContactSectionProps) {
  return (
    <section id="kontakt" className="py-14 sm:py-16 lg:py-20">
      <div className="site-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeading
          eyebrow="Kontakt"
          title="Bereit für den nächsten Schritt."
          description="Der Kontaktbereich bleibt knapp und direkt. Später können Lebenslauf, Zeugnisse oder ein Kontaktformular ergänzt werden."
        />

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
          <a
            href={`mailto:${profile.email}`}
            className="button-motion rounded-soft inline-flex h-12 min-w-52 items-center justify-center gap-3 bg-orange-500 px-6 font-mono text-sm font-bold text-black transition-colors hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <Mail aria-hidden="true" size={17} />
            E-Mail senden
          </a>
          {!isProtected ? (
            <Link
              href="/login"
              className="button-motion rounded-soft inline-flex h-12 min-w-52 items-center justify-center gap-3 border border-white/12 px-6 font-mono text-sm font-bold text-white transition-colors hover:border-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300/70"
            >
              Admin Login
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
