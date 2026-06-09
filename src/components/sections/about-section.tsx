import { Check } from "lucide-react";

import { profile, profileFacts, strengths } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section id="profil" className="py-14 sm:py-16 lg:py-20">
      <div className="site-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeading
          eyebrow="Profil"
          title="Reduziert, persönlich und auf das Wesentliche ausgerichtet."
          description="Hier entsteht der Bereich für Kurzprofil, Stärken und Eckdaten. Die Struktur ist bewusst schlank, damit die Inhalte später professionell wirken."
        />

        <div className="grid gap-3">
          <div className="scroll-reveal motion-card rounded-soft border border-white/10 bg-black/30 p-5">
            <p className="font-mono text-sm text-orange-400">
              {profile.location}
            </p>
            <p className="mt-3 text-lg leading-8 text-zinc-300">
              {profile.availability}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {profileFacts.map((fact) => (
              <div
                key={fact.label}
                className="scroll-reveal motion-card rounded-soft border border-white/10 p-4"
              >
                <p className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                  {fact.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-white">{fact.value}</p>
              </div>
            ))}
          </div>

          <ul className="grid gap-2.5">
            {strengths.map((strength) => (
              <li
                key={strength}
                className="scroll-reveal motion-card rounded-soft flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-zinc-300"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-orange-400"
                  size={17}
                />
                {strength}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
