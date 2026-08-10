"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

import { moreProjects, type ProjectGroup, type ProjectLink } from "@/data/profile";

type Filter = "Alle" | ProjectGroup;

const filters: readonly Filter[] = ["Alle", "Web", "Schule", "Hardware", "Desktop"];

export function ProjectArchive() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Alle");
  const projects = useMemo(
    () =>
      activeFilter === "Alle"
        ? moreProjects
        : moreProjects.filter((project) => project.group === activeFilter),
    [activeFilter],
  );

  return (
    <div className="project-archive">
      <div className="project-filters" aria-label="Projekte filtern">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={activeFilter === filter ? "is-active" : undefined}
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
        <span className="project-count" aria-live="polite">
          {projects.length} Projekte
        </span>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <div className="project-card-content">
              <p className="project-kind">{project.category}</p>
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-tech">{project.technologies.join(" · ")}</p>
            </div>
            <ArchiveLinks links={project.links} />
          </article>
        ))}
      </div>
    </div>
  );
}

function ArchiveLinks({ links }: { links: readonly ProjectLink[] }) {
  if (!links.length) return null;

  return (
    <div className="project-links project-card-links">
      {links.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
          <ExternalLink aria-hidden="true" size={13} />
        </a>
      ))}
    </div>
  );
}
