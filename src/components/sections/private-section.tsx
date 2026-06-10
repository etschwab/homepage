import type { CSSProperties } from "react";
import {
  Download,
  FileText,
  Settings,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { privateActions, siteCopy } from "@/data/profile";

const actionIcons: Record<(typeof privateActions)[number]["icon"], LucideIcon> = {
  download: Download,
  file: FileText,
  settings: Settings,
  shield: ShieldCheck,
};

export function PrivateSection({ username }: { username: string }) {
  return (
    <section id="intern" className="section-band py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow={`${siteCopy.private.eyebrowPrefix} ${username}`}
          title={siteCopy.private.title}
          description={siteCopy.private.description}
        />

        <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {privateActions.map((item, index) => {
            const Icon = actionIcons[item.icon];

            return (
              <article
                key={item.title}
                style={
                  { "--reveal-delay": `${index * 90}ms` } as CSSProperties
                }
                className="motion-card scroll-reveal rounded-soft border border-cyan-300/20 bg-cyan-300/[0.055] p-5"
              >
                <span className="grid size-10 place-items-center rounded-soft border border-cyan-300/30 text-cyan-100">
                  <Icon aria-hidden="true" size={19} />
                </span>
                <h3 className="mt-8 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
