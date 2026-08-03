"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type MainNavProps = {
  items: readonly NavItem[];
  internalItem?: NavItem;
};

export function MainNav({ items, internalItem }: MainNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = useMemo(
    () => (internalItem ? [internalItem, ...items] : [...items]),
    [internalItem, items],
  );

  return (
    <div className="relative justify-self-end md:justify-self-center">
      <button
        type="button"
        className="mobile-menu-toggle button-motion inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/12 bg-white/34 text-black/78 shadow-sm backdrop-blur-md hover:border-sky-300/70 hover:bg-white/52 focus:outline-none focus:ring-2 focus:ring-sky-200/70 md:hidden"
        aria-controls="main-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Navigation schliessen" : "Navigation öffnen"}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? (
          <X aria-hidden="true" size={18} strokeWidth={2.2} />
        ) : (
          <Menu aria-hidden="true" size={18} strokeWidth={2.2} />
        )}
      </button>

      <nav
        id="main-navigation"
        className={`nav-scroll mobile-menu-panel font-mono text-sm ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link focus:outline-none ${
                isActive ? "is-active" : ""
              }`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
