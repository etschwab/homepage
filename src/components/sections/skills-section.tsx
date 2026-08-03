import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { siteCopy, skillGroups, skillHighlights } from "@/data/profile";

export function SkillsSection() {
  return (
    <section id="skills" className="section-band py-10 sm:py-12 lg:py-14">
      <div className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="grid content-start gap-5">
            <SectionHeading
              eyebrow={siteCopy.skills.eyebrow}
              title={siteCopy.skills.title}
              description={siteCopy.skills.description}
            />

            <aside className="scroll-reveal rounded-[1.5rem] border border-white/60 bg-white/52 p-5 shadow-[0_14px_42px_rgba(17,19,24,0.05)] backdrop-blur-md">
              <p className="font-mono text-xs font-semibold uppercase tracking-normal text-sky-700/80">
                {siteCopy.skills.profileLabel}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {siteCopy.skills.profileDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skillHighlights.map((stat, index) => (
                  <span
                    key={stat}
                    style={
                      { "--reveal-delay": `${index * 70}ms` } as CSSProperties
                    }
                    className="motion-card rounded-soft border border-black/10 px-3 py-1.5 font-mono text-xs text-zinc-700 hover:border-sky-200/25 hover:text-sky-700"
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
                className="motion-card scroll-reveal rounded-[1.5rem] border border-white/60 bg-white/52 p-5 shadow-[0_14px_42px_rgba(17,19,24,0.05)] backdrop-blur-md sm:p-6"
                style={
                  { "--reveal-delay": `${120 + groupIndex * 80}ms` } as CSSProperties
                }
              >
                <h3 className="font-mono text-sm font-semibold uppercase tracking-normal text-zinc-950">
                  {group.category}
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  {group.skills.map((skill, skillIndex) => {
                    const delay = 220 + groupIndex * 120 + skillIndex * 70;

                    return (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-sm font-semibold text-zinc-900">
                            {skill.name}
                          </h4>
                          <span className="font-mono text-xs text-sky-700/90">
                            {skill.value}%
                          </span>
                        </div>

                        <div
                          aria-label={`${skill.name} ${skill.value} ${siteCopy.skills.levelSuffix}`}
                          aria-valuemax={100}
                          aria-valuemin={0}
                          aria-valuenow={skill.value}
                          className="mt-3 h-2 overflow-hidden rounded-full bg-black/10"
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
