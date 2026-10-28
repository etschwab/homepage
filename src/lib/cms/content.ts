import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";

import { defaultDocumentGroups } from "@/data/private-documents";
import { contentSchema, defaultContent } from "@/lib/cms/defaults";
import { conform, deriveSchema, withOptions } from "@/lib/cms/schema";
import { readObject } from "@/lib/cms/store";
import type {
  ManagedDocument,
  ManagedDocumentGroup,
  SiteContent,
} from "@/lib/cms/types";
import type { Project } from "@/lib/projects";

export const CMS_TAG = "cms";
export const CONTENT_KEY = "content.json";
export const DOCUMENTS_KEY = "documents.json";

// Selbst festgelegter Standard, auf den «Zurücksetzen» zurückgeht.
export const STANDARD_CONTENT_KEY = "standard/content.json";
export const STANDARD_DOCUMENTS_KEY = "standard/documents.json";
export const STANDARD_META_KEY = "standard/meta.json";

let documentSchema = deriveSchema(defaultDocumentGroups);
documentSchema = withOptions(documentSchema, ["*", "documents", "*", "format"], ["PDF", "DOCX"]);
documentSchema = withOptions(documentSchema, ["*", "documents", "*", "storage"], ["repo", "cms"]);

const readStoredJson = unstable_cache(
  async (key: string) => {
    const raw = await readObject(key);
    return raw ? raw.toString("utf8") : null;
  },
  ["cms-object"],
  { tags: [CMS_TAG] },
);

async function readJson(key: string): Promise<unknown> {
  try {
    const raw = await readStoredJson(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(`CMS: ${key} konnte nicht gelesen werden`, error);
    return null;
  }
}

/** Bringt beliebige Eingaben in die Form von SiteContent. */
export function normalizeContent(value: unknown): SiteContent {
  return conform(value ?? defaultContent, contentSchema, defaultContent) as SiteContent;
}

export function normalizeDocuments(value: unknown): ManagedDocumentGroup[] {
  const groups = conform(
    value ?? defaultDocumentGroups,
    documentSchema,
    defaultDocumentGroups,
  ) as ManagedDocumentGroup[];

  return groups.map((group, index) => ({
    ...group,
    id: group.id || `gruppe-${index + 1}`,
    documents: group.documents.filter(
      (document) =>
        document.id &&
        document.path &&
        (document.storage === "repo" || document.path.startsWith("documents/")),
    ),
  }));
}

export const getContent = cache(async () => normalizeContent(await readJson(CONTENT_KEY)));

export const getDocumentGroups = cache(async () =>
  normalizeDocuments(await readJson(DOCUMENTS_KEY)),
);

/** Wann der Standard zuletzt festgelegt wurde, oder null für den Stand aus dem Code. */
export async function getStandardInfo(): Promise<{ savedAt: string } | null> {
  const meta = await readJson(STANDARD_META_KEY);
  return meta && typeof meta === "object" && "savedAt" in meta && typeof meta.savedAt === "string"
    ? { savedAt: meta.savedAt }
    : null;
}

export async function findDocument(id: string): Promise<ManagedDocument | undefined> {
  const groups = await getDocumentGroups();
  return groups.flatMap((group) => group.documents).find((document) => document.id === id);
}

export async function getProjects(): Promise<Project[]> {
  const { projects } = await getContent();

  return projects.map((project) => ({
    ...project,
    links: project.links.filter((link) => link.href),
    imageSrc: project.imageSrc || undefined,
    imageAlt: project.imageAlt || undefined,
    imagePresentation: project.imagePresentation || undefined,
  }));
}

export function slugify(value: string) {
  return value
    .toLocaleLowerCase("de-CH")
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
