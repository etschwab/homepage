import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

import { privateDocumentArchiveFiles } from "@/data/private-documents";
import { readSession } from "@/lib/auth/session";
import { createZipArchive } from "@/lib/private-documents/zip";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const session = await readSession();

  if (!session) {
    return new Response("Nicht autorisiert", { status: 401 });
  }

  const documentRoot = resolve(
    /* turbopackIgnore: true */
    process.env.PRIVATE_DOCUMENTS_DIR ?? resolve(process.cwd(), "private-documents"),
  );

  try {
    const files = await Promise.all(
      privateDocumentArchiveFiles.map(async (document) => {
        const filePath = resolve(documentRoot, document.relativePath);

        if (!filePath.startsWith(`${documentRoot}${sep}`)) {
          throw new Error("Ungültiger Dateipfad");
        }

        return {
          name: document.archivePath,
          data: await readFile(/* turbopackIgnore: true */ filePath),
        };
      }),
    );
    const archive = createZipArchive(files);

    return new Response(new Uint8Array(archive), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": "attachment; filename*=UTF-8''Bewerbungsunterlagen_Etienne_Schwab.zip",
        "Content-Length": String(archive.byteLength),
        "Content-Type": "application/zip",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Die Unterlagen sind lokal nicht vollständig verfügbar", { status: 404 });
  }
}
