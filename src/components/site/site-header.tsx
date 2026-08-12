import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { MainNav } from "@/components/site/main-nav";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { navItems, siteCopy } from "@/data/profile";
import { logout } from "@/lib/auth/actions";

type SiteHeaderProps = {
  isProtected?: boolean;
  username?: string;
};

export function SiteHeader({ isProtected = false }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="wordmark" aria-label={siteCopy.header.startLabel}>
          <span className="wordmark-logo" aria-hidden="true">
            <Image
              src="/images/esch.png"
              alt=""
              fill
              sizes="46px"
              priority
            />
          </span>
          <span className="wordmark-name">Etienne Schwab</span>
        </Link>

        <MainNav items={navItems} />

        <div className="header-actions">
          <ThemeToggle />
          {isProtected ? (
            <form action={logout} className="logout-form">
              <button type="submit" aria-label={siteCopy.actions.logout}>
                <LogOut aria-hidden="true" size={16} />
                <span>{siteCopy.actions.logout}</span>
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </header>
  );
}
