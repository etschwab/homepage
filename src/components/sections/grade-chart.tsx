import type { CSSProperties } from "react";

import type { GradeSeries } from "@/lib/cms/types";

// Schweizer Notenskala: 1 ist die tiefste Note, 4 genügend, 6 die beste.
const MIN_GRADE = 1;
const MAX_GRADE = 6;
const PASS_GRADE = 4;

const toPercent = (grade: number) => ((grade - MIN_GRADE) / (MAX_GRADE - MIN_GRADE)) * 100;
export const formatGrade = (grade: number) => (Math.round(grade * 10) / 10).toFixed(1);

/** Eingetragener Durchschnitt oder, falls leer, der Schnitt der Zeilen. */
export function seriesAverage(series: GradeSeries) {
  if (series.average > 0) return series.average;
  if (series.rows.length === 0) return 0;
  return series.rows.reduce((sum, row) => sum + row.value, 0) / series.rows.length;
}

export function GradeChart({ series }: { series: GradeSeries[] }) {
  const visible = series.filter((item) => item.rows.length > 0);
  if (visible.length === 0) return null;

  return (
    <div
      className="grade-chart"
      style={{ "--pass": `${toPercent(PASS_GRADE)}%` } as CSSProperties}
    >
      {visible.map((item, index) => (
        <figure className="grade-card" key={`${index}-${item.school}-${item.title}`}>
          <figcaption className="grade-card-head">
            <div className="grade-card-title">
              <span>{item.school}</span>
              <strong>{item.title}</strong>
            </div>
            <div className="grade-card-average">
              <strong>{formatGrade(seriesAverage(item))}</strong>
              <span>{item.averageLabel}</span>
            </div>
          </figcaption>

          <ol className="grade-rows">
            {item.rows.map((row, rowIndex) => (
              <li key={`${rowIndex}-${row.label}`}>
                <div className="grade-row-copy">
                  <span className="grade-row-label">{row.label}</span>
                  {row.detail ? <span className="grade-row-detail">{row.detail}</span> : null}
                  <strong className="grade-row-value">{formatGrade(row.value)}</strong>
                </div>
                <span className="grade-row-track" aria-hidden="true">
                  <span
                    className="grade-row-fill"
                    style={{ width: `${toPercent(row.value)}%` }}
                  />
                </span>
              </li>
            ))}
          </ol>

          <div className="grade-scale" aria-hidden="true">
            <span style={{ left: "0%" }}>{MIN_GRADE}</span>
            <span style={{ left: "var(--pass)" }}>{PASS_GRADE} genügend</span>
            <span style={{ left: "100%" }}>{MAX_GRADE}</span>
          </div>
        </figure>
      ))}
    </div>
  );
}
