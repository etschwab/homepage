import { DocumentLibrary } from "@/components/sections/document-library";
import { privateDocumentGroups } from "@/data/private-documents";

export function PrivateSection({ username }: { username: string }) {
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
        </div>

        <DocumentLibrary groups={privateDocumentGroups} />
      </div>
    </section>
  );
}
