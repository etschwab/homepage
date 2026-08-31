import {
  isPrivateDocumentSlug,
  privateDocumentFiles,
} from "@/data/private-documents";
import { readSession } from "@/lib/auth/session";
import { readPrivateDocument } from "@/lib/private-documents/storage";

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
  try {
    const file = await readPrivateDocument(document.relativePath);
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
