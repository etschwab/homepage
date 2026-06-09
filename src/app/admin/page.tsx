import { PortfolioPage } from "@/components/site/portfolio-page";
import { verifySession } from "@/lib/auth/dal";

export default async function AdminPage() {
  const session = await verifySession();

  return <PortfolioPage isProtected username={session.username} />;
}
