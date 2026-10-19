"use server";

import "server-only";

import { randomBytes } from "node:crypto";
import { revalidatePath, updateTag } from "next/cache";

import { readSession } from "@/lib/auth/session";
import {
  CMS_TAG,
  CONTENT_KEY,
  DOCUMENTS_KEY,
  getDocumentGroups,
  normalizeContent,
  normalizeDocuments,
  slugify,
} from "@/lib/cms/content";
import { deleteObject, StoreNotConfiguredError, writeObject } from "@/lib/cms/store";
import type {
  DocumentFormat,
  ManagedDocument,
  ManagedDocumentGroup,
  SiteContent,
} from "@/lib/cms/types";
import { encryptDocument } from "@/lib/private-documents/storage";

export type ContentActionState = {
  ok?: boolean;
  message?: string;
  content?: SiteContent;
  savedAt?: number;
};

export type DocumentsActionState = {
  ok?: boolean;
  message?: string;
  groups?: ManagedDocumentGroup[];
  savedAt?: number;
};

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

async function requireAdmin() {
  const session = await readSession();
  if (!session) throw new Error("Nicht angemeldet");
}

function refreshSite() {
  updateTag(CMS_TAG);
  revalidatePath("/", "layout");
}

function errorMessage(error: unknown) {
  if (error instanceof StoreNotConfiguredError) return error.message;
  console.error("CMS:", error);
  return "Speichern ist fehlgeschlagen. Bitte versuche es nochmals.";
}

export async function saveContent(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  await requireAdmin();

  let parsed: unknown;
  try {
    parsed = JSON.parse(String(formData.get("content") ?? ""));
  } catch {
    return { ok: false, message: "Die Daten konnten nicht gelesen werden." };
  }

  const content = normalizeContent(parsed);

  try {
    await writeObject(CONTENT_KEY, JSON.stringify(content, null, 2), "application/json");
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }

  refreshSite();
  return { ok: true, message: "Gespeichert. Die Website ist aktualisiert.", content, savedAt: Date.now() };
}

export async function resetContent(): Promise<ContentActionState> {
  await requireAdmin();

  try {
    await deleteObject(CONTENT_KEY);
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }

  refreshSite();
  return {
    ok: true,
    message: "Alle Texte sind auf den Stand im Code zurückgesetzt.",
    content: normalizeContent(null),
    savedAt: Date.now(),
  };
}

/**
 * Speichert Gruppen, Titel und Reihenfolge der Dokumente. Optional wird dabei
 * eine Datei hochgeladen: neu in `uploadGroupId` oder als Ersatz für `replaceId`.
 */
export async function saveDocuments(
  _previous: DocumentsActionState,
  formData: FormData,
): Promise<DocumentsActionState> {
  await requireAdmin();

  const current = await getDocumentGroups();
  const known = new Map(
    current.flatMap((group) => group.documents).map((document) => [document.id, document]),
  );

  let submitted: unknown;
  try {
    submitted = JSON.parse(String(formData.get("groups") ?? ""));
  } catch {
    return { ok: false, message: "Die Daten konnten nicht gelesen werden." };
  }

  // Speicherort und Dateiinfos kommen immer vom Server, nur Texte vom Formular.
  const usedGroupIds = new Set<string>();
  const groups = normalizeDocuments(Array.isArray(submitted) ? submitted : []).map((group) => {
    let id = slugify(group.id) || slugify(group.title) || "gruppe";
    while (usedGroupIds.has(id)) id = `${id}-${randomBytes(2).toString("hex")}`;
    usedGroupIds.add(id);

    return {
      ...group,
      id,
      documents: group.documents
        .filter((document) => known.has(document.id))
        .map((document) => {
          const stored = known.get(document.id)!;
          return {
            ...stored,
            title: document.title.trim() || stored.title,
            description: document.description,
            downloadName: sanitizeFileName(document.downloadName) || stored.downloadName,
          };
        }),
    };
  });

  const file = formData.get("file");
  const replacedPaths: string[] = [];

  try {
    if (file instanceof File && file.size > 0) {
      const upload = await prepareUpload(file);
      if ("error" in upload) return { ok: false, message: upload.error };

      const replaceId = String(formData.get("replaceId") ?? "");
      const target = groups
        .flatMap((group) => group.documents)
        .find((document) => document.id === replaceId);

      if (target) {
        if (target.storage === "cms") replacedPaths.push(target.path);
        const id = target.id;
        const path = `documents/${id}-${randomBytes(6).toString("hex")}.enc`;
        await writeObject(path, upload.encrypted, "application/octet-stream");
        Object.assign(target, {
          storage: "cms",
          path,
          format: upload.format,
          size: upload.size,
          downloadName: withExtension(target.downloadName, upload.format),
        } satisfies Partial<ManagedDocument>);
      } else {
        const group = groups.find((entry) => entry.id === String(formData.get("uploadGroupId")));
        if (!group) return { ok: false, message: "Bitte wähle eine Gruppe für das Dokument." };

        const title = String(formData.get("title") ?? "").trim() || upload.baseName;
        const id = uniqueDocumentId(slugify(title) || "dokument", known);
        const path = `documents/${id}-${randomBytes(6).toString("hex")}.enc`;
        await writeObject(path, upload.encrypted, "application/octet-stream");
        group.documents.push({
          id,
          title,
          description: String(formData.get("description") ?? "").trim(),
          format: upload.format,
          size: upload.size,
          downloadName: sanitizeFileName(file.name) || `${id}.${upload.format.toLowerCase()}`,
          storage: "cms",
          path,
        });
      }
    }

    await writeObject(DOCUMENTS_KEY, JSON.stringify(groups, null, 2), "application/json");
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }

  // Hochgeladene Dateien, die nicht mehr gebraucht werden, aufräumen.
  const stillUsed = new Set(groups.flatMap((group) => group.documents).map((document) => document.path));
  const orphaned = [
    ...replacedPaths,
    ...[...known.values()]
      .filter((document) => document.storage === "cms" && !stillUsed.has(document.path))
      .map((document) => document.path),
  ];
  await Promise.all(
    [...new Set(orphaned)].map((path) =>
      deleteObject(path).catch((error) => console.error("CMS: Aufräumen fehlgeschlagen", error)),
    ),
  );

  refreshSite();
  return { ok: true, message: "Dokumente gespeichert.", groups, savedAt: Date.now() };
}

async function prepareUpload(file: File) {
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "Die Datei ist grösser als 4 MB." };
  }

  const data = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();
  let format: DocumentFormat;

  if (data.subarray(0, 5).toString("latin1") === "%PDF-") {
    format = "PDF";
  } else if (data.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04])) && name.endsWith(".docx")) {
    format = "DOCX";
  } else {
    return { error: "Nur PDF- und Word-Dateien (.docx) sind erlaubt." };
  }

  return {
    format,
    encrypted: encryptDocument(data),
    size: formatSize(data.byteLength),
    baseName: file.name.replace(/\.[^.]+$/, ""),
  };
}

function uniqueDocumentId(base: string, known: Map<string, unknown>) {
  let id = base;
  while (known.has(id)) id = `${base}-${randomBytes(2).toString("hex")}`;
  return id;
}

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function sanitizeFileName(name: string) {
  return name
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "")
    .trim()
    .slice(0, 120);
}

function withExtension(name: string, format: DocumentFormat) {
  return `${name.replace(/\.(pdf|docx)$/i, "")}.${format.toLowerCase()}`;
}
