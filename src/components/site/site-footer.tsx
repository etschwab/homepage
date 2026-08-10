import { ImpressumModal } from "@/components/site/impressum-modal";
import { links, siteCopy } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <p className="footer-name">
          <strong>{siteCopy.footer.name}</strong>
          <span>Portfolio · Bern</span>
        </p>
        <nav aria-label={siteCopy.footer.ariaLabel}>
          <ImpressumModal />
          <span aria-hidden="true">·</span>
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            {siteCopy.footer.github}
          </a>
        </nav>
        <p>{siteCopy.footer.copyright}</p>
      </div>
    </footer>
  );
}
