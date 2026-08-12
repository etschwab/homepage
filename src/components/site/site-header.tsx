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
    <header className="site-header">
      <div className="site-container header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label={siteCopy.header.startLabel}
          style={{
            display: "grid",
            minWidth: "5.45rem",
            height: "2.5rem",
            placeItems: "center",
            justifySelf: "start",
            borderRadius: "999px",
            background: "var(--accent)",
          }}
        >
          <span
            className="wordmark-logo"
            aria-hidden="true"
            style={{
              position: "relative",
              width: "2rem",
              height: "2rem",
              overflow: "hidden",
              background: "var(--accent)",
              isolation: "isolate",
            }}
          >
            <Image
              src="/images/esch.png"
              alt=""
              fill
              priority
              sizes="32px"
              style={{
                objectFit: "cover",
                filter: "invert(1)",
                mixBlendMode: "multiply",
                transform: "scale(1.62)",
              }}
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
