import { privateDocumentArchiveFiles } from "@/data/private-documents";
import { readSession } from "@/lib/auth/session";
import { readPrivateDocument } from "@/lib/private-documents/storage";
import { createZipArchive } from "@/lib/private-documents/zip";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const session = await readSession();

  if (!session) {
    return new Response("Nicht autorisiert", { status: 401 });
  }

  try {
    const files = await Promise.all(
      privateDocumentArchiveFiles.map(async (document) => {
        return {
          name: document.archivePath,
          data: await readPrivateDocument(document.relativePath),
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
