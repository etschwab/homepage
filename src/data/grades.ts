import "server-only";

export type GradeBar = { label: string; value: number };

export type GradeSeries = {
  school: string;
  title: string;
  /** Wert, der gross als Durchschnitt angezeigt wird */
  average: number;
  averageLabel: string;
  bars: GradeBar[];
};

// Noten aus den Zeugnissen und Kompetenznachweisen, nach Dokumentgruppe (id).
// Gruppen ohne Eintrag zeigen keine Grafik.
export const gradesByGroup: Record<string, GradeSeries[]> = {
  zeugnisse: [
    {
      school: "BWD",
      title: "Berufsmaturität",
      average: 5.0,
      averageLabel: "Ø aller Semester",
      bars: [
        { label: "1. Sem.", value: 5.0 },
        { label: "2. Sem.", value: 5.1 },
        { label: "3. Sem.", value: 5.0 },
        { label: "4. Sem.", value: 4.9 },
      ],
    },
    {
      school: "GIBB",
      title: "Informatik",
      average: 5.1,
      averageLabel: "Erfahrungsnote",
      bars: [
        { label: "1. Sem.", value: 4.75 },
        { label: "2. Sem.", value: 5.25 },
        { label: "3. Sem.", value: 5.25 },
        { label: "4. Sem.", value: 5.0 },
      ],
    },
  ],
  "uek-nachweise": [
    {
      school: "ÜK",
      title: "Modulnoten",
      average: 5.33,
      averageLabel: "Ø aller Module",
      bars: [
        { label: "187", value: 5.0 },
        { label: "106", value: 5.5 },
        { label: "295", value: 5.0 },
        { label: "294", value: 5.5 },
        { label: "210", value: 5.5 },
        { label: "335", value: 5.5 },
      ],
    },
  ],
};
