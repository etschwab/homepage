import Image from "next/image";
import { ExternalLink } from "lucide-react";

import {
  featuredProjects,
  type ProjectLink,
} from "@/data/profile";
import { ProjectArchive } from "@/components/sections/project-archive";

export function WorkSection() {
  return (
    <section className="projects-page" aria-labelledby="projects-title">
      <header className="editorial-hero editorial-hero-dark">
        <div className="site-container editorial-grid">
          <div className="editorial-marker" aria-hidden="true">
            <span>03</span>
            <small>Projekte</small>
          </div>
          <div className="editorial-heading">
            <p className="section-label">Projektübersicht</p>
            <h1 id="projects-title" className="page-title">Projekte</h1>
          </div>
          <p className="editorial-lead">
            Drei ausgewählte Arbeiten im Fokus. Weitere Schul-, Web- und
            Hardwareprojekte folgen kompakt darunter.
          </p>
        </div>
      </header>

      <div className="site-container featured-projects">
        {featuredProjects.map((project) => (
          <article className="featured-project" key={project.name}>
            <div
              className={`project-image-wrap ${
                project.imagePresentation === "phone"
                  ? "project-image-wrap-phone"
                  : ""
              }`}
            >
              {project.imagePresentation === "phone" ? (
                <Image
                  src={project.imageSrc}
                  alt=""
                  fill
                  sizes="(max-width: 767px) calc(100vw - 2rem), 48vw"
                  className="project-image-backdrop"
                  aria-hidden="true"
                />
              ) : null}
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 767px) calc(100vw - 2rem), 48vw"
                className={`project-image ${
                  project.imagePresentation === "phone"
                    ? "project-image-phone"
                    : ""
                }`}
                loading="eager"
              />
            </div>

            <div className="featured-project-copy">
              <p className="project-kind">{project.kind}</p>
              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <p className="project-tech">{project.technologies.join(" · ")}</p>
              <ProjectLinks links={project.links} />
            </div>
          </article>
        ))}
      </div>

      <div className="site-container more-projects">
        <div className="more-projects-heading">
          <h2>Weitere Projekte</h2>
          <p>Nach Bereich filtern und passende Projekte anzeigen.</p>
        </div>
        <ProjectArchive />
      </div>
    </section>
  );
}

function ProjectLinks({ links }: { links: readonly ProjectLink[] }) {
  if (!links.length) {
    return null;
  }

  return (
    <div className="project-links">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
          <ExternalLink aria-hidden="true" size={13} />
        </a>
      ))}
    </div>
  );
}
