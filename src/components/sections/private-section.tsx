import Link from "next/link";

import { DocumentLibrary } from "@/components/sections/document-library";
import { getDocumentGroups } from "@/lib/cms/content";

export async function PrivateSection({ username }: { username: string }) {
  const groups = await getDocumentGroups();
  const privateDocumentGroups = groups.map((group, index) => ({
    index: String(index + 1).padStart(2, "0"),
    title: group.title,
    description: group.description,
    documents: group.documents.map((document) => ({
      title: document.title,
      description: document.description,
      format: document.format,
      size: document.size,
      previewSlug: document.id,
      downloadSlug: document.id,
    })),
  }));

  return (
    <section className="files-private" aria-labelledby="files-private-title">
      <div className="site-container files-private-grid">
        <div className="files-private-heading">
          <p className="section-eyebrow">Angemeldet als {username}</p>
          <h1 id="files-private-title" className="page-title">
            Persönliche<br /><em>Dateien.</em>
          </h1>
          <p className="files-lead">
            Persönliche Dokumente und Nachweise sind nur in diesem geschützten
            Bereich sichtbar.
          </p>
          <Link href="/admin" className="action-link files-admin-link">
            Inhalte bearbeiten <span aria-hidden="true">→</span>
          </Link>
        </div>

        <DocumentLibrary groups={privateDocumentGroups} />
      </div>
    </section>
  );
}
