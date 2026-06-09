import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#080808]/82 py-8 backdrop-blur-md">
      <div className="site-container flex flex-col gap-5 font-mono text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Etienne Schwab</p>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <Link
            href="/impressum"
            className="transition-colors hover:text-orange-300 focus:text-orange-300 focus:outline-none"
          >
            Impressum
          </Link>
          <a
            href="https://github.com/schwabetienne"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-orange-300 focus:text-orange-300 focus:outline-none"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/planaryofficial/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-orange-300 focus:text-orange-300 focus:outline-none"
          >
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
