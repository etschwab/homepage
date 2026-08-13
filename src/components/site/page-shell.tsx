import { ScrollAnimations } from "@/components/effects/scroll-animations";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { readSession } from "@/lib/auth/session";

type PageShellProps = {
  children: React.ReactNode;
  showFooter?: boolean;
};

export async function PageShell({
  children,
  showFooter = true,
}: PageShellProps) {
  const session = await readSession();

  return (
    <div className="page-root">
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>
      <SiteHeader isAuthenticated={Boolean(session)} />
      <ScrollAnimations />
      <main className="page-main" id="main-content">{children}</main>
      {showFooter ? <SiteFooter /> : null}
    </div>
  );
}
