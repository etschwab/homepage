import "server-only";

import type { GradeSeries } from "@/components/sections/grade-chart";

// Noten aus den Zeugnissen und Kompetenznachweisen, nach Dokumentgruppe (id).
// Gruppen ohne Eintrag zeigen keine Grafik.
export const gradesByGroup: Record<string, GradeSeries[]> = {
  zeugnisse: [
    {
      school: "BWD",
      title: "Berufsmaturität",
      average: 5.0,
      averageLabel: "Ø aller Semester",
      rows: [
        { label: "1. Semester", value: 5.0 },
        { label: "2. Semester", value: 5.1 },
        { label: "3. Semester", value: 5.0 },
        { label: "4. Semester", value: 4.9 },
      ],
    },
    {
      school: "GIBB",
      title: "Informatik",
      average: 5.1,
      averageLabel: "Erfahrungsnote",
      // Schnitt der Modulnoten pro Semester
      rows: [
        { label: "1. Semester", value: 4.75 },
        { label: "2. Semester", value: 5.25 },
        { label: "3. Semester", value: 5.25 },
        { label: "4. Semester", value: 5.0 },
      ],
    },
  ],
  "uek-nachweise": [
    {
      school: "ÜK",
      title: "Modulnoten",
      average: 5.33,
      averageLabel: "Ø aller Module",
      rows: [
        { label: "187", detail: "ICT-Arbeitsplatz in Betrieb nehmen", value: 5.0 },
        { label: "106", detail: "Datenbanken abfragen und warten", value: 5.5 },
        { label: "295", detail: "Backend realisieren", value: 5.0 },
        { label: "294", detail: "Frontend realisieren", value: 5.5 },
        { label: "210", detail: "Public Cloud nutzen", value: 5.5 },
        { label: "335", detail: "Mobile-App realisieren", value: 5.5 },
      ],
    },
  ],
};
