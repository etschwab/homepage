import { ExternalLink } from "lucide-react";

import { aboutSection, links } from "@/data/profile";

export function AboutSection() {
  return (
    <section className="about-page" aria-labelledby="about-title">
      <header className="editorial-hero editorial-hero-light">
        <div className="site-container editorial-grid">
          <div className="editorial-marker" aria-hidden="true">
            <span>02</span>
            <small>Porträt</small>
          </div>
          <div className="editorial-heading">
            <p className="section-label">Persönlich</p>
            <h1 id="about-title" className="page-title">
              {aboutSection.title}
            </h1>
          </div>
          <p className="editorial-lead">
            Ausbildung, Frontend-Entwicklung und die wichtigsten Dinge, die
            mich ausserhalb der Schule beschäftigen.
          </p>
        </div>
      </header>

      <div className="content-section about-content">
        <div className="site-container split-layout">
          <div>
            <p className="section-label">Porträt</p>
            <h2 className="section-title">Etienne Schwab</h2>
          </div>

          <div className="about-copy">
            {aboutSection.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a
              href={links.planary}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Planary ansehen
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          </div>
        </div>

        <dl className="site-container fact-row">
          {aboutSection.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
