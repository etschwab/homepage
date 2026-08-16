"use client";

import { Download, Eye, FileArchive, FileText, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useModalScrollLock } from "@/hooks/use-modal-scroll-lock";

type DocumentItem = {
  title: string;
  description: string;
  format: "PDF" | "DOCX";
  size: string;
  previewSlug: string;
  downloadSlug: string;
};

type DocumentGroup = {
  index: string;
  title: string;
  description: string;
  documents: DocumentItem[];
};

export function DocumentLibrary({ groups }: { groups: DocumentGroup[] }) {
  const [preview, setPreview] = useState<DocumentItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useModalScrollLock(Boolean(preview));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (preview && !dialog.open) dialog.showModal();
    if (!preview && dialog.open) dialog.close();
  }, [preview]);

  return (
    <>
      <div className="document-vault">
        <div className="document-vault-status">
          <div className="document-vault-status-copy">
            <ShieldCheck aria-hidden="true" size={17} />
            <span>Privat & geschützt</span>
            <span>{groups.reduce((total, group) => total + group.documents.length, 0)} Dokumente</span>
          </div>
          <Link className="document-download-all" href="/api/private-documents/download-all" prefetch={false}>
            <FileArchive aria-hidden="true" size={17} />
            Alle herunterladen
            <span>ZIP</span>
          </Link>
        </div>

        {groups.map((group) => (
          <section className="document-group" key={group.index} aria-labelledby={`document-group-${group.index}`}>
            <header className="document-group-heading">
              <span>{group.index}</span>
              <div>
                <h2 id={`document-group-${group.index}`}>{group.title}</h2>
                <p>{group.description}</p>
              </div>
            </header>

            <div className={`document-card-grid${group.documents.length === 1 ? " is-single" : ""}`}>
              {group.documents.map((document) => (
                <article className="private-document-card" key={document.title}>
                  <div className="private-document-card-topline">
                    <span className="private-document-icon" aria-hidden="true">
                      <FileText size={19} />
                    </span>
                    <span>{document.format} · {document.size}</span>
                  </div>
                  <div className="private-document-card-copy">
                    <h3>{document.title}</h3>
                    <p>{document.description}</p>
                  </div>
                  <div className="private-document-actions">
                    <button type="button" onClick={() => setPreview(document)}>
                      <Eye aria-hidden="true" size={16} />
                      Ansehen
                    </button>
                    <a href={`/api/private-documents/${document.downloadSlug}?download=1`}>
                      <Download aria-hidden="true" size={16} />
                      Download
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="document-preview-dialog"
        aria-labelledby="document-preview-title"
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setPreview(null);
        }}
      >
        {preview ? (
          <div className="document-preview-shell">
            <header>
              <div>
                <p>Geschützte Vorschau</p>
                <h2 id="document-preview-title">{preview.title}</h2>
              </div>
              <div className="document-preview-header-actions">
                <a href={`/api/private-documents/${preview.downloadSlug}?download=1`}>
                  <Download aria-hidden="true" size={16} />
                  Herunterladen
                </a>
                <button type="button" onClick={() => setPreview(null)} aria-label="Vorschau schließen">
                  <X aria-hidden="true" size={20} />
                </button>
              </div>
            </header>
            <div className="document-preview-stage">
              <iframe
                src={`/api/private-documents/${preview.previewSlug}`}
                title={`Vorschau: ${preview.title}`}
              />
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
