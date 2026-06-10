import "server-only";

import {
  projectCategories,
  projectDetails,
  projectNotes,
  siteCopy,
} from "@/data/profile";
import type { GithubProject } from "@/types/projects";

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

const fallbackProjectSeeds = [
  {
    name: "homepage",
    language: "TypeScript",
    updatedAt: "2026-06-09T05:46:24Z",
  },
  {
    name: "MultiTrack",
    language: "Sonstige",
    updatedAt: "2026-05-28T09:01:57Z",
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
    name: "Uek294",
    language: "TypeScript",
    updatedAt: "2026-04-14T09:23:09Z",
    homepage: "https://uek294.vercel.app",
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
    name: "planarylogin",
    language: "TypeScript",
    updatedAt: "2026-01-26T21:23:48Z",
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

const fallbackProjects: GithubProject[] = fallbackProjectSeeds.map((project) => ({
  name: project.name,
  displayName: formatRepoName(project.name),
  description: projectNotes[project.name],
  detail: projectDetails[project.name] ?? projectNotes[project.name],
  htmlUrl: `https://github.com/etschwab/${project.name}`,
  homepage: "homepage" in project ? project.homepage : null,
  imageSrc: null,
  language: project.language,
  category: projectCategories[project.name] ?? "personal",
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
      return fallbackProjects;
    }

    const repos = (await response.json()) as GithubRepo[];
    const ownRepos = repos.filter((repo) => !repo.fork);
    const projects = ownRepos.map((repo) => repoToProject(repo));

    return mergeWithFallbackProjects(projects);
  } catch {
    return fallbackProjects;
  }
}

function repoToProject(repo: GithubRepo): GithubProject {
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
    updatedAt: repo.updated_at,
    topics: repo.topics ?? [],
    archived: repo.archived,
  };
}

function mergeWithFallbackProjects(projects: GithubProject[]) {
  const byName = new Map(projects.map((project) => [project.name, project]));

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
