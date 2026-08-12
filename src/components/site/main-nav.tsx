"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const navItems = useMemo(
    () => (internalItem ? [internalItem, ...items] : [...items]),
    [internalItem, items],
  );

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className={`main-nav-wrap${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="mobile-menu-toggle"
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
        aria-label="Hauptnavigation"
        className="mobile-menu-panel"
      >
        <ul className="nav-list">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
