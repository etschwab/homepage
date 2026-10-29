import type { CSSProperties } from "react";

import { DocumentLibrary } from "@/components/sections/document-library";
import { gradesByGroup } from "@/data/grades";
import { getDocumentGroups } from "@/lib/cms/content";

export async function PrivateSection({ username }: { username: string }) {
  const groups = await getDocumentGroups();
  const privateDocumentGroups = groups.map((group, index) => ({
    index: String(index + 1).padStart(2, "0"),
    title: group.title,
    description: group.description,
    grades: gradesByGroup[group.id] ?? [],
    documents: group.documents.map((document) => ({
      title: document.title,
      description: document.description,
      format: document.format,
      size: document.size,
      previewSlug: document.id,
      downloadSlug: document.id,
    })),
  }));

  // Die Überschrift reicht links so weit nach unten, bis die erste Gruppe mit
  // Noten kommt – deren Grafik steht dann neben den passenden Dokumenten.
  const firstWithGrades = privateDocumentGroups.findIndex((group) => group.grades.length > 0);
  const headingRows = 1 + (firstWithGrades === -1 ? privateDocumentGroups.length : firstWithGrades);

  return (
    <section className="files-private" aria-labelledby="files-private-title">
      <div className="site-container files-private-grid">
        <div
          className="files-private-heading"
          style={{ "--heading-rows": headingRows } as CSSProperties}
        >
          <p className="section-eyebrow">Angemeldet als {username}</p>
          <h1 id="files-private-title" className="page-title">
            Persönliche<br /><em>Dateien.</em>
          </h1>
          <p className="files-lead">
            Persönliche Dokumente und Nachweise sind nur in diesem geschützten
            Bereich sichtbar.
          </p>
        </div>

        <DocumentLibrary groups={privateDocumentGroups} />
      </div>
    </section>
  );
}
