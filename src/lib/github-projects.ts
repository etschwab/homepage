import "server-only";

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

const projectNotes: Record<string, string> = {
  homepage:
    "Persönliche IMS-Portfolioseite mit klarem Aufbau, geschütztem Bereich, GitHub-Projekten und einer interaktiven Projektübersicht.",
  MultiTrack:
    "Ein Lernprojekt für strukturierte Datensätze und mehrere parallele Einträge. Der Fokus liegt auf sauberer Organisation und nachvollziehbarer Bedienung.",
  scamble:
    "Kleines Experimentierprojekt, mit dem ich Code-Struktur, Ablage und einfache Logik ausprobiert habe.",
  snb:
    "Webprojekt mit Live-Demo. Im Vordergrund stehen semantisches HTML, saubere Gestaltung und ein veröffentlichtes Deployment.",
  smartain:
    "MVP-App für Teams, Spieler, Trainings und Spiele. Das Projekt verbindet Next.js, Supabase und Vercel zu einer nutzbaren Verwaltungsoberfläche.",
  BookLoan:
    "Webapplikation für Bibliotheken, Bücher und Ausleihen. Ziel ist eine einfache Verwaltung mit klaren Abläufen.",
  Uek294:
    "ÜK-294-Projekt mit React und Vite. Hier ging es um Komponenten, Frontend-Grundlagen und einen sauberen Entwicklungsworkflow.",
  ToDoList:
    "Todo-App zum Planen und Abhaken von Aufgaben. Das Projekt trainiert Zustandslogik und direkte Interaktion im Browser.",
  EMMA:
    "Game-Launcher für ESP32 mit TFT-Display und Keypad. Mehrere kleine Spiele werden in einer kompakten App zusammengeführt.",
  m347:
    "Modul-347-Projekt mit Docker und Nginx. Eine Website wird in einem Container gebaut, gestartet und bereitgestellt.",
  planarylogin:
    "Login- und Registrierungsbereich für Planary. Im Fokus stehen Formulare, Validierung und eine klare Authentifizierungsstrecke.",
  TenniSoft26:
    "Tennis-Projekt zur digitalen Organisation. Es sammelt Ideen für Verwaltung, Planung und bessere Abläufe im Vereinssport.",
  TenniSoft:
    "Tennis-Organisation als Lernprojekt. Der Schwerpunkt liegt auf Struktur, Planung und einer einfachen digitalen Übersicht.",
};

const projectDetails: Record<string, string> = {
  homepage:
    "Diese Website ist mein zentrales IMS-Portfolio. Sie verbindet einen persönlichen Einstieg, einen geschützten Bereich für sensible Daten und eine Projektübersicht, die direkt aus GitHub gespeist wird. Beim Aufbau achte ich auf klare Navigation, moderne Gestaltung und eine gute Bedienung auf Desktop und Mobile.",
  MultiTrack:
    "MultiTrack ist ein Lernprojekt rund um mehrere parallele Einträge oder Tracks. Ich nutze es, um Daten sinnvoll zu strukturieren, Oberflächen übersichtlich zu halten und Funktionen Schritt für Schritt nachvollziehbar aufzubauen.",
  scamble:
    "Scamble ist ein kleineres Experimentierprojekt. Es dient mir als Spielraum für Code-Struktur, Benennung und einfache Logik, ohne dass das Projekt künstlich gross werden muss.",
  snb:
    "SNB ist ein Webprojekt mit veröffentlichter Demo. Dabei stehen HTML-Struktur, Gestaltung und Deployment im Vordergrund. Das Projekt zeigt, wie eine kleine Website sauber aufgebaut und online erreichbar gemacht wird.",
  smartain:
    "Smartain ist eine MVP-App für Teamverwaltung, Spieler, Trainings und Spiele. Besonders spannend ist hier die Kombination aus Next.js, Supabase und Vercel, weil Frontend, Daten und Deployment zusammenkommen.",
  BookLoan:
    "BookLoan ist eine Webapplikation für Bibliotheken, Bücher und Ausleihen. Das Projekt trainiert typische Verwaltungsabläufe: Daten erfassen, anzeigen, ordnen und für Benutzer verständlich machen.",
  Uek294:
    "Dieses ÜK-294-Projekt arbeitet mit React und Vite. Im Fokus stehen Komponenten, Zustandslogik und ein sauberer Entwicklungsworkflow. Es ist ein gutes Beispiel für Unterrichtsinhalte, die direkt in einem Frontend-Projekt umgesetzt wurden.",
  ToDoList:
    "Die Todo-Liste ist ein klassisches Lernprojekt, aber mit echtem Nutzen: Aufgaben erfassen, planen und abhaken. Dadurch konnte ich Interaktion, Zustand und einfache Benutzerführung im Browser üben.",
  EMMA:
    "EMMA ist ein Game-Launcher für einen ESP32 mit TFT-Display und Keypad. Das Projekt ist spannend, weil es nicht nur Webentwicklung zeigt, sondern auch hardwarenahe Logik und mehrere kleine Spiele in einer App verbindet.",
  m347:
    "Im Modul-347-Projekt wird eine Website mit Nginx in einem Docker-Container betrieben. Dadurch habe ich geübt, wie Webserver, Container und Deployment-Grundlagen zusammenhängen.",
  planarylogin:
    "Planarylogin ist ein Login- und Registrierungsbereich mit TypeScript. Der Fokus liegt auf Formularen, Validierung und einer klaren Authentifizierungsstrecke, die später in ein grösseres Projekt passen kann.",
  TenniSoft26:
    "TenniSoft26 sammelt Ideen für digitale Tennis-Organisation. Das Projekt hilft mir, Verwaltungsprozesse zu denken und in Software-Strukturen zu übersetzen.",
  TenniSoft:
    "TenniSoft ist ein Lernprojekt für Tennis-Organisation. Im Mittelpunkt stehen Planung, Struktur und eine einfache digitale Übersicht für Abläufe im Vereinssport.",
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
    `Öffentliches Repository mit ${repo.language ?? "Code"} als Schwerpunkt.`;

  return {
    name: repo.name,
    displayName: formatRepoName(repo.name),
    description,
    detail: projectDetails[repo.name] ?? description,
    htmlUrl: repo.html_url,
    homepage: repo.homepage || null,
    imageSrc: null,
    language: repo.language ?? "Sonstige",
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
