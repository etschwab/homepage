"use client";

import { useState } from "react";
import { ListPlus, Plus, Trash2 } from "lucide-react";

import { MoveButtons, move } from "@/app/admin/list-controls";
import { formatGrade, seriesAverage } from "@/components/sections/grade-chart";
import type { GradeRow, GradeSeries } from "@/lib/cms/types";

const blankRow: GradeRow = { label: "", detail: "", value: 0 };
const blankSeries: GradeSeries = {
  school: "",
  title: "",
  averageLabel: "Durchschnitt",
  average: 0,
  rows: [{ ...blankRow }],
};

/**
 * Notenblöcke einer Dokumentgruppe. Jeder Block wird auf der Dateien-Seite
 * als eigene Grafik neben den Dokumenten angezeigt.
 */
export function GradesEditor({
  groupId,
  series,
  onChange,
}: {
  groupId: string;
  series: GradeSeries[];
  onChange: (series: GradeSeries[]) => void;
}) {
  const rowCount = series.reduce((total, item) => total + item.rows.length, 0);

  const updateSeries = (index: number, patch: Partial<GradeSeries>) =>
    onChange(series.map((item, position) => (position === index ? { ...item, ...patch } : item)));

  const updateRow = (seriesIndex: number, rowIndex: number, patch: Partial<GradeRow>) =>
    updateSeries(seriesIndex, {
      rows: series[seriesIndex].rows.map((row, position) =>
        position === rowIndex ? { ...row, ...patch } : row,
      ),
    });

  return (
    <details className="admin-grades" open={series.length > 0}>
      <summary>
        Noten
        <span>
          {series.length === 0
            ? "keine Grafik"
            : `${series.length} Grafik${series.length === 1 ? "" : "en"} · ${rowCount} Note${rowCount === 1 ? "" : "n"}`}
        </span>
      </summary>

      <div className="admin-grades-body">
        <p className="admin-hint">
          Noten von 1 bis 6, z. B. 5.5 oder 5,5. Den Durchschnitt leer lassen,
          dann wird er aus den Zeilen berechnet. Gespeichert wird mit «Speichern».
        </p>

        {series.map((item, seriesIndex) => {
          const prefix = `grade-${groupId}-${seriesIndex}`;
          const computed = seriesAverage({ ...item, average: 0 });

          return (
            <div className="admin-grade-series" key={seriesIndex}>
              <div className="admin-grade-series-head">
                <div className="admin-fields is-four">
                  <div className="form-field">
                    <label htmlFor={`${prefix}-school`}>Schule</label>
                    <input
                      id={`${prefix}-school`}
                      value={item.school}
                      placeholder="z. B. BWD"
                      onChange={(event) => updateSeries(seriesIndex, { school: event.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor={`${prefix}-title`}>Titel</label>
                    <input
                      id={`${prefix}-title`}
                      value={item.title}
                      placeholder="z. B. Berufsmaturität"
                      onChange={(event) => updateSeries(seriesIndex, { title: event.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor={`${prefix}-average-label`}>Bezeichnung Schnitt</label>
                    <input
                      id={`${prefix}-average-label`}
                      value={item.averageLabel}
                      placeholder="z. B. Ø aller Semester"
                      onChange={(event) => updateSeries(seriesIndex, { averageLabel: event.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor={`${prefix}-average`}>Durchschnitt</label>
                    <GradeInput
                      id={`${prefix}-average`}
                      value={item.average}
                      allowEmpty
                      placeholder={computed ? `automatisch ${formatGrade(computed)}` : "automatisch"}
                      onChange={(average) => updateSeries(seriesIndex, { average })}
                    />
                  </div>
                </div>
                <div className="admin-item-controls">
                  <MoveButtons
                    index={seriesIndex}
                    length={series.length}
                    onMove={(to) => onChange(move(series, seriesIndex, to))}
                  />
                  <button
                    type="button"
                    className="admin-icon is-danger"
                    aria-label={`Notengrafik ${item.title || seriesIndex + 1} löschen`}
                    onClick={() => {
                      if (window.confirm(`Notengrafik «${item.title || "ohne Titel"}» löschen?`)) {
                        onChange(series.filter((_, position) => position !== seriesIndex));
                      }
                    }}
                  >
                    <Trash2 aria-hidden="true" size={16} />
                  </button>
                </div>
              </div>

              <div className="admin-grade-table">
                <div className="admin-grade-row is-header" aria-hidden="true">
                  <span>Bezeichnung</span>
                  <span>Zusatz (optional)</span>
                  <span>Note</span>
                  <span />
                </div>
                <ol>
                  {item.rows.map((row, rowIndex) => (
                    <li className="admin-grade-row" key={rowIndex}>
                      <input
                        aria-label={`Bezeichnung Zeile ${rowIndex + 1}`}
                        value={row.label}
                        placeholder="z. B. 1. Semester"
                        onChange={(event) => updateRow(seriesIndex, rowIndex, { label: event.target.value })}
                      />
                      <input
                        aria-label={`Zusatz Zeile ${rowIndex + 1}`}
                        value={row.detail}
                        placeholder="z. B. Modulname"
                        onChange={(event) => updateRow(seriesIndex, rowIndex, { detail: event.target.value })}
                      />
                      <GradeInput
                        aria-label={`Note Zeile ${rowIndex + 1}`}
                        value={row.value}
                        placeholder="5.5"
                        onChange={(value) => updateRow(seriesIndex, rowIndex, { value })}
                      />
                      <div className="admin-item-controls">
                        <MoveButtons
                          index={rowIndex}
                          length={item.rows.length}
                          onMove={(to) => updateSeries(seriesIndex, { rows: move(item.rows, rowIndex, to) })}
                        />
                        <button
                          type="button"
                          className="admin-icon is-danger"
                          aria-label={`Zeile ${row.label || rowIndex + 1} löschen`}
                          onClick={() =>
                            updateSeries(seriesIndex, {
                              rows: item.rows.filter((_, position) => position !== rowIndex),
                            })
                          }
                        >
                          <Trash2 aria-hidden="true" size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <button
                type="button"
                className="admin-button"
                onClick={() => updateSeries(seriesIndex, { rows: [...item.rows, { ...blankRow }] })}
              >
                <Plus aria-hidden="true" size={16} />
                Zeile hinzufügen
              </button>
            </div>
          );
        })}

        <button
          type="button"
          className="admin-button"
          onClick={() => onChange([...series, { ...blankSeries, rows: [{ ...blankRow }] }])}
        >
          <ListPlus aria-hidden="true" size={16} />
          Notengrafik hinzufügen
        </button>
      </div>
    </details>
  );
}

/**
 * Textfeld für Noten: akzeptiert Punkt und Komma und meldet nur gültige Werte
 * (1–6) weiter. Während des Tippens bleibt der eingegebene Text stehen.
 */
function GradeInput({
  value,
  onChange,
  allowEmpty = false,
  ...props
}: {
  value: number;
  onChange: (value: number) => void;
  allowEmpty?: boolean;
  id?: string;
  placeholder?: string;
  "aria-label"?: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? (value > 0 ? String(value) : "");
  const parsed = Number(text.replace(",", "."));
  const valid = text.trim() === "" ? allowEmpty : Number.isFinite(parsed) && parsed >= 1 && parsed <= 6;

  return (
    <input
      {...props}
      inputMode="decimal"
      autoComplete="off"
      value={text}
      aria-invalid={!valid || undefined}
      onChange={(event) => {
        const next = event.target.value;
        setDraft(next);
        const number = Number(next.replace(",", "."));
        if (next.trim() === "") onChange(0);
        else if (Number.isFinite(number) && number >= 1 && number <= 6) onChange(number);
      }}
      onBlur={() => setDraft(null)}
    />
  );
}
