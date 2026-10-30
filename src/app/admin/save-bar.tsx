"use client";

import { Save } from "lucide-react";

/**
 * Leiste unten im Admin mit dem Speicherstand. Ohne `onSave` ist
 * «Speichern» ein Submit-Button.
 */
export function SaveBar({
  pending,
  dirty,
  ok,
  message,
  onDiscard,
  onSave,
}: {
  pending: boolean;
  dirty: boolean;
  ok?: boolean;
  message?: string;
  onDiscard: () => void;
  onSave?: () => void;
}) {
  const status = pending ? "pending" : ok === false ? "error" : dirty ? "dirty" : "saved";
  const text = {
    pending: "Wird gespeichert …",
    error: message,
    dirty: "Ungespeicherte Änderungen",
    saved: message ?? "Alles gespeichert",
  }[status];

  return (
    <div className={`admin-savebar is-${status}`} aria-live="polite">
      <p>{text}</p>
      <div className="admin-savebar-actions">
        <button type="button" className="admin-button" disabled={!dirty || pending} onClick={onDiscard}>
          Verwerfen
        </button>
        <button
          type={onSave ? "button" : "submit"}
          className="admin-button is-primary"
          disabled={!dirty || pending}
          onClick={onSave}
        >
          <Save aria-hidden="true" size={16} />
          Speichern
        </button>
      </div>
    </div>
  );
}
