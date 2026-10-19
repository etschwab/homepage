import type { Metadata } from "next";

import { ProjectArchive } from "@/components/sections/project-archive";
import { PageShell } from "@/components/site/page-shell";
import { getProjects } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Ausgewählte Web-, Schul-, Hardware-, Desktop- und Mobile-Projekte von Etienne Schwab.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageShell>
      <section className="project-archive-section" aria-labelledby="archive-title">
        <div className="site-container">
          <header className="archive-heading">
            <h1 id="archive-title">Projekte</h1>
          </header>
          <ProjectArchive projects={projects} />
        </div>
      </section>
    </PageShell>
  );
}
