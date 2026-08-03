import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { aboutSection, profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="ueber-mich" className="section-band py-12 sm:py-14 lg:py-16">
      <div className="site-container grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow={aboutSection.eyebrow}
            title={aboutSection.title}
            description={aboutSection.description}
          />

          <div className="about-portrait scroll-reveal mt-6">
            <Image
              src="/images/etienne-portrait.png"
              alt="Portrait von Etienne Schwab"
              width={900}
              height={1200}
              className="h-full w-full object-cover object-[50%_31%]"
              sizes="(max-width: 1024px) 92vw, 31vw"
            />
          </div>

          <dl className="mt-4 grid gap-3 sm:grid-cols-3">
            {aboutSection.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[1.5rem] border border-white/60 bg-white/52 p-4 shadow-[0_14px_42px_rgba(17,19,24,0.05)] backdrop-blur-md"
              >
                <dt className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-medium text-zinc-900">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-4">
          <article className="scroll-reveal rounded-[1.5rem] border border-white/60 bg-white/52 p-5 shadow-[0_14px_42px_rgba(17,19,24,0.05)] backdrop-blur-md sm:p-6">
            <p className="font-mono text-xs uppercase tracking-normal text-sky-700/80">
              {aboutSection.introLabel}
            </p>
            <p className="mt-4 text-lg leading-8 text-zinc-900">
              {profile.availability}
            </p>
            <div className="mt-5 grid gap-4 text-sm leading-7 text-zinc-500 sm:text-base">
              {aboutSection.paragraphs.map((paragraph, index) => (
                <p key={`${paragraph.text}-${index}`}>
                  {paragraph.text}
                  {"linkHref" in paragraph ? (
                    <a
                      href={paragraph.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sky-700/90 underline decoration-sky-200/25 underline-offset-4 transition-colors hover:text-zinc-950"
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

          <div className="grid gap-3 md:grid-cols-3">
            {aboutSection.cards.map((card, index) => (
              <article
                key={card.title}
                className="motion-card scroll-reveal rounded-[1.5rem] border border-white/60 bg-white/52 p-5 shadow-[0_14px_42px_rgba(17,19,24,0.05)] backdrop-blur-md"
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              >
                <p className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                  {card.label}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-zinc-950">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
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
