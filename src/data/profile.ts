export const navItems = [
  { label: "Start", href: "#start" },
  { label: "Über mich", href: "#ueber-mich" },
  { label: "Projekte", href: "#projekte" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const profile = {
  brand: "Etienne Schwab",
  role: "IMS Portfolio",
  name: "Etienne Schwab",
  title: ["IMS-Lernender", "Frontend & Webdesign"] as const,
  intro:
    "Hier sammle ich Projekte aus Schule, Freizeit und Webentwicklung. Die Seite wächst mit meiner Ausbildung und zeigt, woran ich gerade arbeite.",
  email: "etienne.schwab@bwdbern.ch",
  githubUsername: "etschwab",
  location: "Muri-Gümligen",
  availability:
    "17 Jahre alt, IMS in Bern und mit viel Freude an Frontend-Entwicklung, Webdesign und eigenen Projektideen.",
};

export const workItems = [
  {
    title: "Portfolio-Website",
    meta: "Next.js / TypeScript",
    description:
      "Diese Website wird als IMS-Projektportfolio aufgebaut und laufend erweitert.",
  },
  {
    title: "Unterrichtsprojekte",
    meta: "gibb / IMS",
    description:
      "Projekte aus Modulen und ÜKs zeigen, welche Web- und Programmiergrundlagen ich anwende.",
  },
  {
    title: "Eigene Ideen",
    meta: "Freizeit / GitHub",
    description:
      "Private Lernprojekte zeigen, was ich ausserhalb des Unterrichts ausprobiere.",
  },
] as const;

export const profileFacts = [
  { label: "Alter", value: "17 Jahre" },
  { label: "Wohnort", value: "Muri-Gümligen" },
  { label: "Ausbildung", value: "IMS in Bern" },
] as const;

export const referenceStats = [
  "IMS-Lernender",
  "Webentwicklung",
  "TypeScript",
  "React",
  "GitHub",
] as const;

export const skillLevels = [
  {
    name: "HTML",
    value: 80,
    description: "Semantische Struktur, klare Inhalte und saubere Seitenaufteilung.",
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
  "Seit über 10 Jahren Unihockey im Team.",
  "Zuverlässiger Teamplayer mit Verantwortungsbewusstsein.",
  "Fokus auf klare, moderne und intuitiv bedienbare Webanwendungen.",
] as const;
