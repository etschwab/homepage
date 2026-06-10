import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import { EmailLink } from "@/components/ui/email-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactSection, siteCopy } from "@/data/profile";

type ContactSectionProps = {
  isProtected?: boolean;
};

export function ContactSection({ isProtected = false }: ContactSectionProps) {
  return (
    <section id="kontakt" className="section-band py-16 sm:py-20 lg:py-24">
      <div className="site-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeading
          eyebrow={contactSection.eyebrow}
          title={contactSection.title}
          description={contactSection.description}
        />

        <div className="scroll-reveal flex flex-col gap-4 sm:flex-row lg:flex-col">
          <EmailLink className="button-motion rounded-soft inline-flex h-12 min-w-52 items-center justify-center gap-3 bg-cyan-200 px-6 font-mono text-sm font-bold text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40">
            <Mail aria-hidden="true" size={17} />
            {siteCopy.actions.email}
          </EmailLink>
          {!isProtected ? (
            <Link
              href="/login"
              className="button-motion rounded-soft inline-flex h-12 min-w-52 items-center justify-center gap-3 border border-white/10 px-6 font-mono text-sm font-bold text-zinc-100 hover:border-cyan-300/45 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
            >
              {siteCopy.actions.login}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
