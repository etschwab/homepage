"use client";

import { AlertCircle, CheckCircle2, CircleDot, Loader2, Save } from "lucide-react";

/**
 * Leiste unten im Admin. Farbe und Symbol zeigen auf einen Blick, ob alles
 * gespeichert ist. Ohne `onSave` ist «Speichern» ein Submit-Button.
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
  const Icon = { pending: Loader2, error: AlertCircle, dirty: CircleDot, saved: CheckCircle2 }[status];

  return (
    <div className={`admin-savebar is-${status}`} aria-live="polite">
      <p>
        <Icon aria-hidden="true" size={17} />
        {text}
      </p>
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
