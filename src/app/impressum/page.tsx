import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, ShieldCheck, UserRound } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { siteCopy } from "@/data/profile";

export const metadata: Metadata = {
  title: "Impressum | Etienne Schwab",
  description:
    "Impressum und Kontaktangaben zur persönlichen Portfolio-Website von Etienne Schwab.",
};

const detailIcons = [UserRound, Mail, MapPin, ShieldCheck] as const;

export default function ImpressumPage() {
  return (
    <PageShell>
      <section className="legal-page">
        <div className="site-container">
          <div className="legal-hero">
            <p className="section-label">{siteCopy.footer.imprint}</p>
            <h1>{siteCopy.imprint.title}</h1>
            <p>{siteCopy.imprint.description}</p>
          </div>

          <dl className="legal-grid">
            {siteCopy.imprint.rows.map((row, index) => {
              const Icon = detailIcons[index] ?? ShieldCheck;

              return (
                <div className="legal-detail-card" key={row.label}>
                  <Icon aria-hidden="true" size={20} />
                  <dt>{row.label}</dt>
                  <dd>
                    {"href" in row ? (
                      <a href={row.href}>{row.value}</a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="legal-notes">
            {siteCopy.imprint.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>

          <Link className="legal-back-link" href="/">
            Zurück zur Startseite
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
