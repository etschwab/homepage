import "server-only";

export const privateProfile = {
  email: "etienne.schwab@bwdbern.ch",
  location: "Muri-Gümligen, Region Bern",
} as const;

export const privateDocuments = [
  {
    title: "Lebenslauf",
    description: "Ausbildung, Erfahrungen und persönliche Angaben kompakt als PDF.",
    status: "PDF noch hinterlegen",
  },
  {
    title: "Zeugnisse",
    description: "Aktuelle Schulzeugnisse und relevante Ausbildungsnachweise.",
    status: "PDFs noch hinterlegen",
  },
  {
    title: "ÜK-Nachweise",
    description: "Nachweise und Unterlagen aus den überbetrieblichen Kursen.",
    status: "PDFs noch hinterlegen",
  },
] as const;
