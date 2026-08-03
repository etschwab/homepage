import { SiteHeader } from "@/components/site/site-header";

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
    <>
      <SiteHeader isProtected={isProtected} username={username} />
      <main>{children}</main>
    </>
  );
}
