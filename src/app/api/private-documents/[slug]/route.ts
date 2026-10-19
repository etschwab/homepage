import { readSession } from "@/lib/auth/session";
import { findDocument } from "@/lib/cms/content";
import { readPrivateDocument } from "@/lib/private-documents/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const contentTypes = {
  PDF: "application/pdf",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const session = await readSession();

  if (!session) {
    return new Response("Nicht autorisiert", { status: 401 });
  }

  const { slug } = await context.params;
  const document = await findDocument(slug);

  if (!document) {
    return new Response("Datei nicht gefunden", { status: 404 });
  }

  try {
    const file = await readPrivateDocument(document);
    const download = new URL(request.url).searchParams.get("download") === "1";
    const disposition = download ? "attachment" : "inline";
    const encodedName = encodeURIComponent(document.downloadName);

    return new Response(new Uint8Array(file), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": `${disposition}; filename*=UTF-8''${encodedName}`,
        "Content-Length": String(file.byteLength),
        "Content-Type": contentTypes[document.format],
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Datei ist lokal nicht verfügbar", { status: 404 });
  }
}
