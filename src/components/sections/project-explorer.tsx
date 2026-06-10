"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, ImageIcon, Search } from "lucide-react";

import type { GithubProject } from "@/types/projects";

type ProjectExplorerProps = {
  projects: GithubProject[];
  username: string;
};

const allFilter = "Alle";
const demoFilter = "Demo";

export function ProjectExplorer({ projects, username }: ProjectExplorerProps) {
  const filters = useMemo(() => getFilters(projects), [projects]);
  const [activeFilter, setActiveFilter] = useState(allFilter);
  const [selectedName, setSelectedName] = useState(projects[0]?.name ?? "");

  const filteredProjects = useMemo(
    () => filterProjects(projects, activeFilter),
    [activeFilter, projects],
  );

  const selectedProject =
    filteredProjects.find((project) => project.name === selectedName) ??
    filteredProjects[0] ??
    projects[0];

  if (!projects.length) {
    return (
      <div className="scroll-reveal rounded-soft border border-white/10 bg-black/30 p-5 text-sm leading-6 text-zinc-400">
        Auf GitHub wurden gerade keine öffentlichen Projekte gefunden.
      </div>
    );
  }

  return (
    <div className="mt-9 grid gap-5">
      <div className="flex flex-col gap-3 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
          <Search aria-hidden="true" size={15} />
          <span>
            {filteredProjects.length} von {projects.length} Projekten
          </span>
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Projektfilter">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setSelectedName(filterProjects(projects, filter)[0]?.name ?? "");
                }}
                className={`rounded-soft border px-3 py-2 font-mono text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300/70 ${
                  isActive
                    ? "border-orange-400 bg-orange-400 text-black"
                    : "border-white/10 bg-black/30 text-zinc-300 hover:border-orange-400/70 hover:text-white"
                }`}
                aria-pressed={isActive}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] xl:items-start">
        <div
          key={activeFilter}
          className="project-filter-results grid gap-3 md:grid-cols-2"
        >
          {filteredProjects.map((project) => {
            const isSelected = selectedProject?.name === project.name;

            return (
              <button
                key={project.name}
                type="button"
                onClick={() => setSelectedName(project.name)}
                className={`motion-card rounded-soft group min-h-52 border p-5 text-left focus:outline-none focus:ring-2 focus:ring-orange-300/70 ${
                  isSelected
                    ? "border-orange-400/85 bg-orange-400/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:border-orange-400/55"
                }`}
              >
                <ProjectPreview project={project} compact />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-soft border border-white/10 px-2 py-1 font-mono text-xs text-zinc-400">
                      {project.language}
                    </span>
                    {project.homepage ? (
                      <span className="rounded-soft border border-orange-400/35 bg-orange-400/10 px-2 py-1 font-mono text-xs text-orange-300">
                        Demo
                      </span>
                    ) : null}
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className={`transition-colors ${
                      isSelected
                        ? "text-orange-300"
                        : "text-zinc-600 group-hover:text-orange-400"
                    }`}
                    size={18}
                  />
                </div>

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {project.displayName}
                </h3>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
                  {project.description}
                </p>

                <p className="mt-5 font-mono text-xs text-zinc-500">
                  GitHub/{username}
                </p>
              </button>
            );
          })}
        </div>

        {selectedProject ? (
          <aside className="rounded-soft sticky top-24 overflow-hidden border border-white/10 bg-[#080808]/90 backdrop-blur-md">
            <ProjectPreview project={selectedProject} />

            <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-normal text-orange-300">
                  Projektbeschreibung
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-white">
                  {selectedProject.displayName}
                </h3>
              </div>
              <span className="rounded-soft border border-white/10 px-2 py-1 font-mono text-xs text-zinc-400">
                {selectedProject.language}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-300">
              {selectedProject.detail}
            </p>

            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-soft border border-white/10 p-3">
                <p className="font-mono text-xs text-zinc-500">Quelle</p>
                <p className="mt-1 text-white">github.com/{username}</p>
              </div>
              <div className="rounded-soft border border-white/10 p-3">
                <p className="font-mono text-xs text-zinc-500">Status</p>
                <p className="mt-1 text-white">
                  {selectedProject.archived ? "Archiviert" : "Öffentlich"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row xl:flex-col">
              <a
                href={selectedProject.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="button-motion rounded-soft inline-flex h-11 items-center justify-center gap-2 bg-orange-500 px-5 font-mono text-sm font-bold text-black transition-colors hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                Repository öffnen
                <ExternalLink aria-hidden="true" size={16} />
              </a>
              {selectedProject.homepage ? (
                <a
                  href={selectedProject.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="button-motion rounded-soft inline-flex h-11 items-center justify-center gap-2 border border-white/12 px-5 font-mono text-sm font-bold text-white transition-colors hover:border-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300/70"
                >
                  Live Demo
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
              ) : null}
            </div>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

function ProjectPreview({
  compact = false,
  project,
}: {
  compact?: boolean;
  project: GithubProject;
}) {
  const initials = getProjectInitials(project.displayName);

  if (project.imageSrc) {
    return (
      <div
        className={`project-image-frame ${compact ? "project-image-frame-sm" : ""}`}
        style={{ backgroundImage: `url(${project.imageSrc})` }}
      >
        <span className="sr-only">Projektbild zu {project.displayName}</span>
      </div>
    );
  }

  return (
    <div className={`project-image-frame ${compact ? "project-image-frame-sm" : ""}`}>
      <div className="project-image-placeholder">
        <ImageIcon aria-hidden="true" size={compact ? 18 : 24} />
        <span>{initials}</span>
      </div>
      <p className="project-image-label">Bildplatz</p>
    </div>
  );
}

function getProjectInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getFilters(projects: GithubProject[]) {
  const languages = Array.from(
    new Set(projects.map((project) => project.language).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b, "de"));

  return [allFilter, ...languages, demoFilter];
}

function filterProjects(projects: GithubProject[], activeFilter: string) {
  if (activeFilter === demoFilter) {
    return projects.filter((project) => project.homepage);
  }

  if (activeFilter !== allFilter) {
    return projects.filter((project) => project.language === activeFilter);
  }

  return projects;
}
