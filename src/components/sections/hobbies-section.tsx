import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { hobbiesSection } from "@/data/profile";

export function HobbiesSection() {
  return (
    <section id="hobbys" className="section-band py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow={hobbiesSection.eyebrow}
          title={hobbiesSection.title}
          description={hobbiesSection.description}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {hobbiesSection.items.map((item, index) => (
            <article
              key={item.title}
              className="motion-card scroll-reveal rounded-soft border border-white/10 bg-white/[0.035] p-5"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
            >
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {item.description}
              </p>
              {"linkHref" in item ? (
                <a
                  href={item.linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-100 underline decoration-cyan-200/30 underline-offset-4 transition-colors hover:text-white"
                >
                  {item.linkLabel}
                  <ExternalLink aria-hidden="true" size={14} />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
