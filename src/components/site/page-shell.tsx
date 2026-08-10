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
      <SiteHeader isProtected={isProtected} username={username} />
      <main className="page-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
