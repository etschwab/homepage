import "server-only";

import type { ManagedDocumentGroup } from "@/lib/cms/types";

// Ausgangsstand der Dokumente. Sobald im Admin etwas geändert wird, gilt die
// dort gespeicherte Liste. Die Dateien liegen verschlüsselt in secure-documents.
export const defaultDocumentGroups: ManagedDocumentGroup[] = [
  {
    id: "lebenslauf",
    title: "Lebenslauf",
    description: "Profil, Ausbildung und technische Kenntnisse auf einen Blick.",
    documents: [
      {
        id: "lebenslauf-vorschau",
        title: "Lebenslauf Etienne Schwab",
        description: "Direkt als PDF ansehen oder herunterladen.",
        format: "PDF",
        size: "89 KB",
        downloadName: "Lebenslauf_Etienne_Schwab.pdf",
        storage: "repo",
        path: "lebenslauf-etienne-schwab.pdf",
      },
    ],
  },
  {
    id: "zeugnisse",
    title: "Zeugnisse",
    description: "Aktuelle Nachweise aus Berufsmaturität und Informatik.",
    documents: [
      {
        id: "zeugnis-berufsmaturitaet",
        title: "Berufsmaturität",
        description: "Zeugnis der BWD Bern für die Berufsmaturität.",
        format: "PDF",
        size: "93 KB",
        downloadName: "Zeugnis_Berufsmaturitaet_Etienne_Schwab.pdf",
        storage: "repo",
        path: "zeugnisse/berufsmaturitaet.pdf",
      },
      {
        id: "zeugnis-informatik",
        title: "Informatik",
        description: "Zeugnis der GIBB für den Informatikunterricht.",
        format: "PDF",
        size: "65 KB",
        downloadName: "Zeugnis_Informatik_Etienne_Schwab.pdf",
        storage: "repo",
        path: "zeugnisse/informatik.pdf",
      },
    ],
  },
  {
    id: "uek-nachweise",
    title: "ÜK-Nachweise",
    description: "Kompetenz- und Leistungsnachweise aus den überbetrieblichen Kursen.",
    documents: [
      {
        id: "uek-knw106",
        title: "KNW 106",
        description: "Kompetenznachweis aus dem überbetrieblichen Kurs KNW 106.",
        format: "PDF",
        size: "170 KB",
        downloadName: "KNW106_Schwab_Etienne.pdf",
        storage: "repo",
        path: "uek/knw106.pdf",
      },
      {
        id: "uek-knw187",
        title: "KNW 187",
        description: "Kompetenznachweis aus dem überbetrieblichen Kurs KNW 187.",
        format: "PDF",
        size: "161 KB",
        downloadName: "KNW187_Schwab_Etienne.pdf",
        storage: "repo",
        path: "uek/knw187.pdf",
      },
      {
        id: "uek-modul-295",
        title: "Modul 295",
        description: "Backend für Applikationen realisieren.",
        format: "PDF",
        size: "90 KB",
        downloadName: "Kompetenznachweis_Modul_295_Etienne_Schwab.pdf",
        storage: "repo",
        path: "uek/modul-295.pdf",
      },
      {
        id: "uek-modul-294",
        title: "Modul 294",
        description: "Frontend einer interaktiven Webapplikation realisieren.",
        format: "PDF",
        size: "90 KB",
        downloadName: "Kompetenznachweis_Modul_294_Etienne_Schwab.pdf",
        storage: "repo",
        path: "uek/modul-294.pdf",
      },
      {
        id: "uek-modul-210",
        title: "Modul 210",
        description: "Public Cloud für Anwendungen nutzen.",
        format: "PDF",
        size: "90 KB",
        downloadName: "Kompetenznachweis_Modul_210_Etienne_Schwab.pdf",
        storage: "repo",
        path: "uek/modul-210.pdf",
      },
      {
        id: "uek-modul-335",
        title: "Modul 335",
        description: "Mobile-Applikation realisieren.",
        format: "PDF",
        size: "90 KB",
        downloadName: "Kompetenznachweis_Modul_335_Etienne_Schwab.pdf",
        storage: "repo",
        path: "uek/modul-335.pdf",
      },
    ],
  },
];
