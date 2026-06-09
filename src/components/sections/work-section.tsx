import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

import { workItems } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";

export function WorkSection() {
  return (
    <section id="projekte" className="py-14 sm:py-16 lg:py-20">
      <div className="site-container">
        <SectionHeading
          eyebrow="Auswahl"
          title="Projekte mit klarer Rolle und sauberer Umsetzung."
          description="Diese Karten sind Platzhalter für die erste Struktur. Später können hier echte Cases, Screenshots, GitHub-Links oder kurze Ergebniszahlen rein."
        />

        <div className="mt-9 grid gap-3 md:grid-cols-3">
          {workItems.map((item, index) => (
            <article
              key={item.title}
              style={{ "--reveal-delay": `${index * 110}ms` } as CSSProperties}
              className="scroll-reveal motion-card rounded-soft group min-h-52 border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-orange-400/70 sm:min-h-56"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                  {item.meta}
                </p>
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-zinc-600 transition-colors group-hover:text-orange-400"
                  size={18}
                />
              </div>
              <h3 className="mt-10 text-2xl font-semibold text-white sm:mt-12">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
