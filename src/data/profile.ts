export const navItems = [
  { index: "01", label: "Home", href: "/" },
  { index: "02", label: "Über mich", href: "/ueber-mich" },
  { index: "03", label: "Projekte", href: "/projekte" },
  { index: "04", label: "Dateien", href: "/dateien" },
] as const;

export const links = {
  planary: "https://planary.ch",
  github: "https://github.com/etschwab",
} as const;

export const profile = {
  name: "Etienne Schwab",
  role: "IMS-Schüler & Entwickler",
  intro:
    "Ich bin 17 Jahre alt, besuche die IMS Bern und entwickle gerne Websites und digitale Anwendungen. Besonders interessieren mich klare Frontends, gute Bedienung und Projekte, bei denen aus einer Idee etwas Funktionierendes wird.",
  location: "Bern, Schweiz",
  availability: "Offen für ein Praktikum",
} as const;

export const siteCopy = {
  actions: {
    login: "Zum Login",
    logout: "Abmelden",
    projects: "Projekte ansehen",
  },
  header: {
    startLabel: "Zur Startseite",
    internalLink: "Dateien",
  },
  loading: {
    mark: "ES",
    text: "Portfolio wird geladen",
  },
  login: {
    backLink: "Zurück zu Dateien",
    eyebrow: "Geschützter Bereich",
    title: "Anmelden",
    description:
      "Melden Sie sich mit den persönlichen Zugangsdaten an, um auf Dokumente und Kontaktangaben zuzugreifen.",
    usernameLabel: "Nutzername",
    usernamePlaceholder: "Nutzername",
    passwordLabel: "Passwort",
    passwordPlaceholder: "Passwort",
    submit: "Einloggen",
    pending: "Wird geprüft",
    usernameRequired: "Bitte geben Sie den Nutzernamen ein.",
    usernameTooLong: "Der Nutzername ist zu lang.",
    passwordRequired: "Bitte geben Sie das Passwort ein.",
  },
  footer: {
    ariaLabel: "Links im Footer",
    name: "Etienne Schwab",
    copyright: "© 2026 Etienne Schwab · Bern, Schweiz",
    github: "GitHub",
    imprint: "Impressum",
  },
  imprint: {
    title: "Impressum",
    description:
      "Angaben zur verantwortlichen Person, zum Kontakt und zum Zweck dieser persönlichen Portfolio- und Bewerbungswebsite.",
    closeLabel: "Impressum schliessen",
    rows: [
      { label: "Verantwortlich", value: "Etienne Schwab" },
      {
        label: "Kontakt",
        value: "contact@etienneschwab.ch",
        href: "mailto:contact@etienneschwab.ch",
      },
      { label: "Standort", value: "Bern, Schweiz" },
      { label: "Zweck", value: "Portfolio und Bewerbung" },
    ],
    notes: [
      "Die Inhalte dieser Website werden sorgfältig gepflegt und dienen der persönlichen Vorstellung von Etienne Schwab.",
      "Externe Links führen zu Angeboten Dritter. Für deren Inhalte sind die jeweiligen Betreiber verantwortlich.",
    ],
  },
} as const;

export const aboutSection = {
  title: "Über mich",
  paragraphs: [
    "Ich heisse Etienne Schwab, bin 17 Jahre alt und komme aus Muri-Gümligen in der Region Bern. An der IMS Bern verbinde ich die kaufmännische Ausbildung mit Informatikunterricht an der gibb.",
    "Mich interessieren vor allem Frontend-Entwicklung, Webanwendungen und digitale Produkte, die verständlich aufgebaut sind. Bei Planary sammle ich zusätzlich Erfahrung mit echten Webprojekten.",
    "Seit über zehn Jahren spiele ich Unihockey. In meiner Freizeit gehören auch Dart und GeoGuessr dazu – zwei Hobbys, bei denen Konzentration und ein gutes Auge wichtig sind.",
  ],
  facts: [
    { label: "Alter", value: "17 Jahre" },
    { label: "Ausbildung", value: "IMS Bern" },
    { label: "Region", value: "Muri-Gümligen" },
  ],
} as const;

export const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "HTML & CSS"],
  },
  {
    category: "Backend & Daten",
    skills: ["NestJS", "SQL & Datenbanken", "Supabase"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitLab", "Docker", "Azure", "AWS"],
  },
  {
    category: "Mobile",
    skills: ["React Native", ".NET MAUI"],
  },
] as const;

export const interests = [
  {
    title: "Unihockey",
    description:
      "Seit über 10 Jahren spiele ich Unihockey. Mir gefallen das Tempo, die Spielsituationen im Team und dass man in jeder Aktion schnell entscheiden muss.",
  },
  {
    title: "Dart",
    description:
      "Zuhause spiele ich gerne Dart. Es ist ruhig, direkt und perfekt, um Präzision und Konzentration zu trainieren.",
  },
  {
    title: "GeoGuessr",
    description:
      "GeoGuessr spiele ich gerne mit Freunden. Ich mag den Mix aus Karten, Beobachtung und kleinen Details, die plötzlich alles verraten.",
  },
] as const;

export const education = [
  {
    period: "2014 – 2018",
    school: "Schule Aebnit",
    description: "Primarschule in Muri-Gümligen.",
  },
  {
    period: "2018 – 2021",
    school: "Schule Seidenberg",
    description: "Fortsetzung der Primarschule in Muri-Gümligen.",
  },
  {
    period: "2021 – 2024",
    school: "Schule Moos",
    description: "Sekundarstufe in Muri-Gümligen.",
  },
  {
    period: "2024 – heute",
    school: "bwd & gibb Bern",
    description: "IMS mit Informatikunterricht an der gibb und Praxistraining.",
  },
] as const;

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectGroup = "Web" | "Schule" | "Hardware" | "Desktop";

export const featuredProjects = [
  {
    name: "Anamorph",
    kind: "Teamprojekt",
    description:
      "Ein browserbasiertes Perspektiv-Puzzle, das 2D-Skizzen in spielbare 3D-Strukturen verwandelt.",
    technologies: ["React", "Vite", "TypeScript", "Three.js"],
    imagePresentation: "cover",
    imageSrc: "/images/projects/anamorph.webp",
    imageAlt:
      "Spielansicht von Anamorph mit schwebenden Plattformen und zwei Spielfiguren",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Anamorph-duoproj/Anamorph",
      },
      { label: "Live-Demo", href: "https://anamorph-nu.vercel.app" },
      {
        label: "Projektabstract",
        href: "/documents/projectabstracts/anamorph.pdf",
      },
    ],
  },
  {
    name: "smartain",
    kind: "Persönliches Projekt",
    description:
      "Ein MVP für Teams, Spieler, Trainings und Spiele mit Anmeldung, Datenhaltung und Dashboard.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    imagePresentation: "cover",
    imageSrc: "/images/projects/smartrain.webp",
    imageAlt: "Startseite von smartain mit Trainingsübersicht und Teamstatus",
    links: [
      { label: "GitHub", href: "https://github.com/etschwab/smartain" },
      {
        label: "Projektabstract",
        href: "/documents/projectabstracts/smartrain.pdf",
      },
    ],
  },
  {
    name: "CarPin",
    kind: "Teamprojekt · Mobile App",
    description:
      "Eine mobile Anwendung, die einen Parkplatz speichert und dabei hilft, das Fahrzeug später wiederzufinden.",
    technologies: ["React Native", "Expo", "TypeScript", "Maps"],
    imagePresentation: "phone",
    imageSrc: "/images/projects/carpin.webp",
    imageAlt:
      "CarPin-App mit Kartenansicht und Informationen zum gespeicherten Parkplatz",
    links: [
      {
        label: "Projektabstract",
        href: "/documents/projectabstracts/carpin.pdf",
      },
    ],
  },
] as const;

export const moreProjects = [
  {
    name: "Planary",
    group: "Web",
    category: "Webprojekt",
    description:
      "Website und Projektplattform für einfache, klar erklärte digitale Lösungen.",
    technologies: ["Webdesign", "Frontend"],
    links: [{ label: "Website", href: links.planary }],
  },
  {
    name: "SNB",
    group: "Schule",
    category: "Schulprojekt",
    description:
      "Eine veröffentlichte Website mit Fokus auf semantisches HTML, Gestaltung und Deployment.",
    technologies: ["HTML", "CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/etschwab/snb" },
      { label: "Live-Demo", href: "https://snb-liard.vercel.app" },
    ],
  },
  {
    name: "BookLoan",
    group: "Schule",
    category: "Schulprojekt",
    description:
      "Webanwendung für die Verwaltung von Bibliotheken, Büchern und Ausleihen.",
    technologies: ["TypeScript", "Web"],
    links: [
      { label: "GitHub", href: "https://github.com/etschwab/BookLoan" },
    ],
  },
  {
    name: "ToDoList",
    group: "Schule",
    category: "Schulprojekt",
    description:
      "Browser-App zum Erfassen, Planen und Abhaken von Aufgaben.",
    technologies: ["JavaScript", "HTML", "CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/etschwab/ToDoList" },
    ],
  },
  {
    name: "Modul 347",
    group: "Schule",
    category: "Schulprojekt",
    description:
      "Eine Website, die mit Nginx in einem Docker-Container betrieben wird.",
    technologies: ["Docker", "Nginx", "HTML"],
    links: [
      { label: "GitHub", href: "https://github.com/etschwab/m347" },
    ],
  },
  {
    name: "EMMA",
    group: "Hardware",
    category: "Hardware & Programmierung",
    description:
      "Game-Launcher mit drei Spielen für einen ESP32 mit TFT-Display und Keypad.",
    technologies: ["C++", "ESP32"],
    links: [
      { label: "GitHub", href: "https://github.com/etschwab/EMMA" },
    ],
  },
  {
    name: "Simon Says",
    group: "Hardware",
    category: "Hardware & Programmierung",
    description:
      "Selbst programmiertes Hardware-Spiel mit einer wachsenden Signalfolge.",
    technologies: ["Hardware", "Programmierung"],
    links: [],
  },
  {
    name: "Eigener PC-Bau",
    group: "Hardware",
    category: "Hardware & Systeme",
    description:
      "Einen Computer geplant, passende Komponenten ausgewählt und selbst zusammengebaut.",
    technologies: ["Hardware", "Systembau"],
    links: [],
  },
  {
    name: "TenniSoft",
    group: "Desktop",
    category: "Desktopprojekt",
    description:
      "Windows-Anwendung für die Organisation rund um Tennis.",
    technologies: ["C#", ".NET MAUI"],
    links: [],
  },
  {
    name: "4 Gewinnt",
    group: "Desktop",
    category: "Desktopprojekt",
    description:
      "Zwei-Personen-Spiel mit Spielstand und vollständiger Gewinnprüfung.",
    technologies: ["C#", "Windows Forms"],
    links: [],
  },
  {
    name: "Scamble",
    group: "Schule",
    category: "Experiment",
    description:
      "Ein frühes Repository zum Ausprobieren von Ablage und Projektstruktur.",
    technologies: ["Grundlagen"],
    links: [
      { label: "GitHub", href: "https://github.com/etschwab/scamble" },
    ],
  },
] satisfies ReadonlyArray<{
  name: string;
  group: ProjectGroup;
  category: string;
  description: string;
  technologies: readonly string[];
  links: readonly ProjectLink[];
}>;
