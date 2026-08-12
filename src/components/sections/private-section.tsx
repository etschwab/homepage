import { FileText, LockKeyhole } from "lucide-react";

import { privateDocuments } from "@/data/private";

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

        <div className="document-list">
          {privateDocuments.map((document, index) => (
            <article className="document-row" key={document.title}>
              <div className="document-card-icon">
                <FileText aria-hidden="true" size={20} />
                <span>0{index + 1}</span>
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
