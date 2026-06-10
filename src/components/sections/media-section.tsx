import { Play } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { mediaSection } from "@/data/profile";

export function MediaSection() {
  return (
    <section id="media" className="section-band py-16 sm:py-20 lg:py-24">
      <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow={mediaSection.eyebrow}
          title={mediaSection.title}
          description={mediaSection.description}
        />

        <div className="scroll-reveal rounded-soft border border-dashed border-white/15 bg-white/[0.025] p-6">
          <div className="grid aspect-video place-items-center rounded-soft border border-white/10 bg-black/35">
            <div className="text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                <Play aria-hidden="true" size={18} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {mediaSection.placeholderTitle}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-400">
                {mediaSection.placeholderDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
