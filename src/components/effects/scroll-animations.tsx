"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

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
  ".page-main .skill-level",
  ".page-main .education-list li",
  ".site-footer",
].join(",");

export function ScrollAnimations() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const allElements = Array.from(document.querySelectorAll<HTMLElement>(contentSelector));
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    elements.forEach((element) => element.classList.add("reveal-pending"));

    const reveal = (visibleElements: HTMLElement[]) => {
      visibleElements.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${Math.min(index * 35, 175)}ms`);
        element.classList.add("is-revealed");
      });
    };

    const initialElements = elements.filter(
      (element) => element.getBoundingClientRect().top <= window.innerHeight * 0.96,
    );
    const initialSet = new Set(initialElements);
    const deferredElements = elements.filter((element) => !initialSet.has(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement);

        if (entering.length === 0) return;
        reveal(entering);
        entering.forEach((element) => observer.unobserve(element));
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.04 },
    );

    deferredElements.forEach((element) => observer.observe(element));
    const revealFrame = requestAnimationFrame(() => reveal(initialElements));

    return () => {
      cancelAnimationFrame(revealFrame);
      observer.disconnect();
      elements.forEach((element) => {
        element.classList.remove("reveal-pending", "is-revealed");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
