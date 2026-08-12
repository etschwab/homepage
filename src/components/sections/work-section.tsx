import { ProjectArchive } from "@/components/sections/project-archive";

export function WorkSection() {
  return (
    <section className="projects-page" aria-labelledby="projects-title">
      <header className="editorial-hero editorial-hero-dark">
        <div className="site-container editorial-grid">
          <div className="editorial-marker" aria-hidden="true">
            <span>03</span>
            <small>Projekte</small>
          </div>
          <div className="editorial-heading">
            <p className="section-label">Projektübersicht</p>
            <h1 id="projects-title" className="page-title">
              Projekte
            </h1>
          </div>
          <p className="editorial-lead">
            Eine Auswahl aus Web-, Schul-, Hardware- und Desktopprojekten.
            Kompakt gefiltert und einheitlich dargestellt.
          </p>
        </div>
      </header>

      <div className="site-container more-projects">
        <div className="more-projects-heading">
          <h2>Alle Projekte</h2>
          <p>Filter auswählen und passende Arbeiten ansehen.</p>
        </div>
        <ProjectArchive />
      </div>
    </section>
  );
}
