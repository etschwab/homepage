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

  return (
    <section className="files-private" aria-labelledby="files-private-title">
      <div className="site-container">
        <DocumentLibrary groups={privateDocumentGroups}>
          <div className="files-private-heading">
            <p className="section-eyebrow">Angemeldet als {username}</p>
            <h1 id="files-private-title" className="page-title">
              Persönliche<br /><em>Dateien.</em>
            </h1>
            <p className="files-lead">
              Persönliche Dokumente und Nachweise sind nur in diesem geschützten
              Bereich sichtbar.
            </p>
          </div>
        </DocumentLibrary>
      </div>
    </section>
  );
}
