import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { siteCopy, skillGroups, skillHighlights } from "@/data/profile";

export function SkillsSection() {
  return (
    <section id="skills" className="section-band py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="grid content-start gap-5">
            <SectionHeading
              eyebrow={siteCopy.skills.eyebrow}
              title={siteCopy.skills.title}
              description={siteCopy.skills.description}
            />

            <aside className="scroll-reveal rounded-soft border border-white/10 bg-white/[0.035] p-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-normal text-cyan-200">
                {siteCopy.skills.profileLabel}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {siteCopy.skills.profileDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skillHighlights.map((stat, index) => (
                  <span
                    key={stat}
                    style={
                      { "--reveal-delay": `${index * 70}ms` } as CSSProperties
                    }
                    className="motion-card rounded-soft border border-white/10 px-3 py-1.5 font-mono text-xs text-zinc-300 hover:border-cyan-300/35 hover:text-cyan-100 hover:shadow-[0_0_24px_rgba(103,232,249,0.08)]"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid gap-4">
            {skillGroups.map((group, groupIndex) => (
              <article
                key={group.category}
                className="motion-card scroll-reveal rounded-soft border border-white/10 bg-black/35 p-5 sm:p-6"
                style={
                  { "--reveal-delay": `${120 + groupIndex * 80}ms` } as CSSProperties
                }
              >
                <h3 className="font-mono text-sm font-semibold uppercase tracking-normal text-white">
                  {group.category}
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  {group.skills.map((skill, skillIndex) => {
                    const delay = 220 + groupIndex * 120 + skillIndex * 70;

                    return (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-sm font-semibold text-zinc-100">
                            {skill.name}
                          </h4>
                          <span className="font-mono text-xs text-cyan-100">
                            {skill.value}%
                          </span>
                        </div>

                        <div
                          aria-label={`${skill.name} ${skill.value} ${siteCopy.skills.levelSuffix}`}
                          aria-valuemax={100}
                          aria-valuemin={0}
                          aria-valuenow={skill.value}
                          className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]"
                          role="meter"
                        >
                          <div
                            className="skill-meter-fill h-full rounded-full"
                            style={
                              {
                                "--meter-delay": `${delay}ms`,
                                width: `${skill.value}%`,
                              } as CSSProperties
                            }
                          />
                        </div>

                        <p className="mt-3 text-sm leading-6 text-zinc-500">
                          {skill.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
