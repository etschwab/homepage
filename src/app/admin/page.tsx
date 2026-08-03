import { ContactSection } from "@/components/sections/contact-section";
import { PrivateSection } from "@/components/sections/private-section";
import { PageShell } from "@/components/site/page-shell";
import { verifySession } from "@/lib/auth/dal";

export default async function AdminPage() {
  const session = await verifySession();

  return (
    <PageShell
      isProtected
      username={session.username}
    >
      <PrivateSection username={session.username} />
      <ContactSection isProtected />
    </PageShell>
  );
}
