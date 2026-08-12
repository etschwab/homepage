import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { aboutSection, links } from "@/data/profile";

export function AboutSection() {
  return (
    <section className="about-page" aria-labelledby="about-title">
      <header className="site-container about-title">
        <h1 id="about-title">Über mich</h1>
      </header>

      <div className="site-container about-story">
        <figure className="about-portrait">
          <Image
            src="/images/etienne-cutout-v2.png"
            alt="Etienne Schwab"
            fill
            sizes="(max-width: 800px) calc(100vw - 2rem), 42vw"
            priority
          />
        </figure>

        <div className="about-story-copy">
          {aboutSection.paragraphs.map((paragraph, index) => (
            <p className={index === 0 ? "about-story-lead" : undefined} key={paragraph}>
              {paragraph}
            </p>
          ))}
          <a
            href={links.planary}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            Planary ansehen <ArrowUpRight aria-hidden="true" size={15} />
          </a>

          <dl className="about-facts">
            {aboutSection.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
