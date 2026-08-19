"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";

import {
  featuredProjects,
  moreProjects,
  type ProjectGroup,
} from "@/data/profile";
import { useModalScrollLock } from "@/hooks/use-modal-scroll-lock";

type Filter = "Alle" | ProjectGroup;

const filters: readonly Filter[] = ["Alle", "Web", "Schule", "Hardware", "Desktop"];
const featuredGroups: readonly ProjectGroup[] = ["Schule", "Web", "Schule"];

const projects = [
  ...featuredProjects.map((project, index) => ({
    ...project,
    group: featuredGroups[index],
    category: project.kind,
    featured: true as const,
  })),
  ...moreProjects.map((project) => ({
    ...project,
    imageSrc: "imageSrc" in project ? project.imageSrc : undefined,
    imageAlt: "imageAlt" in project ? project.imageAlt : undefined,
    imagePresentation:
      "imagePresentation" in project ? project.imagePresentation : undefined,
    featured: false as const,
  })),
];

type Project = (typeof projects)[number];

export function ProjectArchive() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Alle");
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useModalScrollLock(Boolean(selectedProject));

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("de-CH");

    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "Alle" || project.group === activeFilter;
      const searchableText = [
        project.name,
        project.category,
        project.description,
        project.group,
        ...project.technologies,
      ]
        .join(" ")
        .toLocaleLowerCase("de-CH");

      return matchesFilter && searchableText.includes(normalizedQuery);
    });
  }, [activeFilter, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedProject && !dialog.open) dialog.showModal();
    if (!selectedProject && dialog.open) dialog.close();
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedProject]);

  return (
    <div className="project-browser">
      <div className="project-browser-tools">
        <label className="project-search">
          <Search aria-hidden="true" size={19} strokeWidth={1.7} />
          <span className="visually-hidden">Projekte durchsuchen</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Projekt oder Technologie suchen"
          />
        </label>

        <div className="project-filter-bar" aria-label="Projekte filtern">
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
          <span aria-live="polite">
            {visibleProjects.length} {visibleProjects.length === 1 ? "Projekt" : "Projekte"}
          </span>
        </div>
      </div>

      {visibleProjects.length ? (
        <div className="project-card-grid">
          {visibleProjects.map((project, index) => (
            <article
              className={`project-card${project.featured ? " is-featured" : ""}`}
              key={project.name}
            >
              <button
                className="project-card-open"
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-label={`${project.name}: Projektdetails öffnen`}
              >
                {project.imageSrc ? (
                  <div className="project-card-image">
                    <Image
                      src={project.imageSrc}
                      alt={project.imageAlt ?? ""}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 800px) calc(100vw - 2rem), (max-width: 1200px) 50vw, 33vw"
                      className={
                        project.imagePresentation === "phone"
                          ? "is-phone"
                          : project.imagePresentation === "screenshot"
                            ? "is-screenshot"
                            : project.imagePresentation === "portrait"
                              ? "is-portrait"
                              : undefined
                      }
                    />
                    <span className="project-card-hover-label">
                      Abstract ansehen <ArrowUpRight aria-hidden="true" size={16} />
                    </span>
                  </div>
                ) : (
                  <div className="project-card-graphic" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{project.name.slice(0, 2)}</strong>
                    <i>Details ansehen</i>
                  </div>
                )}

                <div className="project-card-body">
                  <div className="project-card-heading">
                    <p>{project.category}</p>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p className="project-card-description">{project.description}</p>
                  <p className="project-card-tech">{project.technologies.join(" · ")}</p>
                  <span className="project-card-detail-link">
                    Projektabstract öffnen <ArrowUpRight aria-hidden="true" size={14} />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="project-empty-state">
          Kein Projekt passt zu dieser Suche.
        </p>
      )}

      <dialog
        ref={dialogRef}
        className={`project-dialog${selectedProject?.imagePresentation === "portrait" ? " is-portrait-project" : ""}`}
        aria-labelledby="project-dialog-title"
        onCancel={() => setSelectedProject(null)}
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setSelectedProject(null);
        }}
      >
        {selectedProject ? (
          <div className="project-dialog-panel">
            <button
              type="button"
              className="project-dialog-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Projektdetails schließen"
            >
              <X aria-hidden="true" size={20} />
            </button>

            {selectedProject.imageSrc ? (
              <div className="project-dialog-image">
                <Image
                  src={selectedProject.imageSrc}
                  alt={selectedProject.imageAlt ?? ""}
                  fill
                  sizes="(max-width: 800px) calc(100vw - 3rem), 44rem"
                  className={
                    selectedProject.imagePresentation === "phone"
                      ? "is-phone"
                      : selectedProject.imagePresentation === "screenshot"
                        ? "is-screenshot"
                        : selectedProject.imagePresentation === "portrait"
                          ? "is-portrait"
                          : undefined
                  }
                />
              </div>
            ) : (
              <div className="project-dialog-graphic" aria-hidden="true">
                <strong>{selectedProject.name.slice(0, 2)}</strong>
              </div>
            )}

            <div className="project-dialog-content">
              <p>{selectedProject.category}</p>
              <h2 id="project-dialog-title">{selectedProject.name}</h2>
              <p className="project-dialog-description">{selectedProject.description}</p>
              <p className="project-dialog-tech">
                {selectedProject.technologies.join(" · ")}
              </p>

              <section
                className="project-abstract"
                aria-labelledby="project-abstract-title"
              >
                <h3 id="project-abstract-title">Projektabstract</h3>
                <dl>
                  <div>
                    <dt>Ziel</dt>
                    <dd>{selectedProject.abstract.goal}</dd>
                  </div>
                  <div>
                    <dt>Umsetzung</dt>
                    <dd>{selectedProject.abstract.implementation}</dd>
                  </div>
                  <div>
                    <dt>Meine Rolle</dt>
                    <dd>{selectedProject.abstract.role}</dd>
                  </div>
                  <div>
                    <dt>Was ich gelernt habe</dt>
                    <dd>{selectedProject.abstract.learnings}</dd>
                  </div>
                </dl>
              </section>

              {selectedProject.links.length ? (
                <div className="project-dialog-links">
                  {selectedProject.links.map((link) => (
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
              ) : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
