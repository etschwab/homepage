import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { MainNav } from "@/components/site/main-nav";
import { navItems, siteCopy } from "@/data/profile";
import { logout } from "@/lib/auth/actions";

type SiteHeaderProps = {
  isProtected?: boolean;
  username?: string;
};

export function SiteHeader({ isProtected = false }: SiteHeaderProps) {
  return (
    <header className={`site-header${isProtected ? " has-protected-actions" : ""}`}>
      <div className="site-container header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label={siteCopy.header.startLabel}
        >
          <span
            className="wordmark-logo"
            aria-hidden="true"
          >
            <Image
              src="/images/esch.png"
              alt=""
              fill
              priority
              sizes="32px"
            />
          </span>
        </Link>

        <MainNav items={navItems} />

        {isProtected ? (
          <div className="header-actions">
            <form action={logout} className="logout-form">
              <button type="submit" aria-label={siteCopy.actions.logout}>
                <LogOut aria-hidden="true" size={16} />
                <span>{siteCopy.actions.logout}</span>
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </header>
  );
}
