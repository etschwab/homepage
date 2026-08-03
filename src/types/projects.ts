import type { ProjectCategory } from "@/data/profile";

export type PortfolioProject = {
  name: string;
  displayName: string;
  description: string;
  detail: string;
  htmlUrl: string;
  homepage: string | null;
  imageSrc: string | null;
  language: string;
  category: ProjectCategory;
  sourceLabel: string;
  primaryActionLabel: string;
  updatedAt: string;
  topics: string[];
  archived: boolean;
};
