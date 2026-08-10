import Image from "next/image";
import Link from "next/link";

import { profile, siteCopy } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="home-hero">
      <div className="site-container home-hero-grid">
        <div className="home-hero-copy">
          <div className="home-cover-meta">
            <span>Portfolio 2026</span>
            <span>{profile.availability}</span>
            <span>{profile.location}</span>
          </div>

          <p className="home-kicker">
            <span className="page-index-inline" aria-hidden="true">01</span>
            {profile.role}
          </p>
          <h1 aria-label={profile.name}>
            <span>Etienne.</span>
            <span>Schwab.</span>
            <em>Entwickler.</em>
          </h1>
          <p className="home-intro">{profile.intro}</p>
          <Link href="/projekte" className="primary-link">
            {siteCopy.actions.projects}
          </Link>
        </div>

        <figure className="home-portrait">
          <div className="home-image-frame">
            <Image
              src="/images/etienne-cutout-v2.png"
              alt="Portrait von Etienne Schwab"
              fill
              priority
              sizes="(max-width: 768px) calc(100vw - 2rem), 42vw"
            />
            <span className="home-year" aria-hidden="true">26</span>
          </div>
          <figcaption>
            <span>Etienne Schwab</span>
            <span>IMS Bern</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
