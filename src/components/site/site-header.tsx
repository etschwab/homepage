import Link from "next/link";
import Image from "next/image";
import { Lock, LogOut, ShieldCheck } from "lucide-react";

import { MainNav } from "@/components/site/main-nav";
import { navItems, siteCopy } from "@/data/profile";
import { logout } from "@/lib/auth/actions";

type SiteHeaderProps = {
  isProtected?: boolean;
  username?: string;
};

export function SiteHeader({ isProtected = false, username }: SiteHeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50 -mb-20">
      <div className="site-frame grid min-h-20 grid-cols-[auto_1fr_auto] items-center gap-3 py-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center"
          aria-label={siteCopy.header.startLabel}
        >
          <Image
            src="/images/esch.png"
            alt={siteCopy.header.logoAlt}
            width={52}
            height={52}
            className="h-11 w-11 rounded-[0.35rem] object-cover shadow-[0_16px_34px_rgba(17,19,24,0.16)] sm:h-12 sm:w-12"
            priority
          />
        </Link>

        <MainNav
          items={navItems}
          internalItem={
            isProtected
              ? { label: siteCopy.header.internalLink, href: "/admin" }
              : undefined
          }
        />

        {isProtected ? (
          <div className="flex shrink-0 items-center justify-self-end gap-2">
            <span className="hidden items-center gap-2 font-mono text-xs font-semibold text-black/72 sm:inline-flex">
              <ShieldCheck aria-hidden="true" size={14} />
              {username}
            </span>
            <form action={logout}>
              <button
                className="button-motion inline-flex h-10 items-center gap-2 rounded-full border border-black/12 bg-white/28 px-3 font-mono text-sm font-semibold text-black/78 backdrop-blur-sm hover:border-sky-300/70 hover:bg-white/44 focus:outline-none focus:ring-2 focus:ring-sky-200/70 sm:px-4"
                aria-label={siteCopy.actions.logout}
              >
                <LogOut aria-hidden="true" size={15} strokeWidth={2.1} />
                <span className="hidden sm:inline">{siteCopy.actions.logout}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex shrink-0 items-center justify-self-end gap-2">
            <Link
              href="/login"
              className="button-motion inline-flex h-10 shrink-0 items-center rounded-full border border-black/12 bg-white/28 px-3 font-mono text-sm font-semibold text-black/78 shadow-sm backdrop-blur-sm hover:border-sky-300/70 hover:bg-white/44 focus:outline-none focus:ring-2 focus:ring-sky-200/70 sm:gap-2 sm:px-4"
              aria-label={siteCopy.actions.login}
            >
              <Lock aria-hidden="true" size={15} strokeWidth={2.1} />
              <span className="hidden sm:inline">{siteCopy.actions.login}</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
