import "server-only";

import { del, get, put } from "@vercel/blob";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";

// Speicher für alles, was im Admin geändert wird. Auf Vercel ist das ein
// privater Blob Store, lokal der Ordner .data/cms.

export class StoreNotConfiguredError extends Error {
  constructor() {
    super(
      "Kein Speicher eingerichtet. Verbinde in Vercel einen Blob Store (Storage → Blob, Zugriff: Private) mit diesem Projekt und deploye neu.",
    );
  }
}

/**
 * Vercel verbindet einen Blob Store entweder mit BLOB_READ_WRITE_TOKEN oder
 * (neuer) mit BLOB_STORE_ID; das SDK meldet sich dann selbst per OIDC an.
 */
export function hasBlobStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function assertWritable() {
  // Auf Vercel ist das Dateisystem schreibgeschützt.
  if (!hasBlobStore() && process.env.VERCEL) {
    throw new StoreNotConfiguredError();
  }
}

function localPath(key: string) {
  const root = resolve(process.cwd(), ".data", "cms");
  const path = resolve(root, key);

  if (!path.startsWith(`${root}${sep}`)) {
    throw new Error("Ungültiger Speicherpfad");
  }

  return path;
}

export async function readObject(key: string): Promise<Buffer | null> {
  if (hasBlobStore()) {
    const result = await get(key, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    return Buffer.from(await new Response(result.stream).arrayBuffer());
  }

  try {
    return await readFile(/* turbopackIgnore: true */ localPath(key));
  } catch {
    return null;
  }
}

export async function writeObject(key: string, data: Buffer | string, contentType: string) {
  assertWritable();

  if (hasBlobStore()) {
    await put(key, data, {
      access: "private",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType,
    });
    return;
  }

  const path = localPath(key);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(/* turbopackIgnore: true */ path, data);
}

export async function deleteObject(key: string) {
  assertWritable();

  if (hasBlobStore()) {
    await del(key);
    return;
  }

  await rm(/* turbopackIgnore: true */ localPath(key), { force: true });
}
