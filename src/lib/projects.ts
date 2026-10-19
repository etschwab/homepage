import {
  featuredProjects,
  moreProjects,
  type ProjectAbstract,
  type ProjectGroup,
  type ProjectLink,
} from "@/data/profile";

export type ImagePresentation = "cover" | "phone" | "portrait" | "screenshot";

export type Project = {
  name: string;
  group: ProjectGroup;
  category: string;
  description: string;
  abstract: ProjectAbstract;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  imageSrc?: string;
  imageAlt?: string;
  imagePresentation?: ImagePresentation;
};

export type ProjectFilter = "Alle" | ProjectGroup;

export const projectFilters: readonly ProjectFilter[] = [
  "Alle",
  "Web",
  "Schule",
  "Hardware",
  "Desktop",
];

// Gruppen der hervorgehobenen Projekte im Projektarchiv.
const featuredGroups: readonly ProjectGroup[] = ["Schule", "Web", "Schule"];

/** Ausgangsstand. Die aktuelle Liste kommt aus dem Admin (getProjects). */
export const defaultProjects: readonly Project[] = [
  ...featuredProjects.map((project, index) => ({
    ...project,
    group: featuredGroups[index],
    category: project.kind,
  })),
  ...moreProjects.map((project) => ({
    ...project,
    imageSrc: "imageSrc" in project ? project.imageSrc : undefined,
    imageAlt: "imageAlt" in project ? project.imageAlt : undefined,
    imagePresentation:
      "imagePresentation" in project ? project.imagePresentation : undefined,
  })),
];
