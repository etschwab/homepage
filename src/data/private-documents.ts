import "server-only";

export type PrivateDocument = {
  title: string;
  description: string;
  format: "PDF" | "DOCX";
  size: string;
  previewSlug: string;
  downloadSlug: string;
};

export const privateDocumentGroups = [
  {
    index: "01",
    title: "Lebenslauf",
    description: "Profil, Ausbildung und technische Kenntnisse auf einen Blick.",
    documents: [
      {
        title: "Lebenslauf Etienne Schwab",
        description: "Direkt als PDF ansehen oder als originale Word-Datei herunterladen.",
        format: "DOCX",
        size: "437 KB",
        previewSlug: "lebenslauf-vorschau",
        downloadSlug: "lebenslauf-original",
      },
    ],
  },
  {
    index: "02",
    title: "Zeugnisse",
    description: "Aktuelle Nachweise aus Berufsmaturität und Informatik.",
    documents: [
      {
        title: "Berufsmaturität",
        description: "Zeugnis der BWD Bern für die Berufsmaturität.",
        format: "PDF",
        size: "93 KB",
        previewSlug: "zeugnis-berufsmaturitaet",
        downloadSlug: "zeugnis-berufsmaturitaet",
      },
      {
        title: "Informatik",
        description: "Zeugnis der GIBB für den Informatikunterricht.",
        format: "PDF",
        size: "65 KB",
        previewSlug: "zeugnis-informatik",
        downloadSlug: "zeugnis-informatik",
      },
    ],
  },
  {
    index: "03",
    title: "ÜK-Nachweise",
    description: "Kompetenz- und Leistungsnachweise aus den überbetrieblichen Kursen.",
    documents: [
      {
        title: "KNW 106",
        description: "Kompetenznachweis aus dem überbetrieblichen Kurs KNW 106.",
        format: "PDF",
        size: "170 KB",
        previewSlug: "uek-knw106",
        downloadSlug: "uek-knw106",
      },
      {
        title: "KNW 187",
        description: "Kompetenznachweis aus dem überbetrieblichen Kurs KNW 187.",
        format: "PDF",
        size: "161 KB",
        previewSlug: "uek-knw187",
        downloadSlug: "uek-knw187",
      },
      {
        title: "Modul 295",
        description: "Backend für Applikationen realisieren.",
        format: "PDF",
        size: "90 KB",
        previewSlug: "uek-modul-295",
        downloadSlug: "uek-modul-295",
      },
      {
        title: "Modul 294",
        description: "Frontend einer interaktiven Webapplikation realisieren.",
        format: "PDF",
        size: "90 KB",
        previewSlug: "uek-modul-294",
        downloadSlug: "uek-modul-294",
      },
      {
        title: "Modul 210",
        description: "Public Cloud für Anwendungen nutzen.",
        format: "PDF",
        size: "90 KB",
        previewSlug: "uek-modul-210",
        downloadSlug: "uek-modul-210",
      },
      {
        title: "Modul 335",
        description: "Mobile-Applikation realisieren.",
        format: "PDF",
        size: "90 KB",
        previewSlug: "uek-modul-335",
        downloadSlug: "uek-modul-335",
      },
    ],
  },
] satisfies Array<{
  index: string;
  title: string;
  description: string;
  documents: PrivateDocument[];
}>;

export const privateDocumentFiles = {
  "lebenslauf-vorschau": {
    relativePath: "lebenslauf-etienne-schwab.pdf",
    downloadName: "Lebenslauf_Etienne_Schwab.pdf",
    contentType: "application/pdf",
  },
  "lebenslauf-original": {
    relativePath: "lebenslauf-etienne-schwab.docx",
    downloadName: "Lebenslauf_Etienne_Schwab.docx",
    contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  "zeugnis-berufsmaturitaet": {
    relativePath: "zeugnisse/berufsmaturitaet.pdf",
    downloadName: "Zeugnis_Berufsmaturitaet_Etienne_Schwab.pdf",
    contentType: "application/pdf",
  },
  "zeugnis-informatik": {
    relativePath: "zeugnisse/informatik.pdf",
    downloadName: "Zeugnis_Informatik_Etienne_Schwab.pdf",
    contentType: "application/pdf",
  },
  "uek-knw106": {
    relativePath: "uek/knw106.pdf",
    downloadName: "KNW106_Schwab_Etienne.pdf",
    contentType: "application/pdf",
  },
  "uek-knw187": {
    relativePath: "uek/knw187.pdf",
    downloadName: "KNW187_Schwab_Etienne.pdf",
    contentType: "application/pdf",
  },
  "uek-modul-295": {
    relativePath: "uek/modul-295.pdf",
    downloadName: "Kompetenznachweis_Modul_295_Etienne_Schwab.pdf",
    contentType: "application/pdf",
  },
  "uek-modul-294": {
    relativePath: "uek/modul-294.pdf",
    downloadName: "Kompetenznachweis_Modul_294_Etienne_Schwab.pdf",
    contentType: "application/pdf",
  },
  "uek-modul-210": {
    relativePath: "uek/modul-210.pdf",
    downloadName: "Kompetenznachweis_Modul_210_Etienne_Schwab.pdf",
    contentType: "application/pdf",
  },
  "uek-modul-335": {
    relativePath: "uek/modul-335.pdf",
    downloadName: "Kompetenznachweis_Modul_335_Etienne_Schwab.pdf",
    contentType: "application/pdf",
  },
} as const;

export const privateDocumentArchiveFiles = [
  {
    relativePath: "lebenslauf-etienne-schwab.docx",
    archivePath: "Bewerbungsunterlagen_Etienne_Schwab/Lebenslauf/Lebenslauf_Etienne_Schwab.docx",
  },
  {
    relativePath: "zeugnisse/berufsmaturitaet.pdf",
    archivePath: "Bewerbungsunterlagen_Etienne_Schwab/Zeugnisse/Zeugnis_Berufsmaturitaet_Etienne_Schwab.pdf",
  },
  {
    relativePath: "zeugnisse/informatik.pdf",
    archivePath: "Bewerbungsunterlagen_Etienne_Schwab/Zeugnisse/Zeugnis_Informatik_Etienne_Schwab.pdf",
  },
  {
    relativePath: "uek/knw106.pdf",
    archivePath: "Bewerbungsunterlagen_Etienne_Schwab/UEK-Nachweise/KNW106_Schwab_Etienne.pdf",
  },
  {
    relativePath: "uek/knw187.pdf",
    archivePath: "Bewerbungsunterlagen_Etienne_Schwab/UEK-Nachweise/KNW187_Schwab_Etienne.pdf",
  },
  {
    relativePath: "uek/modul-295.pdf",
    archivePath: "Bewerbungsunterlagen_Etienne_Schwab/UEK-Nachweise/Kompetenznachweis_Modul_295_Etienne_Schwab.pdf",
  },
  {
    relativePath: "uek/modul-294.pdf",
    archivePath: "Bewerbungsunterlagen_Etienne_Schwab/UEK-Nachweise/Kompetenznachweis_Modul_294_Etienne_Schwab.pdf",
  },
  {
    relativePath: "uek/modul-210.pdf",
    archivePath: "Bewerbungsunterlagen_Etienne_Schwab/UEK-Nachweise/Kompetenznachweis_Modul_210_Etienne_Schwab.pdf",
  },
  {
    relativePath: "uek/modul-335.pdf",
    archivePath: "Bewerbungsunterlagen_Etienne_Schwab/UEK-Nachweise/Kompetenznachweis_Modul_335_Etienne_Schwab.pdf",
  },
] as const;

export type PrivateDocumentSlug = keyof typeof privateDocumentFiles;

export function isPrivateDocumentSlug(value: string): value is PrivateDocumentSlug {
  return value in privateDocumentFiles;
}
