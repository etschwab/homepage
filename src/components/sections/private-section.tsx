import { FileText, LockKeyhole } from "lucide-react";

import { privateDocuments } from "@/data/private";

export function PrivateSection({ username }: { username: string }) {
  return (
    <section className="files-private" aria-labelledby="files-private-title">
      <div className="site-container split-layout">
        <div>
          <p className="section-label">
            <span className="page-index-inline" aria-hidden="true">04</span>
            Angemeldet als {username}
          </p>
          <h1 id="files-private-title" className="page-title">
            Dateien
          </h1>
          <p className="files-lead">
            Persönliche Dokumente und Nachweise sind nur in diesem geschützten
            Bereich sichtbar.
          </p>
        </div>

        <div className="document-grid">
          {privateDocuments.map((document) => (
            <article className="document-card" key={document.title}>
              <div className="document-card-icon">
                <FileText aria-hidden="true" size={22} />
                <span>PDF</span>
              </div>
              <div className="document-card-copy">
                <h2>{document.title}</h2>
                <p>{document.description}</p>
              </div>
              <p className="document-status">
                <LockKeyhole aria-hidden="true" size={13} />
                {document.status}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
