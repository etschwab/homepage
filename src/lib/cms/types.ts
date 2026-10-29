import type { ProjectGroup } from "@/data/profile";

type SectionCopy = { title: string; text: string };

export type ContentProject = {
  name: string;
  group: ProjectGroup;
  category: string;
  description: string;
  abstract: {
    goal: string;
    implementation: string;
    role: string;
    learnings: string;
  };
  technologies: string[];
  links: { label: string; href: string }[];
  /** Leer bedeutet: kein Bild */
  imageSrc: string;
  imageAlt: string;
  imagePresentation: "" | "cover" | "phone" | "portrait" | "screenshot";
};

export type SiteContent = {
  home: { kicker: string; role: string };
  about: {
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };
  sections: {
    skills: SectionCopy;
    education: SectionCopy;
    leisure: SectionCopy;
  };
  skillLevels: {
    level: string;
    tone: "strong" | "medium" | "experience";
    score: number;
    items: {
      name: string;
      skills: string[];
      description: string;
      context: string;
    }[];
  }[];
  strengths: { name: string; description: string }[];
  education: { period: string; school: string; description: string }[];
  interests: { title: string; description: string }[];
  projects: ContentProject[];
  files: { text: string };
  contact: { email: string; phoneDisplay: string; phoneHref: string };
  imprint: {
    title: string;
    description: string;
    rows: { label: string; value: string; href: string }[];
    notes: string[];
  };
};

export type DocumentFormat = "PDF" | "DOCX";

export type ManagedDocument = {
  id: string;
  title: string;
  description: string;
  format: DocumentFormat;
  size: string;
  downloadName: string;
  /** "repo": verschlüsselt in secure-documents, "cms": im Admin hochgeladen */
  storage: "repo" | "cms";
  path: string;
};

export type GradeRow = {
  label: string;
  /** Optionaler Zusatz, z. B. der Modulname */
  detail: string;
  value: number;
};

export type GradeSeries = {
  school: string;
  title: string;
  averageLabel: string;
  /** 0 bedeutet: aus den Zeilen berechnen */
  average: number;
  rows: GradeRow[];
};

export type ManagedDocumentGroup = {
  id: string;
  title: string;
  description: string;
  /** Notengrafiken, die neben den Dokumenten der Gruppe stehen */
  grades: GradeSeries[];
  documents: ManagedDocument[];
};
