import type { CSSProperties } from "react";

export type GradeSeries = {
  school: string;
  title: string;
  /** Wert, der gross als Durchschnitt angezeigt wird */
  average: number;
  averageLabel: string;
  rows: { label: string; detail?: string; value: number }[];
};

// Schweizer Notenskala: 1 ist die tiefste Note, 4 genügend, 6 die beste.
const MIN_GRADE = 1;
const MAX_GRADE = 6;
const PASS_GRADE = 4;

const toPercent = (grade: number) => ((grade - MIN_GRADE) / (MAX_GRADE - MIN_GRADE)) * 100;
const formatGrade = (grade: number) => (Math.round(grade * 10) / 10).toFixed(1);

export function GradeChart({ series }: { series: GradeSeries[] }) {
  return (
    <div
      className="grade-chart"
      style={{ "--pass": `${toPercent(PASS_GRADE)}%` } as CSSProperties}
    >
      {series.map((item) => (
        <figure className="grade-card" key={`${item.school}-${item.title}`}>
          <figcaption className="grade-card-head">
            <div className="grade-card-title">
              <span>{item.school}</span>
              <strong>{item.title}</strong>
            </div>
            <div className="grade-card-average">
              <strong>{formatGrade(item.average)}</strong>
              <span>{item.averageLabel}</span>
            </div>
          </figcaption>

          <ol className="grade-rows">
            {item.rows.map((row) => (
              <li key={row.label}>
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
