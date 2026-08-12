"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { moreProjects, type ProjectGroup } from "@/data/profile";

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
        <div>
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
        </div>
        <span className="project-count" aria-live="polite">
          {projects.length} {projects.length === 1 ? "Projekt" : "Projekte"}
        </span>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <article className="project-row" key={project.name}>
            <p className="project-row-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div className="project-row-title">
              <p>{project.category}</p>
              <h3>{project.name}</h3>
            </div>
            <p className="project-row-description">{project.description}</p>
            <p className="project-row-tech">{project.technologies.join(" · ")}</p>
            <div className="project-row-links">
              {project.links.map((link) => (
                <a
                  href={link.href}
                  key={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="visually-hidden">{project.name}: </span>
                  {link.label}
                  <ArrowUpRight aria-hidden="true" size={14} />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
