"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

import {
  featuredProjects,
  moreProjects,
  type ProjectGroup,
  type ProjectLink,
} from "@/data/profile";

type Filter = "Alle" | ProjectGroup;

type ProjectCard = {
  name: string;
  group: ProjectGroup;
  category: string;
  description: string;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  imageAlt?: string;
  imagePresentation?: "cover" | "phone";
  imageSrc?: string;
};

const filters: readonly Filter[] = [
  "Alle",
  "Web",
  "Schule",
  "Hardware",
  "Desktop",
];

const highlightedProjects = [
  {
    ...featuredProjects[0],
    group: "Schule",
    category: featuredProjects[0].kind,
  },
  {
    ...featuredProjects[1],
    group: "Web",
    category: featuredProjects[1].kind,
  },
  {
    ...featuredProjects[2],
    group: "Schule",
    category: featuredProjects[2].kind,
  },
] satisfies readonly ProjectCard[];

const allProjects = [
  ...highlightedProjects,
  ...moreProjects.map((project) => ({
    ...project,
    imagePresentation: "cover" as const,
  })),
] satisfies readonly ProjectCard[];

export function ProjectArchive() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Alle");
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const projects = useMemo(
    () =>
      activeFilter === "Alle"
        ? allProjects
        : allProjects.filter((project) => project.group === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, projects.length);
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-visible",
            entry.isIntersecting,
          );
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    cards.forEach((card) => {
      card.classList.remove("is-visible");
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [projects]);

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

      <div className="project-grid project-grid-unified">
        {projects.map((project, index) => (
          <article
            className="featured-project project-card"
            key={project.name}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          >
            <ProjectVisual project={project} />

            <div className="featured-project-copy">
              <p className="project-kind">{project.category}</p>
              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <p className="project-tech">
                {project.technologies.join(" · ")}
              </p>
              <ArchiveLinks links={project.links} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectVisual({ project }: { project: ProjectCard }) {
  if (!project.imageSrc) {
    return (
      <div className="project-image-wrap project-image-placeholder">
        <span>{project.group}</span>
        <strong>{project.name}</strong>
      </div>
    );
  }

  return (
    <div
      className={`project-image-wrap ${
        project.imagePresentation === "phone" ? "project-image-wrap-phone" : ""
      }`}
    >
      {project.imagePresentation === "phone" ? (
        <Image
          src={project.imageSrc}
          alt=""
          fill
          sizes="(max-width: 767px) calc(100vw - 2rem), 32vw"
          className="project-image-backdrop"
          aria-hidden="true"
        />
      ) : null}
      <Image
        src={project.imageSrc}
        alt={project.imageAlt ?? ""}
        fill
        sizes="(max-width: 767px) calc(100vw - 2rem), 32vw"
        className={`project-image ${
          project.imagePresentation === "phone" ? "project-image-phone" : ""
        }`}
      />
    </div>
  );
}

function ArchiveLinks({ links }: { links: readonly ProjectLink[] }) {
  if (!links.length) return null;

  return (
    <div className="project-links project-card-links">
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
