import "server-only";

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

import { readObject } from "@/lib/cms/store";
import type { ManagedDocument } from "@/lib/cms/types";

const MAGIC = Buffer.from("ESDOC1", "ascii");
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

function getEncryptionKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("SESSION_SECRET must be at least 32 bytes.");
  }

  return createHash("sha256")
    .update("private-documents:v1\0", "utf8")
    .update(secret, "utf8")
    .digest();
}

/** Gleiches Format wie scripts/encrypt-private-documents.mjs. */
export function encryptDocument(plaintext: Buffer) {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);

  return Buffer.concat([MAGIC, iv, cipher.getAuthTag(), ciphertext]);
}

function decryptDocument(encrypted: Buffer) {
  const minimumLength = MAGIC.length + IV_LENGTH + TAG_LENGTH + 1;

  if (
    encrypted.length < minimumLength ||
    !encrypted.subarray(0, MAGIC.length).equals(MAGIC)
  ) {
    throw new Error("Ungültiges Dokumentformat");
  }

  const ivStart = MAGIC.length;
  const tagStart = ivStart + IV_LENGTH;
  const contentStart = tagStart + TAG_LENGTH;
  const decipher = createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    encrypted.subarray(ivStart, tagStart),
  );

  decipher.setAuthTag(encrypted.subarray(tagStart, contentStart));

  return Buffer.concat([
    decipher.update(encrypted.subarray(contentStart)),
    decipher.final(),
  ]);
}

async function readRepoDocument(relativePath: string) {
  const documentRoot = resolve(process.cwd(), "secure-documents");
  const filePath = resolve(documentRoot, `${relativePath}.enc`);

  if (!filePath.startsWith(`${documentRoot}${sep}`)) {
    throw new Error("Ungültiger Dateipfad");
  }

  return readFile(/* turbopackIgnore: true */ filePath);
}

export async function readPrivateDocument(
  document: Pick<ManagedDocument, "storage" | "path">,
) {
  const encrypted =
    document.storage === "cms"
      ? await readObject(document.path)
      : await readRepoDocument(document.path);

  if (!encrypted) {
    throw new Error("Dokument nicht gefunden");
  }

  return decryptDocument(encrypted);
}
