"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { BarChart3, Eye, FilePlus2, FileText, FileUp, FolderPlus, Trash2 } from "lucide-react";

import { GradesEditor } from "@/app/admin/grades-editor";
import { MoveButtons, move } from "@/app/admin/list-controls";
import { SaveBar } from "@/app/admin/save-bar";
import { saveDocuments, type DocumentsActionState } from "@/lib/cms/actions";
import type { ManagedDocument, ManagedDocumentGroup } from "@/lib/cms/types";

const initialState: DocumentsActionState = {};
const ACCEPT = ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function DocumentsEditor({ initialGroups }: { initialGroups: ManagedDocumentGroup[] }) {
  const [saved, setSaved] = useState(initialGroups);
  const [groups, setGroups] = useState(initialGroups);
  const [state, formAction, pending] = useActionState(saveDocuments, initialState);
  const [handledAt, setHandledAt] = useState<number | undefined>();
  const dirty = JSON.stringify(groups) !== JSON.stringify(saved);

  if (state.ok && state.groups && state.savedAt !== handledAt) {
    setHandledAt(state.savedAt);
    setSaved(state.groups);
    setGroups(state.groups);
  }

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  /** Speichert die Liste, optional zusammen mit einer hochgeladenen Datei. */
  const submit = (nextGroups: ManagedDocumentGroup[], extra?: Record<string, string | File>) => {
    const formData = new FormData();
    formData.set("groups", JSON.stringify(nextGroups));
    for (const [key, value] of Object.entries(extra ?? {})) formData.set(key, value);
    startTransition(() => formAction(formData));
  };

  const updateGroup = (index: number, patch: Partial<ManagedDocumentGroup>) =>
    setGroups(groups.map((group, position) => (position === index ? { ...group, ...patch } : group)));

  const updateDocument = (groupIndex: number, documentIndex: number, patch: Partial<ManagedDocument>) =>
    updateGroup(groupIndex, {
      documents: groups[groupIndex].documents.map((document, position) =>
        position === documentIndex ? { ...document, ...patch } : document,
      ),
    });

  const moveDocumentToGroup = (from: number, documentIndex: number, to: number) => {
    const document = groups[from].documents[documentIndex];
    setGroups(
      groups.map((group, position) => {
        if (position === from) return { ...group, documents: group.documents.filter((_, i) => i !== documentIndex) };
        if (position === to) return { ...group, documents: [...group.documents, document] };
        return group;
      }),
    );
  };

  const documentCount = groups.reduce((total, group) => total + group.documents.length, 0);

  return (
    <div className="admin-form">
      <div className="admin-legend">
        <p className="admin-intro">
          Titel, Reihenfolge und Noten ändern und mit «Speichern» übernehmen.
          Hochladen, Ersetzen und Löschen werden sofort gespeichert. Erlaubt sind
          PDF und Word (.docx) bis 4 MB.
        </p>
        <ul aria-label="Farben">
          <li className="is-group">Gruppe</li>
          <li className="is-docs">Dokumente</li>
          <li className="is-grades">Noten</li>
          <li className="is-upload">Hochladen</li>
        </ul>
        <p className="admin-hint">
          {groups.length} Gruppe{groups.length === 1 ? "" : "n"} · {documentCount} Dokument{documentCount === 1 ? "" : "e"}
        </p>
      </div>

      {groups.map((group, groupIndex) => {
        const gradeCount = group.grades.length;

        return (
          <section className="admin-group" key={group.id} aria-label={group.title || "Gruppe"}>
            <header className="admin-group-bar">
              <span className="admin-group-number" aria-hidden="true">
                {String(groupIndex + 1).padStart(2, "0")}
              </span>
              <div className="admin-group-bar-title">
                <h3>{group.title || "Ohne Titel"}</h3>
                <div className="admin-chips">
                  <span className="admin-chip is-docs">
                    <FileText aria-hidden="true" size={13} />
                    {group.documents.length} Dokument{group.documents.length === 1 ? "" : "e"}
                  </span>
                  <span className={`admin-chip ${gradeCount ? "is-grades" : "is-muted"}`}>
                    <BarChart3 aria-hidden="true" size={13} />
                    {gradeCount ? `${gradeCount} Notengrafik${gradeCount === 1 ? "" : "en"}` : "keine Noten"}
                  </span>
                </div>
              </div>
              <div className="admin-item-controls">
                <MoveButtons
                  index={groupIndex}
                  length={groups.length}
                  onMove={(to) => setGroups(move(groups, groupIndex, to))}
                />
                <span className="admin-controls-divider" aria-hidden="true" />
                <button
                  type="button"
                  className="admin-icon is-danger"
                  aria-label={`Gruppe ${group.title} löschen`}
                  title="Gruppe löschen"
                  onClick={() => {
                    const count = group.documents.length;
                    const question = count
                      ? `Gruppe «${group.title}» mit ${count} Dokument${count === 1 ? "" : "en"} löschen?`
                      : `Gruppe «${group.title}» löschen?`;
                    if (window.confirm(question)) submit(groups.filter((_, i) => i !== groupIndex));
                  }}
                >
                  <Trash2 aria-hidden="true" size={16} />
                </button>
              </div>
            </header>

            <div className="admin-group-body">
              <div className="admin-block is-group">
                <p className="admin-block-label">Gruppe</p>
                <div className="admin-fields is-two">
                  <div className="form-field">
                    <label htmlFor={`group-title-${group.id}`}>Titel</label>
                    <input
                      id={`group-title-${group.id}`}
                      value={group.title}
                      onChange={(event) => updateGroup(groupIndex, { title: event.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor={`group-description-${group.id}`}>Beschreibung</label>
                    <input
                      id={`group-description-${group.id}`}
                      value={group.description}
                      onChange={(event) => updateGroup(groupIndex, { description: event.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-block is-docs">
                <p className="admin-block-label">
                  Dokumente <span>{group.documents.length}</span>
                </p>
                {group.documents.length === 0 ? (
                  <p className="admin-hint">Noch keine Dokumente in dieser Gruppe.</p>
                ) : (
                  <ol className="admin-documents">
                    {group.documents.map((document, documentIndex) => (
                      <li className="admin-document" key={document.id}>
                        <div className="admin-document-head">
                          <span className="admin-document-icon" aria-hidden="true">
                            <FileText size={16} />
                          </span>
                          <strong>{document.title || "Ohne Titel"}</strong>
                          <span className={`admin-chip ${document.format === "PDF" ? "is-pdf" : "is-docx"}`}>
                            {document.format}
                          </span>
                          <span className="admin-chip is-muted">{document.size}</span>
                          <span className={`admin-chip ${document.storage === "cms" ? "is-upload" : "is-muted"}`}>
                            {document.storage === "cms" ? "im Admin hochgeladen" : "aus dem Code"}
                          </span>
                        </div>

                        <div className="admin-fields is-three">
                          <div className="form-field">
                            <label htmlFor={`doc-title-${document.id}`}>Titel</label>
                            <input
                              id={`doc-title-${document.id}`}
                              value={document.title}
                              onChange={(event) => updateDocument(groupIndex, documentIndex, { title: event.target.value })}
                            />
                          </div>
                          <div className="form-field">
                            <label htmlFor={`doc-description-${document.id}`}>Beschreibung</label>
                            <input
                              id={`doc-description-${document.id}`}
                              value={document.description}
                              onChange={(event) => updateDocument(groupIndex, documentIndex, { description: event.target.value })}
                            />
                          </div>
                          <div className="form-field">
                            <label htmlFor={`doc-name-${document.id}`}>Dateiname beim Download</label>
                            <input
                              id={`doc-name-${document.id}`}
                              value={document.downloadName}
                              onChange={(event) => updateDocument(groupIndex, documentIndex, { downloadName: event.target.value })}
                            />
                          </div>
                        </div>

                        <div className="admin-document-foot">
                          {groups.length > 1 ? (
                            <label className="admin-move-select">
                              Gruppe
                              <select
                                value={groupIndex}
                                onChange={(event) => moveDocumentToGroup(groupIndex, documentIndex, Number(event.target.value))}
                              >
                                {groups.map((option, optionIndex) => (
                                  <option key={option.id} value={optionIndex}>
                                    {option.title || `Gruppe ${optionIndex + 1}`}
                                  </option>
                                ))}
                              </select>
                            </label>
                          ) : (
                            <span />
                          )}
                          <div className="admin-item-controls">
                            <a
                              className="admin-icon"
                              href={`/api/private-documents/${document.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${document.title} ansehen`}
                              title="Ansehen"
                            >
                              <Eye aria-hidden="true" size={16} />
                            </a>
                            <FileButton
                              label={`${document.title} durch neue Datei ersetzen`}
                              disabled={pending}
                              onFile={(file) => submit(groups, { file, replaceId: document.id })}
                            >
                              <FileUp aria-hidden="true" size={16} />
                            </FileButton>
                            <span className="admin-controls-divider" aria-hidden="true" />
                            <MoveButtons
                              index={documentIndex}
                              length={group.documents.length}
                              onMove={(to) => updateGroup(groupIndex, { documents: move(group.documents, documentIndex, to) })}
                            />
                            <span className="admin-controls-divider" aria-hidden="true" />
                            <button
                              type="button"
                              className="admin-icon is-danger"
                              aria-label={`${document.title} löschen`}
                              title="Löschen"
                              disabled={pending}
                              onClick={() => {
                                if (!window.confirm(`«${document.title}» löschen?`)) return;
                                submit(
                                  groups.map((entry, i) =>
                                    i === groupIndex
                                      ? { ...entry, documents: entry.documents.filter((_, j) => j !== documentIndex) }
                                      : entry,
                                  ),
                                );
                              }}
                            >
                              <Trash2 aria-hidden="true" size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <GradesEditor
                groupId={group.id}
                series={group.grades}
                onChange={(grades) => updateGroup(groupIndex, { grades })}
              />

              <UploadForm
                disabled={pending}
                onUpload={(file, title, description) =>
                  submit(groups, { file, title, description, uploadGroupId: group.id })
                }
              />
            </div>
          </section>
        );
      })}

      <button
        type="button"
        className="admin-button is-add"
        onClick={() =>
          setGroups([
            ...groups,
            { id: `neue-gruppe-${Date.now().toString(36)}`, title: "Neue Gruppe", description: "", grades: [], documents: [] },
          ])
        }
      >
        <FolderPlus aria-hidden="true" size={16} />
        Gruppe hinzufügen
      </button>

      <SaveBar
        pending={pending}
        dirty={dirty}
        ok={state.ok}
        message={state.message}
        onDiscard={() => setGroups(saved)}
        onSave={() => submit(groups)}
      />
    </div>
  );
}

function UploadForm({
  disabled,
  onUpload,
}: {
  disabled: boolean;
  onUpload: (file: File, title: string, description: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="admin-block is-upload">
      <p className="admin-block-label">Neues Dokument hochladen</p>
      <div className="admin-fields is-three">
        <div className="form-field">
          <label>
            Datei
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              onChange={(event) => {
                const next = event.target.files?.[0] ?? null;
                setFile(next);
                if (next && !title) setTitle(next.name.replace(/\.[^.]+$/, "").replaceAll("_", " "));
              }}
            />
          </label>
        </div>
        <div className="form-field">
          <label>
            Titel
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
        </div>
        <div className="form-field">
          <label>
            Beschreibung
            <input value={description} onChange={(event) => setDescription(event.target.value)} />
          </label>
        </div>
      </div>
      <button
        type="button"
        className="admin-button is-add"
        disabled={!file || disabled}
        onClick={() => {
          if (!file) return;
          onUpload(file, title, description);
          setFile(null);
          setTitle("");
          setDescription("");
          if (inputRef.current) inputRef.current.value = "";
        }}
      >
        <FilePlus2 aria-hidden="true" size={16} />
        Hochladen
      </button>
    </div>
  );
}

function FileButton({
  label,
  disabled,
  onFile,
  children,
}: {
  label: string;
  disabled: boolean;
  onFile: (file: File) => void;
  children: React.ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        className="admin-icon"
        aria-label={label}
        title="Datei ersetzen"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        {children}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) onFile(file);
        }}
      />
    </>
  );
}
