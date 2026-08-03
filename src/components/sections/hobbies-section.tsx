import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { hobbiesSection } from "@/data/profile";

export function HobbiesSection() {
  return (
    <section id="hobbys" className="section-band py-10 sm:py-12 lg:py-14">
      <div className="site-container">
        <SectionHeading
          eyebrow={hobbiesSection.eyebrow}
          title={hobbiesSection.title}
          description={hobbiesSection.description}
        />

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {hobbiesSection.items.map((item, index) => (
            <article
              key={item.title}
              className="motion-card scroll-reveal rounded-[1.5rem] border border-white/60 bg-white/52 p-5 shadow-[0_14px_42px_rgba(17,19,24,0.05)] backdrop-blur-md"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
            >
              <h3 className="text-lg font-semibold text-zinc-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {item.description}
              </p>
              {"linkHref" in item ? (
                <a
                  href={item.linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sky-700/90 underline decoration-sky-200/25 underline-offset-4 transition-colors hover:text-zinc-950"
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
