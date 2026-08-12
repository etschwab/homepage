import Link from "next/link";
import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";
import { PrivateSection } from "@/components/sections/private-section";
import { PageShell } from "@/components/site/page-shell";
import { siteCopy } from "@/data/profile";
import { readSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Dateien",
  description: "Geschützter Dokumentenbereich von Etienne Schwab.",
  robots: { index: false, follow: false },
};

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
      <section className="files-gate">
        <div className="site-container files-gate-grid">
          <p className="page-number" aria-hidden="true">04</p>
          <div className="files-gate-copy">
            <h1>
              Persönliche<br />
              <em>Dateien.</em>
            </h1>
            <p>
              Lebenslauf, Zeugnisse und weitere persönliche Dokumente sind
              geschützt. Melde dich an, um sie anzusehen.
            </p>
            <Link href="/login" className="action-link">
              {siteCopy.actions.login} <span aria-hidden="true">→</span>
            </Link>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
