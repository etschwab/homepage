import { ProjectArchive } from "@/components/sections/project-archive";

export function WorkSection() {
  return (
    <section className="projects-page" aria-labelledby="archive-title">
      <section className="project-archive-section" aria-labelledby="archive-title">
        <div className="site-container">
          <header className="archive-heading">
            <h1 id="archive-title">Projekte</h1>
          </header>
          <ProjectArchive />
        </div>
      </section>
    </section>
  );
}
