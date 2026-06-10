import Link from "next/link";
import Image from "next/image";
import { Lock, LogOut, ShieldCheck } from "lucide-react";

import { MainNav } from "@/components/site/main-nav";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { navItems, profile, siteCopy } from "@/data/profile";
import { logout } from "@/lib/auth/actions";

type SiteHeaderProps = {
  isProtected?: boolean;
  username?: string;
};

export function SiteHeader({ isProtected = false, username }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/72 backdrop-blur-xl">
      <div className="site-container grid min-h-16 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-3 md:flex md:flex-nowrap md:justify-between md:gap-6 md:py-0">
        <a
          href="#start"
          className="order-1 inline-flex shrink-0 items-center gap-2 font-mono text-sm font-semibold tracking-normal text-white md:order-none"
          aria-label={siteCopy.header.startLabel}
        >
          <Image
            src="/images/esch.png"
            alt={siteCopy.header.logoAlt}
            width={28}
            height={28}
            className="rounded-full border border-white/15 object-cover"
            priority
          />
          {profile.brand}
        </a>

        <MainNav
          items={navItems}
          internalItem={
            isProtected
              ? { label: siteCopy.header.internalLink, href: "#intern" }
              : undefined
          }
        />

        {isProtected ? (
          <div className="order-2 flex shrink-0 items-center justify-self-end gap-2 md:order-none">
            <span className="hidden items-center gap-2 rounded-soft border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 font-mono text-xs text-cyan-100 sm:inline-flex">
              <ShieldCheck aria-hidden="true" size={14} />
              {username}
            </span>
            <form action={logout}>
              <button
                className="button-motion rounded-soft inline-flex h-10 items-center gap-2 border border-white/10 px-3 font-mono text-sm font-semibold text-zinc-200 hover:border-cyan-300/45 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/30 sm:px-4"
                aria-label={siteCopy.actions.logout}
              >
                <LogOut aria-hidden="true" size={15} strokeWidth={2.1} />
                <span className="hidden sm:inline">{siteCopy.actions.logout}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="order-2 flex shrink-0 items-center justify-self-end gap-2 md:order-none">
            <Link
              href="/login"
              className="button-motion rounded-soft inline-flex h-10 shrink-0 items-center border border-white/10 px-3 font-mono text-sm font-semibold text-zinc-200 hover:border-cyan-300/45 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/30 sm:gap-2 sm:px-4"
              aria-label={siteCopy.actions.login}
            >
              <Lock aria-hidden="true" size={15} strokeWidth={2.1} />
              <span className="hidden sm:inline">{siteCopy.actions.login}</span>
            </Link>
          </div>
        )}
      </div>
      <ScrollProgress />
    </header>
  );
}
