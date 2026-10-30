import { ScrollAnimations } from "@/components/effects/scroll-animations";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

type PageShellProps = {
  children: React.ReactNode;
  isProtected?: boolean;
  /** Ohne Kopfzeile und Navigation, z. B. im Admin */
  hideNavigation?: boolean;
};

export function PageShell({
  children,
  isProtected = false,
  hideNavigation = false,
}: PageShellProps) {
  return (
    <div className={`page-root${hideNavigation ? " is-bare" : ""}`}>
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>
      {hideNavigation ? null : <SiteHeader isProtected={isProtected} />}
      <ScrollAnimations />
      <main className="page-main" id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
