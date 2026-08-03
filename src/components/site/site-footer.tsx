import { ImpressumModal } from "@/components/site/impressum-modal";
import { links, siteCopy } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white/70 py-8">
      <div className="site-container flex flex-col gap-5 font-mono text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>{siteCopy.footer.copyright}</p>

        <nav
          aria-label={siteCopy.footer.ariaLabel}
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <ImpressumModal />
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-sky-700 focus:text-sky-700 focus:outline-none"
          >
            {siteCopy.footer.github}
          </a>
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-sky-700 focus:text-sky-700 focus:outline-none"
          >
            {siteCopy.footer.instagram}
          </a>
        </nav>
      </div>
    </footer>
  );
}
