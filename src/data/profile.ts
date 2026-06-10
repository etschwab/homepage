export type ProjectCategory = "gibb" | "personal";

export const navItems = [
  { label: "Über mich", href: "#ueber-mich" },
  { label: "Bildungsweg", href: "#bildungsweg" },
  { label: "Skills", href: "#skills" },
  { label: "Projekte", href: "#projekte" },
  { label: "Hobbys", href: "#hobbys" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const links = {
  nilton: "https://nilton-barroso.planary.ch",
  planary: "https://planary.ch",
  github: "https://github.com/etschwab",
  instagram: "https://www.instagram.com/planaryofficial/",
} as const;

export const profile = {
  brand: "Etienne Schwab",
  role: "IMS Portfolio",
  name: "Etienne Schwab",
  title: ["IMS-Lernender", "Frontend", "Webdesign"] as const,
  rotatingRoles: [
    "Informatik-Lernender",
    "Web Developer",
    "Problem Solver",
  ] as const,
  intro:
    "Ich gestalte Webseiten und Webanwendungen, die ruhig aussehen, klar funktionieren und sich einfach bedienen lassen.",
  email: "etienne.schwab@bwdbern.ch",
  githubUsername: "etschwab",
  location: "Muri-Gümligen",
  availability:
    "17 Jahre alt, IMS in Bern und mit Freude an Frontend-Entwicklung, Webdesign und eigenen Projektideen.",
};

export const siteCopy = {
  actions: {
    contact: "Kontakt",
    email: "E-Mail senden",
    login: "Admin Login",
    logout: "Logout",
    projects: "Projekte ansehen",
    repository: "Repository öffnen",
    demo: "Live Demo",
  },
  header: {
    startLabel: "Zur Startsektion",
    logoAlt: "Logo von Etienne Schwab",
    internalLink: "Intern",
    protectedLabel: "Eingeloggt als",
  },
  loading: {
    mark: "ES",
    text: "Lädt Portfolio...",
  },
  login: {
    backLink: "Zurück zur Seite",
    eyebrow: "Geschützter Bereich",
    title: "Admin Login",
    descriptionStart: "Zugriff mit Nutzername",
    descriptionMiddle: "und Passwort",
    descriptionEnd: "Es gibt keine Registrierung, nur diese geschützte Ansicht.",
    usernameLabel: "Nutzername",
    usernamePlaceholder: "eti",
    passwordLabel: "Passwort",
    passwordPlaceholder: "12345",
    submit: "Einloggen",
    pending: "Prüfen...",
    usernameRequired: "Bitte gib den Nutzernamen ein.",
    usernameTooLong: "Der Nutzername ist zu lang.",
    passwordRequired: "Bitte gib das Passwort ein.",
  },
  footer: {
    ariaLabel: "Footer",
    copyright: "© 2026 Etienne Schwab",
    github: "GitHub",
    instagram: "Instagram",
    imprint: "Impressum",
  },
  imprint: {
    title: "Angaben zur Website",
    description:
      "Diese Website ist eine persönliche Portfolio- und Bewerbungsseite von Etienne Schwab.",
    closeLabel: "Impressum schliessen",
    contact: "Kontakt",
    rows: [
      { label: "Verantwortlich", value: "Etienne Schwab" },
      { label: "Standort", value: "Schweiz" },
      { label: "Website", value: "Portfolio und Bewerbung" },
    ],
  },
  projects: {
    eyebrow: "Informatikprojekte",
    title: "Ausgewählte Arbeiten aus Schule und Freizeit.",
    description:
      "Die Projekte sind im Abstract-Format aufgebaut: kurze Einordnung, eingesetzte Technologien und ein klarer Link zur Quelle.",
    empty: "Aktuell wurden keine öffentlichen Projekte gefunden.",
    filterLabel: "Projektfilter",
    source: "Quelle",
    status: "Status",
    publicStatus: "Öffentlich",
    archivedStatus: "Archiviert",
    abstract: "Abstract",
    githubPrefix: "GitHub",
    githubDomain: "github.com",
    fallbackDescription: "Öffentliches Repository mit Code als Schwerpunkt.",
    countSeparator: "von",
    filters: {
      all: "Alle",
      gibb: "gibb-Projekte",
      personal: "Persönliche Projekte",
    },
    categories: {
      gibb: "gibb-Projekt",
      personal: "Persönliches Projekt",
    },
  },
  skills: {
    eyebrow: "Skills",
    title: "Stärken in Programmierung und Web.",
    description:
      "Eine nüchterne Übersicht über Technologien und Arbeitsweisen, mit denen ich in Schule und eigenen Projekten arbeite.",
    profileLabel: "Arbeitsweise",
    profileDescription:
      "Meine Stärken liegen in klarer Struktur, ruhiger Umsetzung und dem Willen, ein Ergebnis Schritt für Schritt zu verbessern.",
    levelSuffix: "Prozent",
  },
  private: {
    eyebrowPrefix: "Login aktiv:",
    title: "Geschützter Bereich für sensible Daten.",
    description:
      "Lebenslauf, Zeugnisse und private Bewerbungsinformationen werden nicht öffentlich gezeigt. Dieser Bereich ist nur nach dem Login sichtbar.",
  },
} as const;

export const heroSection = {
  eyebrow: profile.role,
  typedText: profile.name,
  rolePrefix: "Aktuell:",
  roles: profile.rotatingRoles,
  intro: profile.intro,
} as const;

export const aboutSection = {
  eyebrow: "Lebenslauf / Über mich",
  title: "Persönlich, zuverlässig und gerne nah am Produkt.",
  description:
    "Ich heisse Etienne Schwab, bin 17 Jahre alt und wohne in Muri-Gümligen. Zurzeit besuche ich die IMS in Bern.",
  introLabel: "Kurzprofil",
  facts: [
    { label: "Alter", value: "17 Jahre" },
    { label: "Wohnort", value: "Muri-Gümligen" },
    { label: "Ausbildung", value: "IMS in Bern" },
  ],
  paragraphs: [
    {
      text: "In meiner Freizeit spiele ich seit über 10 Jahren Unihockey im Team. Dadurch habe ich gelernt, Verantwortung zu übernehmen, mit anderen zusammenzuarbeiten und mich aktiv in ein Team einzubringen. Diese Erfahrungen machen mich auch ausserhalb des Sports zu einem zuverlässigen Teamplayer.",
    },
    {
      text: "Zuhause spiele ich gerne Dart oder verbringe Zeit am Computer. Eines meiner Lieblingsspiele ist GeoGuessr, das ich oft gemeinsam mit ",
      linkLabel: "Nilton",
      linkHref: links.nilton,
      suffix: " spiele.",
    },
    {
      text: "Im Bereich Informatik interessiere ich mich besonders für Frontend-Entwicklung und Webdesign. Ich habe bereits mehrere Projekte mit modernen Technologien wie React, NestJS und Next.js umgesetzt. Mir gefällt es, Webseiten und Webanwendungen zu gestalten, die nicht nur gut aussehen, sondern auch einfach und intuitiv zu bedienen sind.",
    },
    {
      text: "Ausserdem bin ich Mitglied der Firma ",
      linkLabel: "Planary",
      linkHref: links.planary,
      suffix:
        ". Bei Planary entwickeln wir einfache, klare Webanwendungen, die sich auf konkrete Probleme konzentrieren und dafür passende digitale Lösungen bieten.",
    },
  ],
  cards: [
    {
      label: "Team",
      title: "Unihockey seit über 10 Jahren",
      description:
        "Teamgeist, Verantwortung und Zuverlässigkeit gehören für mich zusammen.",
    },
    {
      label: "Frontend",
      title: "Struktur vor Show",
      description:
        "Ich mag Interfaces, die ruhig wirken, schnell verständlich sind und im Alltag wirklich helfen.",
    },
    {
      label: "Projekte",
      title: "React, NestJS und Next.js",
      description:
        "Ich probiere gerne moderne Webtechnologien aus und achte dabei auf saubere Abläufe.",
    },
  ],
} as const;

export const educationSection = {
  eyebrow: "Bildungsweg",
  title: "Mein schulischer Weg bis zur IMS.",
  description:
    "Die aktuelle Station steht bewusst oben. Die Detailtexte sind knapp gehalten und können später einfach ergänzt werden.",
  currentLabel: "Aktuell",
} as const;

export const education = [
  {
    school: "bwd & gibb Bern",
    period: "2024 – heute",
    description: "IMS – Informatik-Mediamatiker",
    current: true,
  },
  {
    school: "Schule Moos",
    period: "2021 – 2024",
    description: "Platzhalter für eine kurze Beschreibung dieser Station.",
    current: false,
  },
  {
    school: "Schule Seidenberg",
    period: "2018 – 2021",
    description: "Platzhalter für eine kurze Beschreibung dieser Station.",
    current: false,
  },
  {
    school: "Schule Aebnit",
    period: "2014 – 2018",
    description: "Platzhalter für eine kurze Beschreibung dieser Station.",
    current: false,
  },
] as const;

export const hobbiesSection = {
  eyebrow: "Hobbys & Interessen",
  title: "Sport, Dart und GeoGuessr.",
  description:
    "Auch ausserhalb der Informatik mag ich Dinge, bei denen Präzision, Orientierung und Teamgeist wichtig sind.",
  items: [
    {
      title: "Unihockey",
      description:
        "Seit über 10 Jahren spiele ich Unihockey im Team. Das prägt meine Art, Verantwortung zu übernehmen und mit anderen zusammenzuarbeiten.",
    },
    {
      title: "Dart",
      description:
        "Zuhause spiele ich gerne Dart. Mir gefällt die Mischung aus Ruhe, Konzentration und kleinen Fortschritten.",
    },
    {
      title: "GeoGuessr",
      description:
        "GeoGuessr spiele ich oft gemeinsam mit Nilton. Das Spiel verbindet Karten, Beobachtung und ein gutes Gefühl für Orte.",
      linkLabel: "Nilton",
      linkHref: links.nilton,
    },
  ],
} as const;

export const mediaSection = {
  eyebrow: "Video / Audio",
  title: "Platz für eingebettete Inhalte.",
  description:
    "Hier ist ein sauberer Slot für ein späteres Video, eine Präsentation oder eine kurze Audio-Erklärung vorgesehen.",
  placeholderTitle: "Media-Slot",
  placeholderDescription:
    "Noch kein Inhalt hinterlegt. Später kann hier ein Video- oder Audio-Element eingebettet werden.",
} as const;

export const contactSection = {
  eyebrow: "Kontakt / Impressum",
  title: "Kontakt aufnehmen.",
  description:
    "Wenn du Fragen zu meiner IMS-Seite, einem Projekt oder einer Bewerbung hast, erreichst du mich per E-Mail.",
} as const;

export const profileFacts = aboutSection.facts;

export const skillHighlights = [
  "Struktur",
  "Teamarbeit",
  "Frontend",
  "TypeScript",
  "GitHub",
] as const;

export const skillGroups = [
  {
    category: "Programmierung",
    skills: [
      {
        name: "TypeScript",
        value: 65,
        description: "Typen, Komponenten und stabilere Logik.",
      },
      {
        name: "JavaScript",
        value: 70,
        description: "Interaktive Oberflächen und Browser-Logik.",
      },
      {
        name: "C++",
        value: 45,
        description: "Grundlagen aus kleineren Hardware- und Lernprojekten.",
      },
    ],
  },
  {
    category: "Web",
    skills: [
      {
        name: "React",
        value: 68,
        description: "Komponenten, Props, State und wiederverwendbare UI.",
      },
      {
        name: "Next.js",
        value: 58,
        description: "App Router, Seitenstruktur und moderne Webanwendungen.",
      },
      {
        name: "HTML / CSS",
        value: 78,
        description: "Semantik, Layout, responsive Abstände und Lesbarkeit.",
      },
    ],
  },
  {
    category: "Tools",
    skills: [
      {
        name: "GitHub",
        value: 72,
        description: "Repositories, Versionierung und Projektübersicht.",
      },
      {
        name: "Vercel",
        value: 60,
        description: "Deployments, Vorschauen und schnelles Testen.",
      },
      {
        name: "Docker",
        value: 42,
        description: "Container-Grundlagen aus Modul- und Lernprojekten.",
      },
    ],
  },
  {
    category: "Sonstiges",
    skills: [
      {
        name: "Teamarbeit",
        value: 82,
        description: "Verantwortung übernehmen und gemeinsam besser werden.",
      },
      {
        name: "Webdesign",
        value: 70,
        description: "Ruhige Gestaltung, klare Hierarchie und gute Bedienung.",
      },
      {
        name: "Problemlösen",
        value: 74,
        description: "Schrittweise analysieren, testen und verbessern.",
      },
    ],
  },
] as const;

export const strengths = [
  "Zuverlässiger Teamplayer mit Verantwortungsbewusstsein.",
  "Interesse an klaren, modernen und intuitiv bedienbaren Webanwendungen.",
  "Ruhige Arbeitsweise: planen, umsetzen, testen und verbessern.",
] as const;

export const privateActions = [
  {
    title: "Unterlagen",
    description:
      "Platz für Lebenslauf, Zeugnisse und private Bewerbungsdateien.",
    icon: "file",
  },
  {
    title: "Downloads",
    description: "Geschützte Buttons für PDF-Downloads oder Projektdateien.",
    icon: "download",
  },
  {
    title: "Status",
    description: "Interne Notizen, nächste Schritte und Stand der IMS-Website.",
    icon: "shield",
  },
  {
    title: "Bearbeiten",
    description:
      "Später können hier Inhalte, Projekte oder Kontaktinfos gepflegt werden.",
    icon: "settings",
  },
] as const;

export const projectNotes: Record<string, string> = {
  homepage:
    "Persönliche IMS-Portfolioseite mit klarem Aufbau, geschütztem Bereich, GitHub-Projekten und einer interaktiven Projektübersicht.",
  MultiTrack:
    "Lernprojekt für strukturierte Datensätze und mehrere parallele Einträge. Der Fokus liegt auf Organisation und nachvollziehbarer Bedienung.",
  scamble:
    "Kleines Experimentierprojekt, mit dem ich Code-Struktur, Ablage und einfache Logik ausprobiert habe.",
  snb:
    "Webprojekt mit Live-Demo. Im Vordergrund stehen semantisches HTML, Gestaltung und ein veröffentlichtes Deployment.",
  smartain:
    "MVP-App für Teams, Spieler, Trainings und Spiele. Das Projekt verbindet Next.js, Supabase und Vercel.",
  BookLoan:
    "Webapplikation für Bibliotheken, Bücher und Ausleihen. Ziel ist eine einfache Verwaltung mit klaren Abläufen.",
  Uek294:
    "ÜK-294-Projekt mit React und Vite. Im Fokus stehen Komponenten, Frontend-Grundlagen und Entwicklungsworkflow.",
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

export const projectDetails: Record<string, string> = {
  homepage:
    "Diese Website ist mein zentrales IMS-Portfolio. Sie verbindet einen persönlichen Einstieg, einen geschützten Bereich für sensible Daten und eine Projektübersicht, die direkt aus GitHub gespeist wird.",
  MultiTrack:
    "MultiTrack ist ein Lernprojekt rund um mehrere parallele Einträge oder Tracks. Ich nutze es, um Daten sinnvoll zu strukturieren und Oberflächen übersichtlich zu halten.",
  scamble:
    "Scamble ist ein kleineres Experimentierprojekt für Code-Struktur, Benennung und einfache Logik.",
  snb:
    "SNB ist ein Webprojekt mit veröffentlichter Demo. Dabei stehen HTML-Struktur, Gestaltung und Deployment im Vordergrund.",
  smartain:
    "Smartain ist eine MVP-App für Teamverwaltung, Spieler, Trainings und Spiele. Spannend ist die Kombination aus Frontend, Daten und Deployment.",
  BookLoan:
    "BookLoan ist eine Webapplikation für Bibliotheken, Bücher und Ausleihen. Das Projekt trainiert typische Verwaltungsabläufe.",
  Uek294:
    "Dieses ÜK-294-Projekt arbeitet mit React und Vite. Es ist ein Beispiel für Unterrichtsinhalte, die direkt in einem Frontend-Projekt umgesetzt wurden.",
  ToDoList:
    "Die Todo-Liste ist ein klassisches Lernprojekt mit echtem Nutzen: Aufgaben erfassen, planen und abhaken.",
  EMMA:
    "EMMA ist ein Game-Launcher für einen ESP32 mit TFT-Display und Keypad und zeigt auch hardwarenahe Logik.",
  m347:
    "Im Modul-347-Projekt wird eine Website mit Nginx in einem Docker-Container betrieben.",
  planarylogin:
    "Planarylogin ist ein Login- und Registrierungsbereich mit TypeScript, Formularen und Validierung.",
  TenniSoft26:
    "TenniSoft26 sammelt Ideen für digitale Tennis-Organisation und einfache Verwaltungsprozesse.",
  TenniSoft:
    "TenniSoft ist ein Lernprojekt für Tennis-Organisation mit Fokus auf Planung, Struktur und Übersicht.",
};

export const projectCategories: Record<string, ProjectCategory> = {
  homepage: "personal",
  MultiTrack: "personal",
  scamble: "personal",
  snb: "gibb",
  smartain: "personal",
  BookLoan: "gibb",
  Uek294: "gibb",
  ToDoList: "gibb",
  EMMA: "personal",
  m347: "gibb",
  planarylogin: "personal",
  TenniSoft26: "personal",
  TenniSoft: "personal",
};
