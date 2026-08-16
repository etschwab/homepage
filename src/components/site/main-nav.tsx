"use client";

import Link from "next/link";
import { ArrowRight, FolderLock, Grid2X2, House, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";

type NavItem = {
  index?: string;
  label: string;
  href: string;
};

type MainNavProps = {
  items: readonly NavItem[];
  internalItem?: NavItem;
};

export function MainNav({ items, internalItem }: MainNavProps) {
  const pathname = usePathname();
  const navItems = useMemo(
    () => (internalItem ? [internalItem, ...items] : [...items]),
    [internalItem, items],
  );
  const icons = [House, UserRound, Grid2X2, FolderLock];
  const desktopItems = navItems.slice(0, -1);
  const actionItem = navItems.at(-1);

  useLayoutEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;

    let frame = 0;
    const updateHeader = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        header.classList.toggle("is-compact", window.scrollY > 96);
      });
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
      header.classList.remove("is-compact");
    };
  }, [pathname]);

  return (
    <div className="main-nav-wrap">
      <nav id="main-navigation" aria-label="Hauptnavigation" className="mobile-menu-panel">
        <ul className="nav-list nav-list-desktop" style={{ gridColumn: 2 }}>
          {desktopItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {actionItem ? (
          <Link
            href={actionItem.href}
            className={`nav-action${pathname.startsWith(actionItem.href) ? " is-active" : ""}`}
            aria-current={pathname.startsWith(actionItem.href) ? "page" : undefined}
          >
            <span>{actionItem.label}</span>
            <ArrowRight aria-hidden="true" size={17} strokeWidth={2.4} />
          </Link>
        ) : null}

        <ul className="nav-list nav-list-mobile">
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            const Icon = icons[index] ?? FolderLock;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon aria-hidden="true" size={18} strokeWidth={1.9} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
