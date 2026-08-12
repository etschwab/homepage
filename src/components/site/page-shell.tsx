import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

type PageShellProps = {
  children: React.ReactNode;
  isProtected?: boolean;
  username?: string;
};

export function PageShell({
  children,
  isProtected = false,
  username,
}: PageShellProps) {
  return (
    <div className="page-root">
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>
      <SiteHeader isProtected={isProtected} username={username} />
      <main className="page-main" id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
