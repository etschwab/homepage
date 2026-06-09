export const navItems = [
  { label: "Start", href: "#start" },
  { label: "Skills", href: "#skills" },
  { label: "Projekte", href: "#projekte" },
  { label: "Profil", href: "#profil" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const profile = {
  brand: "<Etienne Schwab/>",
  role: "Bewerbung als Entwickler",
  name: "Etienne Schwab",
  title: ["Schüler an der ", "IMS im Wankdorf"] as const,
  intro:
    "Ich entwickle klare, performante Weboberflächen und lerne gern dort weiter, wo Design, Code und saubere Struktur zusammenkommen.",
  email: "etienne.schwab@bwdbern.ch",
  location: "Schweiz",
  availability: "Verfügbar für Lehrstelle, Praktikum oder Einstieg",
};

export const workItems = [
  {
    title: "Portfolio-Case",
    meta: "Next.js / TypeScript",
    description:
      "Platz für ein wichtiges Projekt mit Ziel, Rolle, eingesetzten Technologien und Ergebnis.",
  },
  {
    title: "Teamarbeit",
    meta: "Planung / Umsetzung",
    description:
      "Kurzer Abschnitt fuer Schul-, Praxis- oder Kundenarbeit mit deinem konkreten Beitrag.",
  },
  {
    title: "Lernprojekt",
    meta: "UI / Backend",
    description:
      "Ein Beispiel, das zeigt, wie du Probleme analysierst, testest und sauber dokumentierst.",
  },
] as const;

export const profileFacts = [
  { label: "Fokus", value: "Webentwicklung" },
  { label: "Arbeitsweise", value: "Strukturiert und lernbereit" },
  { label: "Stack", value: "Next.js, React, TypeScript" },
] as const;

export const referenceStats = [
  "IMS Schüler",
  "innovativ",
  "kreativ",
  "lernbegierig",
  "zukunftsorientiert",
] as const;

export const skillLevels = [
  {
    name: "HTML",
    value: 80,
    description: "Semantische Struktur, saubere Inhalte und klare Seitenaufteilung.",
  },
  {
    name: "CSS",
    value: 75,
    description: "Responsive Layouts, Abstände, Animationen und visuelle Details.",
  },
  {
    name: "JavaScript",
    value: 65,
    description: "Interaktive Oberflächen, DOM-Logik und saubere Funktionen.",
  },
  {
    name: "TypeScript",
    value: 55,
    description: "Typen, Interfaces und stabilere Komponenten.",
  },
  {
    name: "React",
    value: 60,
    description: "Komponenten, Props, Zustandslogik und wiederverwendbare UI.",
  },
  {
    name: "Next.js",
    value: 50,
    description: "App Router, Projektstruktur und moderne Webanwendungen.",
  },
] as const;

export const strengths = [
  "Saubere Struktur statt überladener Seiten",
  "Verständliche Kommunikation und klare Prioritäten",
  "Interesse an Sicherheit, Performance und guter UX",
] as const;
