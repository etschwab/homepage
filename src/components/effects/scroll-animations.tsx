"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const contentSelector = [
  ".page-main h1",
  ".page-main h2",
  ".page-main h3",
  ".page-main p",
  ".page-main figure",
  ".page-main article",
  ".page-main a",
  ".page-main button",
  ".page-main form",
  ".page-main .project-browser-tools",
  ".page-main .skill-list li",
  ".page-main .education-list li",
  ".site-footer",
].join(",");

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const allElements = gsap.utils.toArray<HTMLElement>(contentSelector);
    const elements = allElements.filter((element) => {
      if (element.closest("dialog")) return false;

      const article = element.closest("article");
      if (article && article !== element) return false;

      const tools = element.closest(".project-browser-tools");
      if (tools && tools !== element) return false;

      const animatedParent = element.parentElement?.closest(contentSelector);
      if (animatedParent) return false;

      return true;
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(elements, { clearProps: "all" });
      return;
    }

    const context = gsap.context(() => {
      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            duration: 0.72,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              toggleActions: "restart none restart none",
            },
            y: 0,
          },
        );
      });
    });

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [pathname]);

  return null;
}
