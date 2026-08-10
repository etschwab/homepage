import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { ContactSection } from "@/components/sections/contact-section";
import { PrivateSection } from "@/components/sections/private-section";
import { PageShell } from "@/components/site/page-shell";
import { siteCopy } from "@/data/profile";
import { readSession } from "@/lib/auth/session";

export default async function FilesPage() {
  const session = await readSession();

  if (session) {
    return (
      <PageShell isProtected username={session.username}>
        <PrivateSection username={session.username} />
        <ContactSection />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="files-public">
        <div className="site-container files-public-inner">
          <LockKeyhole aria-hidden="true" size={24} />
          <p className="section-label">
            <span className="page-index-inline" aria-hidden="true">04</span>
            Geschützter Bereich
          </p>
          <h1 className="page-title">Dateien</h1>
          <p>
            Lebenslauf, Zeugnisse und weitere persönliche Dokumente sind
            geschützt. Bitte melden Sie sich an, um darauf zuzugreifen.
          </p>
          <Link href="/login" className="primary-link">
            {siteCopy.actions.login}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
