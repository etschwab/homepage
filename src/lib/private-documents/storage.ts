import "server-only";

import { createDecipheriv, createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

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

export async function readPrivateDocument(relativePath: string) {
  const documentRoot = resolve(process.cwd(), "secure-documents");
  const filePath = resolve(documentRoot, `${relativePath}.enc`);

  if (!filePath.startsWith(`${documentRoot}${sep}`)) {
    throw new Error("Ungültiger Dateipfad");
  }

  const encrypted = await readFile(/* turbopackIgnore: true */ filePath);
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
