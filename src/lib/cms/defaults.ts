import "server-only";

import { privateProfile } from "@/data/private";
import {
  aboutSection,
  education,
  interests,
  profile,
  siteCopy,
  skillLevels,
  strengths,
} from "@/data/profile";
import { deriveSchema, withOptions } from "@/lib/cms/schema";
import type { SiteContent } from "@/lib/cms/types";
import { defaultProjects, projectFilters } from "@/lib/projects";

// Ausgangsstand aller bearbeitbaren Texte. Solange im Admin nichts gespeichert
// wurde, sieht die Website genau so aus wie mit den Dateien in src/data.
export const defaultContent: SiteContent = {
  home: { kicker: "Portfolio · IMS Bern · 2026", role: profile.role },
  about: {
    paragraphs: [...aboutSection.paragraphs],
    facts: aboutSection.facts.map((fact) => ({ ...fact })),
  },
  sections: {
    skills: {
      title: "Was ich kann.",
      text: "Technisches Wissen ist für mich dann wertvoll, wenn daraus eine verständliche und verlässliche Lösung entsteht.",
    },
    education: {
      title: "Bildungsweg",
      text: "Seit 2024 besuche ich die IMS mit Unterricht an der bwd und gibb.",
    },
    leisure: {
      title: "Unihockey, Dart und GeoGuessr",
      text: "In meiner Freizeit bin ich meistens nicht am Laptop.",
    },
  },
  skillLevels: skillLevels.map((level) => ({
    level: level.level,
    tone: level.tone,
    score: level.score,
    items: level.items.map((item) => ({ ...item, skills: [...item.skills] })),
  })),
  strengths: strengths.map((strength) => ({ ...strength })),
  education: education.map((item) => ({ ...item })),
  interests: interests.map((item) => ({ ...item })),
  projects: defaultProjects.map((project) => ({
    name: project.name,
    group: project.group,
    category: project.category,
    description: project.description,
    abstract: { ...project.abstract },
    technologies: [...project.technologies],
    links: project.links.map((link) => ({ ...link })),
    imageSrc: project.imageSrc ?? "",
    imageAlt: project.imageAlt ?? "",
    imagePresentation: project.imagePresentation ?? "",
  })),
  files: {
    text: "Lebenslauf, Zeugnisse und weitere persönliche Dokumente sind geschützt. Melde dich an, um sie anzusehen.",
  },
  contact: { ...privateProfile },
  imprint: {
    title: siteCopy.imprint.title,
    description: siteCopy.imprint.description,
    rows: siteCopy.imprint.rows.map((row) => ({
      label: row.label,
      value: row.value,
      href: "href" in row ? row.href : "",
    })),
    notes: [...siteCopy.imprint.notes],
  },
};

let schema = deriveSchema(defaultContent);
schema = withOptions(
  schema,
  ["projects", "*", "group"],
  projectFilters.filter((filter) => filter !== "Alle"),
);
schema = withOptions(schema, ["skillLevels", "*", "tone"], ["strong", "medium", "experience"]);
schema = withOptions(schema, ["projects", "*", "imagePresentation"], [
  "",
  "cover",
  "phone",
  "portrait",
  "screenshot",
]);

export const contentSchema = schema;
