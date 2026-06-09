"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("has-scroll-reveal");

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".scroll-reveal, .section-divider"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        rootMargin: "-6% 0px -10% 0px",
        threshold: 0.18,
      },
    );

    elements.forEach((element) => {
      element.classList.remove("is-visible");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
