import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

import {
  isPrivateDocumentSlug,
  privateDocumentFiles,
} from "@/data/private-documents";
import { readSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const session = await readSession();

  if (!session) {
    return new Response("Nicht autorisiert", { status: 401 });
  }

  const { slug } = await context.params;

  if (!isPrivateDocumentSlug(slug)) {
    return new Response("Datei nicht gefunden", { status: 404 });
  }

  const document = privateDocumentFiles[slug];
  const documentRoot = resolve(
    /* turbopackIgnore: true */
    process.env.PRIVATE_DOCUMENTS_DIR ?? resolve(process.cwd(), "private-documents"),
  );
  const filePath = resolve(documentRoot, document.relativePath);

  if (!filePath.startsWith(`${documentRoot}${sep}`)) {
    return new Response("Ungültiger Dateipfad", { status: 400 });
  }

  try {
    const file = await readFile(/* turbopackIgnore: true */ filePath);
    const download = new URL(request.url).searchParams.get("download") === "1";
    const disposition = download ? "attachment" : "inline";
    const encodedName = encodeURIComponent(document.downloadName);

    return new Response(file, {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": `${disposition}; filename*=UTF-8''${encodedName}`,
        "Content-Length": String(file.byteLength),
        "Content-Type": document.contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Datei ist lokal nicht verfügbar", { status: 404 });
  }
}
