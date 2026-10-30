"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { SaveBar } from "@/app/admin/save-bar";
import { saveContent, type ContentActionState } from "@/lib/cms/actions";
import { blankValue, type FieldSchema, type JsonValue } from "@/lib/cms/schema";
import type { SiteContent } from "@/lib/cms/types";

const sections: { key: keyof SiteContent; title: string; hint?: string }[] = [
  { key: "home", title: "Startseite", hint: "Zeile über dem Namen und Rolle darunter." },
  { key: "about", title: "Über mich", hint: "Der erste Absatz wird grösser dargestellt." },
  { key: "sections", title: "Abschnitts-Titel", hint: "Titel und Einleitung von Kompetenzen, Bildungsweg und Freizeit." },
  { key: "skillLevels", title: "Kompetenzen", hint: "Punkte: 1 bis 3. Farbton: strong, medium oder experience." },
  { key: "strengths", title: "Stärken" },
  { key: "education", title: "Bildungsweg", hint: "Der letzte Eintrag wird als «Aktuell» markiert." },
  { key: "interests", title: "Freizeit", hint: "Der erste Eintrag erscheint neben den Unihockey-Bildern." },
  { key: "projects", title: "Projekte", hint: "Bildpfade beginnen mit /images/… und müssen im Code liegen." },
  { key: "files", title: "Dateien", hint: "Text auf /dateien vor dem Login." },
  { key: "contact", title: "Kontakt", hint: "Nur nach dem Login sichtbar." },
  { key: "imprint", title: "Impressum" },
];

const labels: Record<string, string> = {
  name: "Name",
  kicker: "Zeile über dem Namen",
  role: "Rolle",
  tone: "Farbton",
  title: "Titel",
  text: "Text",
  skills: "Skills",
  "sections.skills": "Kompetenzen",
  "sections.education": "Bildungsweg",
  "sections.leisure": "Freizeit",
  paragraphs: "Absätze",
  facts: "Fakten",
  label: "Bezeichnung",
  value: "Wert",
  level: "Stufe",
  score: "Punkte (1–3)",
  items: "Bereiche",
  description: "Beschreibung",
  context: "Genutzt in",
  period: "Zeitraum",
  school: "Schule",
  group: "Gruppe",
  category: "Kategorie",
  abstract: "Projektabstract",
  goal: "Ziel",
  implementation: "Umsetzung",
  learnings: "Was ich gelernt habe",
  technologies: "Technologien",
  links: "Links",
  href: "Link-Adresse",
  imageSrc: "Bildpfad",
  imageAlt: "Bildbeschreibung",
  imagePresentation: "Bilddarstellung",
  email: "E-Mail",
  phoneDisplay: "Telefon (Anzeige)",
  phoneHref: "Telefon (für Anruf-Link, ohne Leerzeichen)",
  rows: "Zeilen",
  notes: "Hinweise",
  "abstract.role": "Meine Rolle",
};

const optionLabels: Record<string, string> = {
  "": "Kein Bild / Standard",
  strong: "Stark",
  medium: "Mittel",
  experience: "Erfahrung",
  cover: "Cover",
  phone: "Smartphone",
  portrait: "Hochformat",
  screenshot: "Screenshot",
};

const initialState: ContentActionState = {};

export function ContentEditor({
  initialContent,
  schema,
}: {
  initialContent: SiteContent;
  schema: FieldSchema;
}) {
  const [saved, setSaved] = useState<JsonValue>(initialContent as unknown as JsonValue);
  const [value, setValue] = useState<JsonValue>(saved);
  const [state, formAction, pending] = useActionState(saveContent, initialState);
  const dirty = JSON.stringify(value) !== JSON.stringify(saved);

  // Nach dem Speichern den bereinigten Stand vom Server übernehmen.
  const [handledAt, setHandledAt] = useState<number | undefined>();
  if (state.ok && state.content && state.savedAt !== handledAt) {
    setHandledAt(state.savedAt);
    setSaved(state.content as unknown as JsonValue);
    setValue(state.content as unknown as JsonValue);
  }

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  if (schema.kind !== "object" || !isRecord(value)) return null;

  return (
    <form action={formAction} className="admin-form">
      <input type="hidden" name="content" value={JSON.stringify(value)} />

      {sections.map((section, index) => (
        <details className="admin-section" key={section.key}>
          <summary>
            <span className="admin-section-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="admin-section-title">{section.title}</span>
            {section.hint ? <span className="admin-hint">{section.hint}</span> : null}
          </summary>
          <div className="admin-section-body">
            <Field
              schema={schema.fields[section.key]}
              value={value[section.key]}
              onChange={(next) => setValue({ ...value, [section.key]: next })}
              name={section.key}
              hideLabel
            />
          </div>
        </details>
      ))}

      <SaveBar
        pending={pending}
        dirty={dirty}
        ok={state.ok}
        message={state.message}
        onDiscard={() => setValue(saved)}
      />
    </form>
  );
}

type FieldProps = {
  schema: FieldSchema;
  value: JsonValue | undefined;
  onChange: (value: JsonValue) => void;
  name: string;
  /** Pfad des übergeordneten Objekts, z. B. "abstract" für "abstract.role" */
  parent?: string;
  hideLabel?: boolean;
};

function Field({ schema, value, onChange, name, parent, hideLabel }: FieldProps) {
  const label = labels[`${parent}.${name}`] ?? labels[name] ?? name;
  const id = useId();
  const ariaLabel = hideLabel ? label : undefined;

  switch (schema.kind) {
    case "string": {
      const text = typeof value === "string" ? value : "";
      return (
        <div className="form-field">
          {hideLabel ? null : <label htmlFor={id}>{label}</label>}
          {schema.options ? (
            <select id={id} aria-label={ariaLabel} value={text} onChange={(event) => onChange(event.target.value)}>
              {schema.options.map((option) => (
                <option key={option} value={option}>
                  {optionLabels[option] ?? option}
                </option>
              ))}
            </select>
          ) : schema.multiline ? (
            <textarea
              id={id}
              aria-label={ariaLabel}
              value={text}
              rows={Math.min(10, Math.max(3, Math.ceil(text.length / 80)))}
              onChange={(event) => onChange(event.target.value)}
            />
          ) : (
            <input id={id} aria-label={ariaLabel} type="text" value={text} onChange={(event) => onChange(event.target.value)} />
          )}
        </div>
      );
    }
    case "number":
      return (
        <div className="form-field">
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            type="number"
            value={typeof value === "number" ? value : 0}
            onChange={(event) => onChange(Number(event.target.value))}
          />
        </div>
      );
    case "boolean":
      return (
        <label className="admin-check">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(event) => onChange(event.target.checked)}
          />
          {label}
        </label>
      );
    case "object": {
      const record = isRecord(value) ? value : {};
      const body = Object.entries(schema.fields).map(([key, field]) => (
        <Field
          key={key}
          schema={field}
          value={record[key]}
          onChange={(next) => onChange({ ...record, [key]: next })}
          name={key}
          parent={name}
        />
      ));
      return hideLabel ? (
        <div className="admin-fields">{body}</div>
      ) : (
        <fieldset className="admin-fieldset">
          <legend>{label}</legend>
          <div className="admin-fields">{body}</div>
        </fieldset>
      );
    }
    case "array": {
      const items = Array.isArray(value) ? value : [];
      if (schema.item.kind === "string" && !schema.item.multiline && !schema.item.options) {
        return <TagListField id={id} label={label} items={items} onChange={onChange} hideLabel={hideLabel} />;
      }
      return (
        <ListField
          label={label}
          schema={schema.item}
          items={items}
          onChange={onChange}
          hideLabel={hideLabel}
        />
      );
    }
  }
}

function ListField({
  label,
  schema,
  items,
  onChange,
  hideLabel,
}: {
  label: string;
  schema: FieldSchema;
  items: JsonValue[];
  onChange: (value: JsonValue) => void;
  hideLabel?: boolean;
}) {
  const move = (from: number, to: number) => {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="admin-list">
      {hideLabel ? null : <p className="admin-list-label">{label}</p>}
      <ol>
        {items.map((item, index) => {
          const controls = (
            <div className="admin-item-controls">
              <button type="button" className="admin-icon" aria-label="Nach oben" disabled={index === 0} onClick={() => move(index, index - 1)}>
                <ArrowUp aria-hidden="true" size={16} />
              </button>
              <button type="button" className="admin-icon" aria-label="Nach unten" disabled={index === items.length - 1} onClick={() => move(index, index + 1)}>
                <ArrowDown aria-hidden="true" size={16} />
              </button>
              <button
                type="button"
                className="admin-icon is-danger"
                aria-label="Entfernen"
                onClick={() => {
                  if (schema.kind === "object" && !window.confirm(`«${summaryOf(item) || "Eintrag"}» entfernen?`)) return;
                  onChange(items.filter((_, position) => position !== index));
                }}
              >
                <Trash2 aria-hidden="true" size={16} />
              </button>
            </div>
          );
          const field = (
            <Field
              schema={schema}
              value={item}
              onChange={(next) => onChange(items.map((entry, position) => (position === index ? next : entry)))}
              name={`${label} ${index + 1}`}
              hideLabel
            />
          );

          return (
            <li key={index}>
              {schema.kind === "object" ? (
                <details className="admin-item">
                  <summary>
                    <span>{summaryOf(item) || `Eintrag ${index + 1}`}</span>
                    {controls}
                  </summary>
                  {field}
                </details>
              ) : (
                <div className="admin-item is-inline">
                  {field}
                  {controls}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <button type="button" className="admin-button is-add" onClick={() => onChange([...items, blankValue(schema)])}>
        <Plus aria-hidden="true" size={16} />
        Hinzufügen
      </button>
    </div>
  );
}

/** Kurze Listen wie Skills oder Technologien als kommagetrennter Text. */
function TagListField({
  id,
  label,
  items,
  onChange,
  hideLabel,
}: {
  id: string;
  label: string;
  items: JsonValue[];
  onChange: (value: JsonValue) => void;
  hideLabel?: boolean;
}) {
  const joined = items.map(String).join(", ");
  const [draft, setDraft] = useState(joined);
  const parse = (text: string) => text.split(",").map((part) => part.trim()).filter(Boolean);

  // Von aussen geänderte Werte (Verwerfen, Speichern) übernehmen.
  if (parse(draft).join(", ") !== joined) setDraft(joined);

  return (
    <div className="form-field">
      {hideLabel ? null : (
        <label htmlFor={id}>
          {label} <span className="admin-hint">kommagetrennt</span>
        </label>
      )}
      <input
        id={id}
        aria-label={hideLabel ? label : undefined}
        type="text"
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value);
          onChange(parse(event.target.value));
        }}
      />
    </div>
  );
}

function summaryOf(item: JsonValue) {
  if (!isRecord(item)) return typeof item === "string" ? item : "";
  for (const key of ["name", "title", "level", "school", "label", "period"]) {
    if (typeof item[key] === "string" && item[key]) return item[key] as string;
  }
  return "";
}

function isRecord(value: unknown): value is Record<string, JsonValue> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
