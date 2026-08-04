"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Search, Trophy } from "lucide-react";

import { siteCopy, type ProjectCategory } from "@/data/profile";
import type { PortfolioProject } from "@/types/projects";
import styles from "./project-showcase.module.css";

type ProjectExplorerProps = {
  projects: PortfolioProject[];
  username: string;
};

type ProjectFilter = "all" | ProjectCategory;

export function ProjectExplorer({ projects, username }: ProjectExplorerProps) {
  const filters = useMemo(
    () =>
      [
        { id: "all", label: siteCopy.projects.filters.all },
        { id: "gibb", label: siteCopy.projects.filters.gibb },
        { id: "personal", label: siteCopy.projects.filters.personal },
      ] satisfies { id: ProjectFilter; label: string }[],
    [],
  );
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
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
      <div className="mt-10 rounded-[1.75rem] border border-white/70 bg-white/62 shadow-[0_18px_50px_rgba(17,19,24,0.06)] backdrop-blur-md p-5 text-sm leading-6 text-zinc-500">
        {siteCopy.projects.empty}
      </div>
    );
  }

  return (
    <div className="relative z-[1] mt-6 grid gap-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
          <span className="h-6 w-px bg-sky-200/55" aria-hidden="true" />
          <Search aria-hidden="true" size={15} />
          <span>
            {filteredProjects.length} {siteCopy.projects.countSeparator}{" "}
            {projects.length}
          </span>
        </div>

        <div
          className="flex flex-wrap gap-2"
          aria-label={siteCopy.projects.filterLabel}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => {
                  const nextProjects = filterProjects(projects, filter.id);

                  setActiveFilter(filter.id);
                  setSelectedName(nextProjects[0]?.name ?? "");
                }}
                className={`rounded-soft border px-3 py-2 font-mono text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-200/20 ${
                  isActive
                    ? "border-sky-300/70 bg-sky-200/55 text-sky-950 shadow-sm"
                    : "border-black/10 bg-white/55 text-zinc-500 hover:border-sky-300/60 hover:bg-white/85 hover:text-zinc-950"
                }`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] xl:items-start ${styles.projectStage}`}
      >
        <div
          key={activeFilter}
          className="project-filter-results grid gap-4 md:grid-cols-2"
        >
          {filteredProjects.map((project) => {
            const isSelected = selectedProject?.name === project.name;

            return (
              <button
                key={project.name}
                type="button"
                onClick={() => setSelectedName(project.name)}
                className={`motion-card group rounded-[1.75rem] border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-200/40 ${styles.trophyCase} ${
                  isSelected
                    ? "border-sky-300/70 bg-sky-100/65 shadow-[0_18px_50px_rgba(83,174,232,0.16)]"
                    : "border-white/70 bg-white/62 hover:border-sky-300/70 hover:bg-white/85"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className={styles.trophyMark} aria-hidden="true">
                      <Trophy size={17} strokeWidth={1.7} />
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-black/10 px-2 py-1 font-mono text-xs text-zinc-500">
                        {project.language}
                      </span>
                      <span className="rounded-[1.5rem] border border-sky-200/50 bg-sky-100/55 px-2 py-1 font-mono text-xs text-sky-700/90">
                        {siteCopy.projects.categories[project.category]}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className={`transition-colors ${
                      isSelected
                        ? "text-sky-700"
                        : "text-zinc-500 group-hover:text-zinc-800"
                    }`}
                    size={18}
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-zinc-950">
                  {project.displayName}
                </h3>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-500">
                  {project.description}
                </p>

                <p
                  className={`mt-5 font-mono text-xs text-zinc-500 ${styles.pedestal}`}
                >
                  {getSourceText(project, username)}
                </p>
              </button>
            );
          })}
        </div>

        {selectedProject ? (
          <aside
            className={`rounded-[2rem] border border-white/70 bg-white/72 p-6 shadow-[0_24px_80px_rgba(17,19,24,0.08)] backdrop-blur-md ${styles.detailCase}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-normal text-sky-700/80">
                  {siteCopy.projects.abstract}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-zinc-950">
                  {selectedProject.displayName}
                </h3>
              </div>
              <span className="rounded-full border border-black/10 px-2 py-1 font-mono text-xs text-zinc-500">
                {selectedProject.language}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-500">
              {selectedProject.detail}
            </p>

            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
                <p className="font-mono text-xs text-zinc-500">
                  {siteCopy.projects.source}
                </p>
                <p className="mt-1 text-zinc-900">
                  {getSourceText(selectedProject, username)}
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
                <p className="font-mono text-xs text-zinc-500">
                  {siteCopy.projects.status}
                </p>
                <p className="mt-1 text-zinc-900">
                  {selectedProject.archived
                    ? siteCopy.projects.archivedStatus
                    : siteCopy.projects.publicStatus}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row xl:flex-col">
              <a
                href={selectedProject.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-primary button-motion inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-200/40"
              >
                {selectedProject.primaryActionLabel}
                <ExternalLink aria-hidden="true" size={16} />
              </a>
              {selectedProject.homepage &&
              selectedProject.homepage !== selectedProject.htmlUrl ? (
                <a
                  href={selectedProject.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-secondary button-motion inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-200/40"
                >
                  {siteCopy.actions.demo}
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
              ) : null}
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

function filterProjects(
  projects: PortfolioProject[],
  activeFilter: ProjectFilter,
) {
  if (activeFilter === "all") {
    return projects;
  }

  return projects.filter((project) => project.category === activeFilter);
}

function getSourceText(project: PortfolioProject, username: string) {
  if (project.sourceLabel !== "GitHub") {
    return project.sourceLabel;
  }

  try {
    const url = new URL(project.htmlUrl);
    const [owner] = url.pathname.split("/").filter(Boolean);

    return `${url.hostname}/${owner ?? username}`;
  } catch {
    return `${siteCopy.projects.githubDomain}/${username}`;
  }
}
