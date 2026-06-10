import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { aboutSection, profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="ueber-mich" className="section-band py-16 sm:py-20 lg:py-24">
      <div className="site-container grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow={aboutSection.eyebrow}
            title={aboutSection.title}
            description={aboutSection.description}
          />

          <dl className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {aboutSection.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-soft border border-white/10 bg-white/[0.035] p-4"
              >
                <dt className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-medium text-zinc-100">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-4">
          <article className="scroll-reveal rounded-soft border border-white/10 bg-black/35 p-6 shadow-sm sm:p-7">
            <p className="font-mono text-xs uppercase tracking-normal text-cyan-200">
              {aboutSection.introLabel}
            </p>
            <p className="mt-4 text-lg leading-8 text-zinc-100">
              {profile.availability}
            </p>
            <div className="mt-5 grid gap-4 text-sm leading-7 text-zinc-400 sm:text-base">
              {aboutSection.paragraphs.map((paragraph, index) => (
                <p key={`${paragraph.text}-${index}`}>
                  {paragraph.text}
                  {"linkHref" in paragraph ? (
                    <a
                      href={paragraph.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-100 underline decoration-cyan-200/30 underline-offset-4 transition-colors hover:text-white"
                    >
                      {paragraph.linkLabel}
                      <ExternalLink aria-hidden="true" size={13} />
                    </a>
                  ) : null}
                  {"suffix" in paragraph ? paragraph.suffix : null}
                </p>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {aboutSection.cards.map((card, index) => (
              <article
                key={card.title}
                className="motion-card scroll-reveal rounded-soft border border-white/10 bg-white/[0.035] p-5"
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              >
                <p className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                  {card.label}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
