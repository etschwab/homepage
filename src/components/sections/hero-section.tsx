import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="home-hero">
      <div className="site-container home-hero-grid">
        <div className="home-hero-copy">
          <p className="home-kicker">Portfolio · IMS Bern · 2026</p>
          <h1>
            Etienne
            <em>Schwab.</em>
          </h1>
          <p className="home-role">{profile.role}</p>
        </div>

        <aside className="home-hero-overview" aria-label="Portfolioübersicht">
          <p>{profile.intro}</p>
          <div className="home-profile-meta" aria-label="Standort und Verfügbarkeit">
            <span>{profile.location}</span>
            <span>{profile.availability}</span>
          </div>
          <div className="home-landing-links">
            <Link href="/ueber-mich" className="inline-link">
              Über mich <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
            <Link href="/projekte" className="inline-link">
              Projekte <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
