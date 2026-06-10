"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const frame = window.requestAnimationFrame(() => {
      document.documentElement.classList.add("has-scroll-reveal");

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(".scroll-reveal"),
      );

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        {
          rootMargin: "-6% 0px -10% 0px",
          threshold: 0.18,
        },
      );

      elements.forEach((element) => {
        element.classList.remove("is-visible");
        observer?.observe(element);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
