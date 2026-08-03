import "server-only";

import {
  projectCategories,
  projectDetails,
  projectNotes,
  siteCopy,
} from "@/data/profile";
import type { PortfolioProject } from "@/types/projects";

type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  archived: boolean;
  fork: boolean;
  updated_at: string;
};

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "ims-portfolio",
};

const hiddenProjectNames = new Set(["MultiTrack", "Uek294", "planarylogin"]);

const curatedProjectSeeds = [
  {
    name: "Anamorph",
    displayName: "Anamorph",
    language: "TypeScript",
    htmlUrl: "https://github.com/Anamorph-duoproj/Anamorph",
    homepage: "https://anamorph-nu.vercel.app",
    updatedAt: "2026-07-18T10:00:00Z",
    sourceLabel: "GitHub",
    primaryActionLabel: siteCopy.actions.repository,
  },
  {
    name: "planary",
    displayName: "Planary",
    language: "Website",
    htmlUrl: "https://planary.ch",
    homepage: "https://planary.ch",
    updatedAt: "2026-07-01T10:00:00Z",
    sourceLabel: "Website",
    primaryActionLabel: siteCopy.actions.website,
  },
] as const;

const fallbackProjectSeeds = [
  {
    name: "homepage",
    language: "TypeScript",
    updatedAt: "2026-06-09T05:46:24Z",
  },
  {
    name: "scamble",
    language: "Sonstige",
    updatedAt: "2026-05-14T19:58:14Z",
  },
  {
    name: "snb",
    language: "HTML",
    updatedAt: "2026-05-05T12:49:06Z",
    homepage: "https://snb-liard.vercel.app",
  },
  {
    name: "smartain",
    language: "TypeScript",
    updatedAt: "2026-05-01T13:02:04Z",
  },
  {
    name: "BookLoan",
    language: "TypeScript",
    updatedAt: "2026-04-21T11:01:20Z",
  },
  {
    name: "ToDoList",
    language: "JavaScript",
    updatedAt: "2026-04-02T09:51:50Z",
  },
  {
    name: "EMMA",
    language: "C++",
    updatedAt: "2026-03-11T12:08:01Z",
  },
  {
    name: "m347",
    language: "HTML",
    updatedAt: "2026-02-22T13:00:38Z",
  },
  {
    name: "TenniSoft26",
    language: "Sonstige",
    updatedAt: "2026-01-08T08:33:52Z",
  },
  {
    name: "TenniSoft",
    language: "Sonstige",
    updatedAt: "2026-01-05T10:00:21Z",
  },
] as const;

const curatedProjects: PortfolioProject[] = curatedProjectSeeds.map((project) => ({
  name: project.name,
  displayName: project.displayName,
  description: projectNotes[project.name],
  detail: projectDetails[project.name] ?? projectNotes[project.name],
  htmlUrl: project.htmlUrl,
  homepage: project.homepage,
  imageSrc: null,
  language: project.language,
  category: projectCategories[project.name] ?? "personal",
  sourceLabel: project.sourceLabel,
  primaryActionLabel: project.primaryActionLabel,
  updatedAt: project.updatedAt,
  topics: [],
  archived: false,
}));

const fallbackProjects: PortfolioProject[] = fallbackProjectSeeds.map((project) => ({
  name: project.name,
  displayName: formatRepoName(project.name),
  description: projectNotes[project.name],
  detail: projectDetails[project.name] ?? projectNotes[project.name],
  htmlUrl: `https://github.com/etschwab/${project.name}`,
  homepage: "homepage" in project ? project.homepage : null,
  imageSrc: null,
  language: project.language,
  category: projectCategories[project.name] ?? "personal",
  sourceLabel: "GitHub",
  primaryActionLabel: siteCopy.actions.repository,
  updatedAt: project.updatedAt,
  topics: [],
  archived: false,
}));

export async function getGithubProjects(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
      {
        headers: GITHUB_HEADERS,
        next: { revalidate: 60 * 60 },
      },
    );

    if (!response.ok) {
      return mergeWithFallbackProjects([]);
    }

    const repos = (await response.json()) as GithubRepo[];
    const ownRepos = repos.filter(
      (repo) => !repo.fork && !hiddenProjectNames.has(repo.name),
    );
    const projects = ownRepos.map((repo) => repoToProject(repo));

    return mergeWithFallbackProjects(projects);
  } catch {
    return mergeWithFallbackProjects([]);
  }
}

function repoToProject(repo: GithubRepo): PortfolioProject {
  const description =
    projectNotes[repo.name] ??
    repo.description ??
    siteCopy.projects.fallbackDescription;

  return {
    name: repo.name,
    displayName: formatRepoName(repo.name),
    description,
    detail: projectDetails[repo.name] ?? description,
    htmlUrl: repo.html_url,
    homepage: repo.homepage || null,
    imageSrc: null,
    language: repo.language ?? "Sonstige",
    category: projectCategories[repo.name] ?? "personal",
    sourceLabel: "GitHub",
    primaryActionLabel: siteCopy.actions.repository,
    updatedAt: repo.updated_at,
    topics: repo.topics ?? [],
    archived: repo.archived,
  };
}

function mergeWithFallbackProjects(projects: PortfolioProject[]) {
  const byName = new Map(projects.map((project) => [project.name, project]));

  curatedProjects.forEach((project) => {
    byName.set(project.name, project);
  });

  fallbackProjects.forEach((project) => {
    if (!byName.has(project.name)) {
      byName.set(project.name, project);
    }
  });

  return Array.from(byName.values()).sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

function formatRepoName(name: string) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim();
}
