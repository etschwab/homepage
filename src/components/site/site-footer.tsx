import Link from "next/link";

import { links, siteCopy } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <p className="footer-name"><strong>{siteCopy.footer.name}</strong></p>
        <nav aria-label={siteCopy.footer.ariaLabel}>
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            {siteCopy.footer.github}
          </a>
          <Link href="/impressum">{siteCopy.footer.imprint}</Link>
        </nav>
        <p className="footer-copy">© 2026 · Bern, Schweiz</p>
      </div>
    </footer>
  );
}
