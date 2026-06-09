import type { CSSProperties } from "react";
import { Code2 } from "lucide-react";

import { referenceStats, skillLevels } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="site-container">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="grid content-start gap-4">
            <SectionHeading
              eyebrow="Skills"
              title="Meine Kenntnisse in Prozent."
              description="Die Skills zeigen direkt, wie sicher ich mich in den wichtigsten Web-Technologien bewege."
            />

            <aside className="scroll-reveal motion-card rounded-soft border border-white/10 bg-white/[0.035] p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-soft border border-orange-400/35 text-orange-300">
                  <Code2 aria-hidden="true" size={18} />
                </span>
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-normal text-orange-300">
                    Profil
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Kurze Stärken aus der Referenz, aber nicht als Prozent-Skill.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {referenceStats.map((stat, index) => (
                  <span
                    key={stat}
                    style={
                      { "--reveal-delay": `${index * 70}ms` } as CSSProperties
                    }
                    className="rounded-soft border border-white/10 px-3 py-1.5 font-mono text-xs text-zinc-300"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {skillLevels.map((skill, index) => (
              <article
                key={skill.name}
                style={{ "--reveal-delay": `${120 + index * 70}ms` } as CSSProperties}
                className="scroll-reveal motion-card rounded-soft border border-white/10 bg-black/30 p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-mono text-base font-semibold text-white">
                    {skill.name}
                  </h3>
                  <span className="rounded-soft border border-orange-400/30 bg-orange-400/10 px-2.5 py-1 font-mono text-sm font-bold text-orange-300">
                    {skill.value}%
                  </span>
                </div>

                <div
                  aria-label={`${skill.name} ${skill.value} Prozent`}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={skill.value}
                  className="mt-4 h-2.5 overflow-hidden rounded-soft bg-white/[0.08]"
                  role="meter"
                >
                  <div
                    className="skill-meter-fill h-full rounded-soft"
                    style={
                      {
                        "--meter-delay": `${240 + index * 80}ms`,
                        width: `${skill.value}%`,
                      } as CSSProperties
                    }
                  />
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {skill.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
