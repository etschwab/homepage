"use client";

import { useActionState, useEffect, useRef } from "react";
import { BookmarkCheck, RotateCcw } from "lucide-react";

import { manageStandard, type StandardActionState } from "@/lib/cms/actions";

const initialState: StandardActionState = {};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("de-CH", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Zurich",
  });
}

/**
 * Ganz unten im Admin: den gespeicherten Stand als Standard festlegen oder
 * auf diesen Standard zurücksetzen. Beides nur mit Admin-Passwort.
 */
export function StandardPanel({ savedAt }: { savedAt: string | null }) {
  const [state, formAction, pending] = useActionState(manageStandard, initialState);
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentSavedAt = state.standardSavedAt ?? savedAt;

  // Nach dem Zurücksetzen neu laden, damit Texte und Dokumente oben stimmen.
  useEffect(() => {
    if (state.restored) window.location.reload();
  }, [state.restored]);

  useEffect(() => {
    if (state.ok && passwordRef.current) passwordRef.current.value = "";
  }, [state]);

  return (
    <section className="admin-standard" aria-labelledby="admin-standard-title">
      <h2 id="admin-standard-title">Standard</h2>
      <p className="admin-intro">
        Der Standard ist ein gesicherter Stand von Texten und Dokumenten. Wenn
        etwas schiefgeht, kannst du darauf zurücksetzen. Ungespeicherte
        Änderungen oben zählen nicht, nur was gespeichert ist.
      </p>
      <p className="admin-standard-status">
        {currentSavedAt
          ? `Aktueller Standard: festgelegt am ${formatDate(currentSavedAt)}.`
          : "Noch kein eigener Standard festgelegt. Zurücksetzen führt zum ursprünglichen Stand aus dem Code."}
      </p>

      <form action={formAction} className="admin-standard-form">
        <div className="form-field">
          <label>
            Admin-Passwort zur Bestätigung
            <input
              ref={passwordRef}
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
        </div>

        <div className="admin-standard-actions">
          <button
            type="submit"
            name="intent"
            value="set"
            className="admin-button"
            disabled={pending}
            onClick={(event) => {
              if (!window.confirm("Den aktuell gespeicherten Stand als neuen Standard festlegen? Der bisherige Standard wird ersetzt.")) {
                event.preventDefault();
              }
            }}
          >
            <BookmarkCheck aria-hidden="true" size={16} />
            Als Standard festlegen
          </button>
          <button
            type="submit"
            name="intent"
            value="restore"
            className="admin-button is-danger"
            disabled={pending}
            onClick={(event) => {
              if (!window.confirm("Texte und Dokumente auf den Standard zurücksetzen? Alles, was seither geändert wurde, geht verloren.")) {
                event.preventDefault();
              }
            }}
          >
            <RotateCcw aria-hidden="true" size={16} />
            Auf Standard zurücksetzen
          </button>
        </div>

        <p
          className={`admin-standard-message${state.ok === false ? " is-error" : ""}`}
          aria-live="polite"
        >
          {pending ? "Wird ausgeführt …" : state.message}
        </p>
      </form>
    </section>
  );
}
