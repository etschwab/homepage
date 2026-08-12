import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { featuredProjects } from "@/data/profile";

type FeaturedProjectsProps = {
  context?: "home" | "projects";
};

export function FeaturedProjects({ context = "home" }: FeaturedProjectsProps) {
  return (
    <section
      className={`featured-work featured-work-${context}`}
      aria-labelledby={`${context}-featured-title`}
    >
      <div className="site-container">
        {context === "home" ? (
          <header className="section-heading">
            <h2 id={`${context}-featured-title`}>
              Anamorph, smartain<br />
              <em>und CarPin.</em>
            </h2>
            <p>
              Ein 3D-Puzzle, eine Team-App und eine mobile Parkplatz-App.
            </p>
          </header>
        ) : (
          <header className="projects-featured-heading">
            <h2 id={`${context}-featured-title`}>Drei ausgewählte Arbeiten</h2>
            <p>Anamorph, smartain und CarPin im Detail.</p>
          </header>
        )}

        <div className="featured-work-list">
          {featuredProjects.map((project, index) => (
            <article className="featured-work-item" key={project.name}>
              <div className="featured-work-visual">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 800px) calc(100vw - 2rem), 60vw"
                  className={project.imagePresentation === "phone" ? "is-phone" : undefined}
                />
              </div>

              <div className="featured-work-copy">
                <p className="project-number" aria-hidden="true">
                  0{index + 1}
                </p>
                <div>
                  <p className="project-kind">{project.kind}</p>
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-tech">{project.technologies.join(" · ")}</p>
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a
                        href={link.href}
                        key={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        <ArrowUpRight aria-hidden="true" size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {context === "home" ? (
          <Link className="inline-link featured-all-link" href="/projekte">
            Alle Projekte ansehen <span aria-hidden="true">↗</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
