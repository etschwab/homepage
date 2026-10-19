import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/site/page-shell";
import { getContent } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und Kontaktangaben zur persönlichen Portfolio-Website von Etienne Schwab.",
};

export default async function ImpressumPage() {
  const { imprint } = await getContent();

  return (
    <PageShell>
      <section className="legal-page">
        <div className="site-container">
          <div className="legal-hero">
            <h1>{imprint.title}<em>.</em></h1>
            <p>{imprint.description}</p>
          </div>

          <dl className="legal-list">
            {imprint.rows.map((row, index) => (
                <div key={index}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.href ? (
                      <a href={row.href}>{row.value}</a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
            ))}
          </dl>

          <div className="legal-notes">
            {imprint.notes.map((note, index) => (
              <p key={index}>{note}</p>
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
