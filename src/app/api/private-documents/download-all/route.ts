import { readSession } from "@/lib/auth/session";
import { getDocumentGroups } from "@/lib/cms/content";
import { readPrivateDocument } from "@/lib/private-documents/storage";
import { createZipArchive } from "@/lib/private-documents/zip";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ARCHIVE_ROOT = "Bewerbungsunterlagen_Etienne_Schwab";

function folderName(title: string) {
  return title
    .replaceAll("Ü", "UE")
    .replaceAll("ü", "ue")
    .replaceAll("Ä", "AE")
    .replaceAll("ä", "ae")
    .replaceAll("Ö", "OE")
    .replaceAll("ö", "oe")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const session = await readSession();

  if (!session) {
    return new Response("Nicht autorisiert", { status: 401 });
  }

  const groups = await getDocumentGroups();
  const results = await Promise.allSettled(
    groups.flatMap((group) =>
      group.documents.map(async (document) => ({
        name: `${ARCHIVE_ROOT}/${folderName(group.title) || "Dokumente"}/${document.downloadName}`,
        data: await readPrivateDocument(document),
      })),
    ),
  );
  // Ein fehlendes Dokument soll nicht das ganze ZIP verhindern.
  const files = results.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));

  if (files.length === 0) {
    return new Response("Die Unterlagen sind lokal nicht verfügbar", { status: 404 });
  }

  const archive = createZipArchive(files);

  return new Response(new Uint8Array(archive), {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Disposition": `attachment; filename*=UTF-8''${ARCHIVE_ROOT}.zip`,
      "Content-Length": String(archive.byteLength),
      "Content-Type": "application/zip",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
