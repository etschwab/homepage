"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Search } from "lucide-react";

import { siteCopy, type ProjectCategory } from "@/data/profile";
import type { GithubProject } from "@/types/projects";

type ProjectExplorerProps = {
  projects: GithubProject[];
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
      <div className="mt-10 rounded-soft border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-zinc-400">
        {siteCopy.projects.empty}
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6">
      <div className="flex flex-col gap-3 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
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
                className={`rounded-soft border px-3 py-2 font-mono text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-300/30 ${
                  isActive
                    ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                    : "border-white/10 bg-white/[0.025] text-zinc-400 hover:border-cyan-300/35 hover:text-white"
                }`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] xl:items-start">
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
                className={`motion-card rounded-soft group border bg-black/35 p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-300/30 ${
                  isSelected
                    ? "border-cyan-300/40 shadow-[0_0_45px_rgba(103,232,249,0.08)]"
                    : "border-white/10 hover:border-cyan-300/30"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-soft border border-white/10 px-2 py-1 font-mono text-xs text-zinc-400">
                      {project.language}
                    </span>
                    <span className="rounded-soft border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 font-mono text-xs text-cyan-100">
                      {siteCopy.projects.categories[project.category]}
                    </span>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className={`transition-colors ${
                      isSelected
                        ? "text-cyan-100"
                        : "text-zinc-600 group-hover:text-zinc-200"
                    }`}
                    size={18}
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {project.displayName}
                </h3>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
                  {project.description}
                </p>

                <p className="mt-5 font-mono text-xs text-zinc-500">
                  {siteCopy.projects.githubPrefix}/{username}
                </p>
              </button>
            );
          })}
        </div>

        {selectedProject ? (
          <aside className="rounded-soft sticky top-24 border border-white/10 bg-black/55 p-5 shadow-sm backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-normal text-cyan-200">
                  {siteCopy.projects.abstract}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-white">
                  {selectedProject.displayName}
                </h3>
              </div>
              <span className="rounded-soft border border-white/10 px-2 py-1 font-mono text-xs text-zinc-400">
                {selectedProject.language}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              {selectedProject.detail}
            </p>

            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-soft border border-white/10 bg-white/[0.025] p-3">
                <p className="font-mono text-xs text-zinc-500">
                  {siteCopy.projects.source}
                </p>
                <p className="mt-1 text-zinc-100">
                  {siteCopy.projects.githubDomain}/{username}
                </p>
              </div>
              <div className="rounded-soft border border-white/10 bg-white/[0.025] p-3">
                <p className="font-mono text-xs text-zinc-500">
                  {siteCopy.projects.status}
                </p>
                <p className="mt-1 text-zinc-100">
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
                className="button-motion rounded-soft inline-flex h-11 items-center justify-center gap-2 bg-cyan-200 px-5 font-mono text-sm font-bold text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
              >
                {siteCopy.actions.repository}
                <ExternalLink aria-hidden="true" size={16} />
              </a>
              {selectedProject.homepage ? (
                <a
                  href={selectedProject.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-motion rounded-soft inline-flex h-11 items-center justify-center gap-2 border border-white/10 px-5 font-mono text-sm font-bold text-zinc-100 hover:border-cyan-300/45 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
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
  projects: GithubProject[],
  activeFilter: ProjectFilter,
) {
  if (activeFilter === "all") {
    return projects;
  }

  return projects.filter((project) => project.category === activeFilter);
}
