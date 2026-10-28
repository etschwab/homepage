"use server";

import "server-only";

import { randomBytes } from "node:crypto";
import { revalidatePath, updateTag } from "next/cache";

import { verifyEditorCredentials } from "@/lib/auth/password";
import {
  clearLoginAttempts,
  consumeLoginAttempt,
  getLoginRateLimitKey,
} from "@/lib/auth/rate-limit";
import { readAdminSession } from "@/lib/auth/session";
import {
  CMS_TAG,
  CONTENT_KEY,
  DOCUMENTS_KEY,
  getDocumentGroups,
  normalizeContent,
  normalizeDocuments,
  slugify,
  STANDARD_CONTENT_KEY,
  STANDARD_DOCUMENTS_KEY,
  STANDARD_META_KEY,
} from "@/lib/cms/content";
import {
  deleteObject,
  readObject,
  StoreNotConfiguredError,
  writeObject,
} from "@/lib/cms/store";
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

export type StandardActionState = {
  ok?: boolean;
  message?: string;
  /** Nach dem Zurücksetzen muss die Seite die neuen Daten laden. */
  restored?: boolean;
  standardSavedAt?: string;
};

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

async function requireAdmin() {
  // Nur das eigene Admin-Login darf schreiben, nicht das Dokumenten-Login.
  const session = await readAdminSession();
  if (!session) throw new Error("Nicht angemeldet");
  return session;
}

/** Liest direkt aus dem Speicher, ohne Cache. */
async function readFreshJson(key: string): Promise<unknown> {
  const raw = await readObject(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw.toString("utf8"));
  } catch {
    return null;
  }
}

function cmsPaths(groups: ManagedDocumentGroup[] | null) {
  return new Set(
    (groups ?? [])
      .flatMap((group) => group.documents)
      .filter((document) => document.storage === "cms")
      .map((document) => document.path),
  );
}

/** Dateien des Standards, die beim Aufräumen nicht gelöscht werden dürfen. */
async function readStandardDocuments() {
  const stored = await readFreshJson(STANDARD_DOCUMENTS_KEY);
  return stored ? normalizeDocuments(stored) : null;
}

async function deleteQuietly(paths: Iterable<string>) {
  await Promise.all(
    [...new Set(paths)].map((path) =>
      deleteObject(path).catch((error) => console.error("CMS: Aufräumen fehlgeschlagen", error)),
    ),
  );
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

/**
 * Legt den gespeicherten Stand als Standard fest oder setzt auf den Standard
 * zurück. Beides verlangt zur Sicherheit nochmals das Admin-Passwort.
 */
export async function manageStandard(
  _previous: StandardActionState,
  formData: FormData,
): Promise<StandardActionState> {
  const session = await requireAdmin();
  const intent = String(formData.get("intent") ?? "");
  const password = String(formData.get("password") ?? "");

  if (intent !== "set" && intent !== "restore") {
    return { ok: false, message: "Unbekannte Aktion." };
  }
  if (!password) {
    return { ok: false, message: "Bitte gib dein Admin-Passwort ein." };
  }

  const rateLimitKey = await getLoginRateLimitKey(`standard:${session.username}`);
  if (!consumeLoginAttempt(rateLimitKey).allowed) {
    return { ok: false, message: "Zu viele Versuche. Bitte warte kurz und probiere es später erneut." };
  }
  const credentials = await verifyEditorCredentials(session.username, password);
  if (!credentials.ok) {
    return { ok: false, message: "Das Passwort ist nicht korrekt." };
  }
  clearLoginAttempts(rateLimitKey);

  try {
    const [currentContent, currentDocumentsRaw, oldStandardDocuments] = await Promise.all([
      readFreshJson(CONTENT_KEY),
      readFreshJson(DOCUMENTS_KEY),
      readStandardDocuments(),
    ]);
    const currentDocuments = normalizeDocuments(currentDocumentsRaw);

    if (intent === "set") {
      const savedAt = new Date().toISOString();
      await writeObject(
        STANDARD_CONTENT_KEY,
        JSON.stringify(normalizeContent(currentContent), null, 2),
        "application/json",
      );
      await writeObject(
        STANDARD_DOCUMENTS_KEY,
        JSON.stringify(currentDocuments, null, 2),
        "application/json",
      );
      await writeObject(STANDARD_META_KEY, JSON.stringify({ savedAt }), "application/json");

      // Dateien, die nur der alte Standard noch brauchte, sind jetzt frei.
      const keep = cmsPaths(currentDocuments);
      await deleteQuietly([...cmsPaths(oldStandardDocuments)].filter((path) => !keep.has(path)));

      refreshSite();
      return {
        ok: true,
        message: "Der aktuelle Stand ist jetzt der Standard.",
        standardSavedAt: savedAt,
      };
    }

    // Zurücksetzen: ohne eigenen Standard gilt der Stand aus dem Code.
    const standardContent = await readFreshJson(STANDARD_CONTENT_KEY);
    if (standardContent) {
      await writeObject(
        CONTENT_KEY,
        JSON.stringify(normalizeContent(standardContent), null, 2),
        "application/json",
      );
    } else {
      await deleteObject(CONTENT_KEY);
    }

    if (oldStandardDocuments) {
      await writeObject(
        DOCUMENTS_KEY,
        JSON.stringify(oldStandardDocuments, null, 2),
        "application/json",
      );
    } else {
      await deleteObject(DOCUMENTS_KEY);
    }

    const keep = cmsPaths(oldStandardDocuments);
    await deleteQuietly([...cmsPaths(currentDocuments)].filter((path) => !keep.has(path)));
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }

  refreshSite();
  return { ok: true, message: "Texte und Dokumente sind auf den Standard zurückgesetzt.", restored: true };
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
  // Dateien des Standards bleiben, damit «Zurücksetzen» sie wiederherstellen kann.
  const stillUsed = new Set(groups.flatMap((group) => group.documents).map((document) => document.path));
  const standardPaths = cmsPaths(await readStandardDocuments().catch(() => null));
  const orphaned = [
    ...replacedPaths,
    ...[...known.values()]
      .filter((document) => document.storage === "cms" && !stillUsed.has(document.path))
      .map((document) => document.path),
  ].filter((path) => !standardPaths.has(path) && !stillUsed.has(path));
  await deleteQuietly(orphaned);

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
