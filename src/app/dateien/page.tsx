import Link from "next/link";
import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";

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
            <span className="lock-mark" aria-hidden="true">
              <LockKeyhole size={21} />
            </span>
            <p className="section-eyebrow">Geschützter Bereich</p>
            <h1>
              Persönliche Dateien.<br />
              <em>Nur mit Zugang.</em>
            </h1>
            <p>
              Lebenslauf, Zeugnisse und weitere persönliche Dokumente sind
              geschützt. Bitte melden Sie sich an, um darauf zuzugreifen.
            </p>
            <Link href="/login" className="action-link">
              {siteCopy.actions.login} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="files-gate-note">
            Der Login schützt persönliche Dokumente und Kontaktangaben.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
