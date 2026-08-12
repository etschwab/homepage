import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/site/page-shell";
import { siteCopy } from "@/data/profile";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und Kontaktangaben zur persönlichen Portfolio-Website von Etienne Schwab.",
};

export default function ImpressumPage() {
  return (
    <PageShell>
      <section className="legal-page">
        <div className="site-container">
          <div className="legal-hero">
            <h1>{siteCopy.imprint.title}<em>.</em></h1>
            <p>{siteCopy.imprint.description}</p>
          </div>

          <dl className="legal-list">
            {siteCopy.imprint.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    {"href" in row ? (
                      <a href={row.href}>{row.value}</a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
            ))}
          </dl>

          <div className="legal-notes">
            {siteCopy.imprint.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>

          <Link className="inline-link legal-back-link" href="/">
            Zurück zur Startseite <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
