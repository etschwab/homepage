import { WorkSection } from "@/components/sections/work-section";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Ausgewählte Web-, Schul-, Hardware-, Desktop- und Mobile-Projekte von Etienne Schwab.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <WorkSection />
    </PageShell>
  );
}
import type { Metadata } from "next";
