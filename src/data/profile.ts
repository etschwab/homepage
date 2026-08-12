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
    "Ich bin 17, besuche die IMS Bern und entwickle Websites und digitale Anwendungen. Am liebsten arbeite ich am Frontend und sehe dabei direkt, was aus einer Idee entsteht.",
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
      "Mit deinen persönlichen Zugangsdaten kommst du zu den Dokumenten und Kontaktangaben.",
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
      "Kontakt, verantwortliche Person und Zweck dieser Portfolio-Website.",
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
      "Diese Website dient der persönlichen Vorstellung von Etienne Schwab.",
      "Für die Inhalte verlinkter Websites sind deren Betreiber verantwortlich.",
    ],
  },
} as const;

export const aboutSection = {
  title: "Über mich",
  paragraphs: [
    "Ich heisse Etienne Schwab, bin 17 Jahre alt und komme aus Muri-Gümligen in der Region Bern. An der IMS Bern verbinde ich die kaufmännische Ausbildung mit Informatikunterricht an der gibb.",
    "Mich interessieren vor allem Frontend-Entwicklung, Webanwendungen und digitale Produkte, die verständlich aufgebaut sind. Bei Planary sammle ich zusätzlich Erfahrung mit echten Webprojekten.",
    "Seit über zehn Jahren spiele ich Unihockey. Ausserdem spiele ich gerne Dart und GeoGuessr.",
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
    context: "Anamorph · smartain · BookLoan",
  },
  {
    category: "Backend & Daten",
    skills: ["NestJS", "SQL & Datenbanken", "Supabase"],
    context: "smartain",
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitLab", "Docker", "Azure", "AWS"],
    context: "Modul 347 · Projekt-Repositories",
  },
  {
    category: "Mobile",
    skills: ["React Native", ".NET MAUI"],
    context: "CarPin · TenniSoft",
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

export type ProjectAbstract = {
  goal: string;
  implementation: string;
  role: string;
  learnings: string;
};

export type ProjectGroup = "Web" | "Schule" | "Hardware" | "Desktop";

export const featuredProjects = [
  {
    name: "Anamorph",
    kind: "Teamprojekt",
    description:
      "Ein browserbasiertes Perspektiv-Puzzle, das 2D-Skizzen in spielbare 3D-Strukturen verwandelt.",
    abstract: {
      goal:
        "Ein räumliches Puzzle entwickeln, bei dem sich eine scheinbar zweidimensionale Skizze erst aus dem richtigen Blickwinkel zu einem begehbaren Weg zusammensetzt.",
      implementation:
        "Die Spielwelt läuft direkt im Browser. React und TypeScript strukturieren Oberfläche und Spiellogik, Three.js übernimmt die dreidimensionale Darstellung der Figuren, Plattformen und Perspektiven.",
      role:
        "Im Team war ich an Konzeption und Umsetzung der spielbaren Webanwendung beteiligt und verband die Benutzeroberfläche mit der 3D-Szene.",
      learnings:
        "Ich lernte, Zustände zwischen klassischer Weboberfläche und einer interaktiven 3D-Welt zu koordinieren und räumliche Ideen so zu vereinfachen, dass sie als Spiel verständlich bleiben.",
    },
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
      "Eine Team-App, in der Spieler ihre Trainings und Spiele sehen und direkt zu- oder absagen können.",
    abstract: {
      goal:
        "Teams eine zentrale Übersicht für Trainings, Spiele und Teilnahmen geben, damit Abmeldungen und Zusagen nicht über verschiedene Chats verteilt sind.",
      implementation:
        "Die Anwendung wurde mit Next.js und TypeScript aufgebaut. Supabase und PostgreSQL speichern Teams, Mitglieder und Termine; das Dashboard stellt die relevanten Informationen rollenbezogen dar.",
      role:
        "smartain ist ein persönliches Projekt. Von der Produktidee über Datenmodell und Authentifizierung bis zur Oberfläche habe ich die Anwendung selbst konzipiert und umgesetzt.",
      learnings:
        "Besonders wichtig waren ein sauberes relationales Datenmodell, verständliche Nutzerflüsse und die Verbindung von Frontend, Authentifizierung und persistenten Daten.",
    },
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
    abstract: {
      goal:
        "Den Standort eines geparkten Fahrzeugs schnell sichern und Nutzer später mit Karte und gespeicherten Informationen zuverlässig dorthin zurückführen.",
      implementation:
        "Die App basiert auf React Native, Expo und TypeScript. Kartenansicht, Standortdaten und eine für Smartphones optimierte Bedienung bilden den Kern der Anwendung.",
      role:
        "Im Team arbeitete ich an der Konzeption und Entwicklung der mobilen App sowie an der Umsetzung der zentralen Park- und Kartenfunktionen.",
      learnings:
        "Ich vertiefte den Umgang mit mobilen Komponenten, Standortdaten und Berechtigungen und lernte, eine Oberfläche für kurze Interaktionen unterwegs zu gestalten.",
    },
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
    abstract: {
      goal:
        "Digitale Leistungen und Projekte so präsentieren, dass Besucher Angebot, Nutzen und nächste Schritte ohne technische Vorkenntnisse verstehen.",
      implementation:
        "Die Inhalte werden mit einer klaren Informationshierarchie, responsiven Layouts und wiederverwendbaren Frontend-Bausteinen als Webauftritt umgesetzt.",
      role:
        "Ich sammle bei Planary Erfahrung mit realen Webprojekten und unterstütze die verständliche Gestaltung und technische Umsetzung von Webinhalten.",
      learnings:
        "Das Projekt zeigt mir, wie wichtig Abstimmung, verlässliche Umsetzung und eine konsequent nutzerorientierte Sprache in echten Kundenprojekten sind.",
    },
    technologies: ["Webdesign", "Frontend"],
    links: [{ label: "Website", href: links.planary }],
  },
  {
    name: "SNB",
    group: "Schule",
    category: "Schulprojekt",
    description:
      "Eine veröffentlichte Website mit Fokus auf semantisches HTML, Gestaltung und Deployment.",
    abstract: {
      goal:
        "Eine vollständige Informationswebsite als Schulprojekt planen, visuell strukturieren und öffentlich erreichbar bereitstellen.",
      implementation:
        "Die Seite entstand mit semantischem HTML und CSS. Layout, Typografie und responsive Regeln wurden ohne grosses Framework aufgebaut und anschliessend auf Vercel veröffentlicht.",
      role:
        "Ich verantwortete Struktur, Gestaltung, Frontend-Umsetzung und Deployment des Projekts.",
      learnings:
        "Ich festigte die Grundlagen von sauberem HTML, CSS-Layouts, responsivem Design und dem Weg von lokalen Dateien zu einer veröffentlichten Website.",
    },
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
    abstract: {
      goal:
        "Bibliotheken, Medienbestand und Ausleihvorgänge in einer übersichtlichen Anwendung abbilden und wiederkehrende Verwaltungsaufgaben vereinfachen.",
      implementation:
        "Die TypeScript-Anwendung bildet Bücher, Nutzer und Ausleihen als klar getrennte Daten und Ansichten ab. Validierungen sorgen für nachvollziehbare Abläufe.",
      role:
        "Ich arbeitete an Datenstruktur, Anwendungslogik und Benutzeroberfläche des Schulprojekts.",
      learnings:
        "Dabei übte ich, fachliche Regeln in Datenmodelle und Funktionen zu übersetzen und grössere Abläufe in überschaubare Komponenten zu zerlegen.",
    },
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
    abstract: {
      goal:
        "Eine leicht bedienbare Aufgabenliste schaffen, mit der Einträge schnell erfasst, organisiert und als erledigt markiert werden können.",
      implementation:
        "HTML und CSS bilden die Oberfläche, JavaScript verwaltet Eingaben, Statusänderungen und die dynamische Darstellung der Aufgaben im Browser.",
      role:
        "Ich setzte das Projekt selbstständig von der Grundstruktur bis zur Interaktionslogik um.",
      learnings:
        "Das Projekt vertiefte mein Verständnis für DOM-Manipulation, Event-Handling und die Trennung von Darstellung und Anwendungszustand.",
    },
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
    abstract: {
      goal:
        "Eine statische Website reproduzierbar in einem Container ausliefern und die Grundlagen containerisierter Web-Infrastruktur praktisch anwenden.",
      implementation:
        "Die Website wird durch Nginx bereitgestellt. Ein Dockerfile beschreibt Image und Deployment, sodass die gleiche Umgebung lokal und auf einem Zielsystem gestartet werden kann.",
      role:
        "Ich konfigurierte Website, Nginx und Containeraufbau im Rahmen des Schulmoduls.",
      learnings:
        "Ich lernte den Unterschied zwischen Anwendung und Laufzeitumgebung sowie den Umgang mit Images, Containern, Ports und reproduzierbaren Builds.",
    },
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
    abstract: {
      goal:
        "Mehrere kleine Spiele auf begrenzter Hardware in einem gemeinsamen Launcher zugänglich machen und vollständig über Display und Keypad bedienen.",
      implementation:
        "C++ steuert Menü, Spielelogik, Eingaben und Darstellung auf einem ESP32 mit TFT-Display. Die einzelnen Spiele teilen sich Hardware und zentrale Navigation.",
      role:
        "Ich entwickelte Launcher, Bedienlogik und die Verbindung zwischen Software und den angeschlossenen Hardware-Komponenten.",
      learnings:
        "Ich lernte, mit begrenzten Ressourcen zu planen, Hardwarezustände zuverlässig auszulesen und grafische Rückmeldungen ohne klassische Weboberfläche umzusetzen.",
    },
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
    abstract: {
      goal:
        "Das bekannte Merkspiel als physische Anwendung umsetzen, bei der eine immer längere Folge erkannt und korrekt wiederholt werden muss.",
      implementation:
        "Programmcode erzeugt die Sequenz, steuert die Signale und prüft die Eingaben der Spielenden über angeschlossene Hardware-Komponenten.",
      role:
        "Ich plante Spielablauf und Zustände und setzte die Verbindung von Ein- und Ausgaben selbst um.",
      learnings:
        "Das Projekt stärkte mein Verständnis für Zustandsautomaten, zeitgesteuerte Abläufe und das systematische Testen von Hardware-Eingaben.",
    },
    technologies: ["Hardware", "Programmierung"],
    links: [],
  },
  {
    name: "Eigener PC-Bau",
    group: "Hardware",
    category: "Hardware & Systeme",
    description:
      "Einen Computer geplant, passende Komponenten ausgewählt und selbst zusammengebaut.",
    abstract: {
      goal:
        "Einen auf den eigenen Bedarf abgestimmten Computer zusammenstellen, dessen Komponenten technisch und preislich sinnvoll zusammenspielen.",
      implementation:
        "Nach dem Vergleich von Prozessor, Mainboard, Speicher, Grafikkarte, Netzteil und Kühlung wurden alle Komponenten montiert, verkabelt und das System eingerichtet.",
      role:
        "Auswahl, Kompatibilitätsprüfung, Zusammenbau und Inbetriebnahme führte ich selbst durch.",
      learnings:
        "Ich lernte Hardware-Schnittstellen, thermische Anforderungen und Fehlerquellen beim Systembau praktisch kennen und übte strukturiertes Troubleshooting.",
    },
    technologies: ["Hardware", "Systembau"],
    links: [],
  },
  {
    name: "TenniSoft",
    group: "Desktop",
    category: "Desktopprojekt",
    description:
      "Windows-Anwendung für die Organisation rund um Tennis.",
    abstract: {
      goal:
        "Wichtige Abläufe rund um Tennis in einer Desktop-Anwendung bündeln und typische Verwaltungsinformationen übersichtlich zugänglich machen.",
      implementation:
        "Die Anwendung wurde mit C# und .NET MAUI aufgebaut. Ansichten und Programmlogik sind getrennt und für die Bedienung unter Windows gestaltet.",
      role:
        "Ich arbeitete an Struktur, Oberfläche und Funktionen der Desktop-Anwendung.",
      learnings:
        "Dabei lernte ich die komponentenbasierte Entwicklung ausserhalb des Browsers und den Umgang mit Navigation und Zuständen in einer Desktop-App.",
    },
    technologies: ["C#", ".NET MAUI"],
    links: [],
  },
  {
    name: "4 Gewinnt",
    group: "Desktop",
    category: "Desktopprojekt",
    description:
      "Zwei-Personen-Spiel mit Spielstand und vollständiger Gewinnprüfung.",
    abstract: {
      goal:
        "Das Brettspiel für zwei Personen digital abbilden und nach jedem Zug zuverlässig alle möglichen Gewinnrichtungen prüfen.",
      implementation:
        "Eine C#-Anwendung mit Windows Forms verwaltet Spielfeld, Rundenwechsel, Spielstand und die Prüfung horizontaler, vertikaler und diagonaler Viererreihen.",
      role:
        "Ich programmierte Benutzeroberfläche, Spiellogik und Auswertung selbst.",
      learnings:
        "Ich übte den Umgang mit zweidimensionalen Datenstrukturen, klaren Spielzuständen und Algorithmen, die mehrere Richtungen fehlerfrei prüfen.",
    },
    technologies: ["C#", "Windows Forms"],
    links: [],
  },
  {
    name: "Scamble",
    group: "Schule",
    category: "Experiment",
    description:
      "Ein frühes Repository zum Ausprobieren von Ablage und Projektstruktur.",
    abstract: {
      goal:
        "Grundlegende Arbeitsweisen mit einem Code-Repository ausprobieren und eine nachvollziehbare Struktur für kleine Experimente aufbauen.",
      implementation:
        "Kleine Programmierübungen und Dateien wurden geordnet, versioniert und über GitHub verwaltet.",
      role:
        "Das Repository entstand als persönliches Lern- und Experimentierprojekt.",
      learnings:
        "Ich machte erste praktische Erfahrungen mit Versionskontrolle, Commits, Dateistruktur und der Weiterentwicklung eines Projekts in kleinen Schritten.",
    },
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
  abstract: ProjectAbstract;
  technologies: readonly string[];
  links: readonly ProjectLink[];
}>;
