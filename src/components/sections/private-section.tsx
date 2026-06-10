import type { CSSProperties } from "react";
import { Download, FileText, Settings, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";

const privateActions = [
  {
    title: "Unterlagen",
    description:
      "Platz für Lebenslauf, Zeugnisse und private Bewerbungsdateien.",
    icon: FileText,
  },
  {
    title: "Downloads",
    description: "Geschützte Buttons für PDF-Downloads oder Projektdateien.",
    icon: Download,
  },
  {
    title: "Status",
    description: "Interne Notizen, naechste Schritte und Stand der IMS-Website.",
    icon: ShieldCheck,
  },
  {
    title: "Bearbeiten",
    description:
      "Später können hier Inhalte, Projekte oder Kontaktinfos gepflegt werden.",
    icon: Settings,
  },
] as const;

export function PrivateSection({ username }: { username: string }) {
  return (
    <section id="intern" className="py-14 sm:py-16 lg:py-20">
      <div className="site-container">
        <SectionHeading
          eyebrow={`Login aktiv: ${username}`}
          title="Geschützter Bereich für sensible Daten."
          description="Lebenslauf, Zeugnisse und private Bewerbungsinformationen werden nicht öffentlich gezeigt. Dieser Bereich ist nur nach dem Login sichtbar."
        />

        <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {privateActions.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                style={
                  { "--reveal-delay": `${index * 90}ms` } as CSSProperties
                }
                className="scroll-reveal motion-card rounded-soft border border-orange-400/25 bg-orange-400/[0.045] p-5"
              >
                <span className="grid size-10 place-items-center rounded-soft border border-orange-400/35 text-orange-300">
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
