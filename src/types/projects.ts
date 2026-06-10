import type { ProjectCategory } from "@/data/profile";

export type GithubProject = {
  name: string;
  displayName: string;
  description: string;
  detail: string;
  htmlUrl: string;
  homepage: string | null;
  imageSrc: string | null;
  language: string;
  category: ProjectCategory;
  updatedAt: string;
  topics: string[];
  archived: boolean;
};
