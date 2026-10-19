"use client";

import { useState } from "react";

import { ContentEditor } from "@/app/admin/content-editor";
import { DocumentsEditor } from "@/app/admin/documents-editor";
import type { FieldSchema } from "@/lib/cms/schema";
import type { ManagedDocumentGroup, SiteContent } from "@/lib/cms/types";

type AdminPanelProps = {
  content: SiteContent;
  schema: FieldSchema;
  groups: ManagedDocumentGroup[];
  storage: "blob" | "local" | "missing";
};

const tabs = [
  { id: "texte", label: "Texte" },
  { id: "dokumente", label: "Dokumente" },
] as const;

export function AdminPanel({ content, schema, groups, storage }: AdminPanelProps) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("texte");

  return (
    <div className="section admin">
      {storage === "missing" ? (
        <p className="admin-notice is-warning" role="alert">
          Speichern ist noch nicht möglich: In Vercel ist kein Blob Store mit
          diesem Projekt verbunden. Unter Storage → Create → Blob einen Store
          mit Zugriff «Private» anlegen, mit dem Projekt verbinden und neu
          deployen.
        </p>
      ) : storage === "local" ? (
        <p className="admin-notice">
          Lokaler Modus: Änderungen landen im Ordner <code>.data/cms</code> und
          sind nur auf diesem Rechner sichtbar. Auf der Live-Seite wird der
          Vercel Blob Store verwendet.
        </p>
      ) : null}

      <div className="admin-tabs" role="tablist" aria-label="Bereiche">
        {tabs.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            id={`admin-tab-${entry.id}`}
            aria-selected={tab === entry.id}
            aria-controls={`admin-panel-${entry.id}`}
            className="admin-button"
            onClick={() => setTab(entry.id)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="admin-panel-texte"
        aria-labelledby="admin-tab-texte"
        hidden={tab !== "texte"}
      >
        <ContentEditor initialContent={content} schema={schema} />
      </div>
      <div
        role="tabpanel"
        id="admin-panel-dokumente"
        aria-labelledby="admin-tab-dokumente"
        hidden={tab !== "dokumente"}
      >
        <DocumentsEditor initialGroups={groups} />
      </div>
    </div>
  );
}
