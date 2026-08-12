import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

import { profile, siteCopy } from "@/data/profile";

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
          <p className="home-intro">{profile.intro}</p>
          <Link href="#selected-work" className="inline-link home-scroll-link">
            {siteCopy.actions.projects}
            <ArrowDownRight aria-hidden="true" size={16} />
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
          </div>
          <figcaption>
            <span>{profile.availability}</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>

      </div>
    </section>
  );
}
