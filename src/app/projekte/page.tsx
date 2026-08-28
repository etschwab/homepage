import type { Metadata } from "next";

import { ProjectArchive } from "@/components/sections/project-archive";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Ausgewählte Web-, Schul-, Hardware-, Desktop- und Mobile-Projekte von Etienne Schwab.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <section className="project-archive-section" aria-labelledby="archive-title">
        <div className="site-container">
          <header className="archive-heading">
            <h1 id="archive-title">Projekte</h1>
          </header>
          <ProjectArchive />
        </div>
      </section>
    </PageShell>
  );
}
