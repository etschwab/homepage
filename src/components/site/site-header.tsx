import Link from "next/link";
import Image from "next/image";
import { Lock, LogOut, ShieldCheck } from "lucide-react";

import { navItems, profile } from "@/data/profile";
import { logout } from "@/lib/auth/actions";
import { ThemeToggle } from "@/components/site/theme-toggle";

type SiteHeaderProps = {
  isProtected?: boolean;
  username?: string;
};

export function SiteHeader({ isProtected = false, username }: SiteHeaderProps) {
  return (
    <header className="header-enter sticky top-0 z-50 border-b border-white/10 bg-[#080808]/86 backdrop-blur-md">
      <div className="site-container grid min-h-16 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-3 md:flex md:flex-nowrap md:justify-between md:gap-6 md:py-0">
        <a
          href="#start"
          className="brand-mark order-1 inline-flex shrink-0 items-center gap-2 font-mono text-sm font-semibold tracking-normal text-orange-400 md:order-none"
          aria-label="Zur Startsektion"
        >
          <Image
            src="/images/esch.png"
            alt=""
            width={28}
            height={28}
            className="rounded-full border border-orange-400/35 object-cover"
            priority
          />
          {profile.brand}
        </a>

        <nav className="nav-scroll order-3 col-span-2 flex w-full items-center gap-5 overflow-x-auto border-t border-white/10 pt-3 font-mono text-sm text-zinc-400 md:order-none md:w-auto md:gap-7 md:border-0 md:pt-0">
          {isProtected ? (
            <a
              href="#intern"
              className="nav-link text-orange-300 transition-colors hover:text-white focus:text-white focus:outline-none"
            >
              Intern
            </a>
          ) : null}
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link transition-colors hover:text-white focus:text-white focus:outline-none"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {isProtected ? (
          <div className="order-2 flex shrink-0 items-center justify-self-end gap-2 md:order-none">
            <ThemeToggle />
            <span className="hidden items-center gap-2 rounded-soft border border-orange-400/25 px-3 py-2 font-mono text-xs text-orange-300 sm:inline-flex">
              <ShieldCheck aria-hidden="true" size={14} />
              {username}
            </span>
            <form action={logout}>
              <button
                className="button-motion rounded-soft inline-flex h-10 items-center gap-2 border border-white/12 px-3 font-mono text-sm font-semibold text-white transition-colors hover:border-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400/60 sm:px-4"
                aria-label="Logout"
              >
                <LogOut aria-hidden="true" size={15} strokeWidth={2.1} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="order-2 flex shrink-0 items-center justify-self-end gap-2 md:order-none">
            <ThemeToggle />
            <Link
              href="/login"
              className="button-motion rounded-soft inline-flex h-10 shrink-0 items-center border border-white/12 px-3 font-mono text-sm font-semibold text-white transition-colors hover:border-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400/60 sm:gap-2 sm:px-4"
              aria-label="Login"
            >
              <Lock aria-hidden="true" size={15} strokeWidth={2.1} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
