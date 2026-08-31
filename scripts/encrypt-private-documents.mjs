import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const sourceRoot = join(projectRoot, "private-documents");
const targetRoot = join(projectRoot, "secure-documents");
const MAGIC = Buffer.from("ESDOC1", "ascii");

function parseEnvFile(contents) {
  return Object.fromEntries(
    contents
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const key = line.slice(0, separator).trim();
        let value = line.slice(separator + 1).trim();

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        return [key, value];
      }),
  );
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? listFiles(path) : [path];
    }),
  );

  return files.flat();
}

const localEnv = parseEnvFile(
  await readFile(join(projectRoot, ".env.local"), "utf8").catch(() => ""),
);
const secret = process.env.SESSION_SECRET || localEnv.SESSION_SECRET;

if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
  throw new Error("SESSION_SECRET muss mindestens 32 Bytes lang sein.");
}

const key = createHash("sha256")
  .update("private-documents:v1\0", "utf8")
  .update(secret, "utf8")
  .digest();
const sourceFiles = await listFiles(sourceRoot);

for (const sourcePath of sourceFiles) {
  const relativePath = relative(sourceRoot, sourcePath);
  const targetPath = join(targetRoot, `${relativePath}.enc`);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const plaintext = await readFile(sourcePath);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  const encrypted = Buffer.concat([MAGIC, iv, tag, ciphertext]);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const verified = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  if (!verified.equals(plaintext)) {
    throw new Error(`Verschlüsselungsprüfung fehlgeschlagen: ${relativePath}`);
  }

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, encrypted);
}

console.log(`${sourceFiles.length} Dokumente verschlüsselt.`);
