import Link from "next/link";

import { SiteFooter } from "@/components/site/site-footer";
import { profile } from "@/data/profile";

export default function ImpressumPage() {
  return (
    <>
      <main className="site-container min-h-svh py-12 sm:py-16">
        <Link
          href="/"
          className="font-mono text-sm text-zinc-400 transition-colors hover:text-orange-300"
        >
          Zurueck zur Seite
        </Link>

        <section className="mt-10 max-w-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-md sm:p-8">
          <p className="font-mono text-sm text-orange-400">Impressum</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Angaben zur Website
          </h1>

          <div className="mt-8 grid gap-6 text-sm leading-7 text-zinc-400">
            <div>
              <h2 className="font-mono text-base font-semibold text-white">
                Verantwortlich
              </h2>
              <p className="mt-2">
                Etienne Schwab
                <br />
                Schweiz
              </p>
            </div>

            <div>
              <h2 className="font-mono text-base font-semibold text-white">
                Kontakt
              </h2>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 inline-block text-orange-300 transition-colors hover:text-orange-200"
              >
                {profile.email}
              </a>
            </div>

            <p>
              Diese Website ist eine persoenliche Portfolio- und Bewerbungsseite.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
