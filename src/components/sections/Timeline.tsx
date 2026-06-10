"use client";

import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { education, educationSection } from "@/data/profile";

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineVisible, setLineVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const items = Array.from(
      section.querySelectorAll<HTMLElement>("[data-timeline-item]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => {
        setLineVisible(true);
        setVisibleItems(new Set(items.map((_, index) => index)));
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLineVisible(true);
          sectionObserver.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.18 },
    );

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index = Number(
            (entry.target as HTMLElement).dataset.timelineItem,
          );

          setVisibleItems((current) => {
            const next = new Set(current);
            next.add(index);
            return next;
          });

          itemObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.22 },
    );

    sectionObserver.observe(section);
    items.forEach((item) => itemObserver.observe(item));

    return () => {
      sectionObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="bildungsweg"
      ref={sectionRef}
      className="section-band py-16 sm:py-20 lg:py-24"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow={educationSection.eyebrow}
          title={educationSection.title}
          description={educationSection.description}
        />

        <div className="relative mt-12 md:mt-16">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"
          >
            <div
              className={`timeline-line-fill h-full w-full bg-cyan-200/70 ${
                lineVisible ? "is-visible" : ""
              }`}
            />
          </div>

          <ol className="grid gap-8 md:gap-10">
            {education.map((item, index) => {
              const isVisible = visibleItems.has(index);
              const isEven = index % 2 === 0;
              const sideOffset = isEven
                ? "translate-x-8 md:-translate-x-8"
                : "translate-x-8 md:translate-x-8";

              return (
                <li
                  key={item.school}
                  data-timeline-item={index}
                  className={`relative grid gap-4 pl-12 opacity-0 transition duration-700 ease-out md:grid-cols-2 md:gap-12 md:pl-0 ${
                    isVisible ? "translate-x-0 opacity-100" : sideOffset
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                    {item.current ? (
                      <span className="absolute inline-flex size-4 rounded-full bg-cyan-300 opacity-60 animate-ping" />
                    ) : null}
                    <span
                      className={`relative grid rounded-full ring-8 ring-black ${
                        item.current
                          ? "size-4 bg-cyan-200"
                          : "mt-1 size-2.5 bg-zinc-600"
                      }`}
                    />
                  </div>

                  <article
                    className={`motion-card rounded-soft border bg-black/35 p-5 md:p-6 ${
                      item.current
                        ? "border-cyan-300/40 shadow-[0_0_45px_rgba(103,232,249,0.08)]"
                        : "border-white/10"
                    } ${isEven ? "md:col-start-1" : "md:col-start-2"}`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      {item.current ? (
                        <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2 py-0.5 font-mono text-xs text-cyan-100">
                          {educationSection.currentLabel}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {item.school}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-cyan-100/80">
                      {item.period}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {item.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
