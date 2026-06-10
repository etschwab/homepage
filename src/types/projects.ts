export type GithubProject = {
  name: string;
  displayName: string;
  description: string;
  detail: string;
  htmlUrl: string;
  homepage: string | null;
  imageSrc: string | null;
  language: string;
  updatedAt: string;
  topics: string[];
  archived: boolean;
};
