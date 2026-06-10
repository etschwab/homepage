"use client";

import { useEffect, useMemo, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type MainNavProps = {
  items: readonly NavItem[];
  internalItem?: NavItem;
};

export function MainNav({ items, internalItem }: MainNavProps) {
  const navItems = useMemo(
    () => (internalItem ? [internalItem, ...items] : [...items]),
    [internalItem, items],
  );
  const [activeHref, setActiveHref] = useState(navItems[0]?.href ?? "#start");

  useEffect(() => {
    const sectionIds = navItems
      .map((item) => item.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1));

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visibleEntry?.target.id) {
          setActiveHref(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.08, 0.24, 0.48],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    function handlePopState() {
      const hash = window.location.hash || navItems[0]?.href || "#start";

      setActiveHref(hash);
      window.setTimeout(() => scrollToHash(hash), 0);
    }

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navItems]);

  return (
    <nav className="nav-scroll order-3 col-span-2 flex w-full items-center gap-5 overflow-x-auto border-t border-white/10 pt-3 font-mono text-sm md:order-none md:w-auto md:gap-6 md:border-0 md:pt-0">
      {navItems.map((item) => {
        const isActive = activeHref === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            className={`nav-link transition-colors focus:outline-none ${
              isActive ? "is-active" : ""
            }`}
            aria-current={isActive ? "true" : undefined}
            onClick={(event) => {
              if (!item.href.startsWith("#")) {
                return;
              }

              const target = document.querySelector<HTMLElement>(item.href);

              if (!target) {
                return;
              }

              event.preventDefault();
              window.history.pushState(null, "", item.href);
              setActiveHref(item.href);
              scrollToHash(item.href);
            }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);

  if (!target) {
    return;
  }

  const headerHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const top =
    target.getBoundingClientRect().top + window.scrollY - headerHeight - 18;

  window.scrollTo({ top, behavior: "smooth" });
}
