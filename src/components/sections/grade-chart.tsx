import type { CSSProperties } from "react";

export type GradeSeries = {
  school: string;
  title: string;
  average: number;
  averageLabel: string;
  bars: { label: string; value: number }[];
};

// Schweizer Notenskala: 1 ist die tiefste Note, 4 genügend.
const MIN_GRADE = 1;
const MAX_GRADE = 6;
const PASS_GRADE = 4;

const toPercent = (grade: number) => ((grade - MIN_GRADE) / (MAX_GRADE - MIN_GRADE)) * 100;
const formatGrade = (grade: number) => (Math.round(grade * 10) / 10).toFixed(1);

export function GradeChart({ title, series }: { title: string; series: GradeSeries[] }) {
  return (
    <div className="grade-panel">
      <p className="grade-panel-eyebrow">Noten · {title}</p>
      {series.map((item) => (
        <figure className="grade-series" key={`${item.school}-${item.title}`}>
          <figcaption>
            <div>
              <span>{item.school}</span>
              <strong>{item.title}</strong>
            </div>
            <div className="grade-series-average">
              <strong>{formatGrade(item.average)}</strong>
              <span>{item.averageLabel}</span>
            </div>
          </figcaption>

          <div
            className="grade-bars"
            style={{ "--pass": toPercent(PASS_GRADE) } as CSSProperties}
          >
            <span className="grade-pass-line" aria-hidden="true">
              <span>{PASS_GRADE}</span>
            </span>
            {item.bars.map((bar) => (
              <div className="grade-bar" key={bar.label}>
                <div className="grade-bar-track">
                  <div
                    className="grade-bar-fill"
                    style={{ height: `${toPercent(bar.value)}%` }}
                  >
                    <span>{formatGrade(bar.value)}</span>
                  </div>
                </div>
                <span className="grade-bar-label">{bar.label}</span>
              </div>
            ))}
          </div>
        </figure>
      ))}
    </div>
  );
}
