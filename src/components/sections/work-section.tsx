import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ProjectArchive } from "@/components/sections/project-archive";

export function WorkSection() {
  return (
    <section className="projects-page" aria-labelledby="projects-title">
      <header className="page-intro projects-intro">
        <div className="site-container page-intro-grid">
          <p className="page-number" aria-hidden="true">03</p>
          <div>
            <p className="section-eyebrow">Projektarchiv</p>
            <h1 id="projects-title">
              Arbeit, die<br />
              <em>man wirklich ansehen kann.</em>
            </h1>
          </div>
          <p className="page-intro-lead">
            Von einem browserbasierten 3D-Puzzle bis zur Mobile-App – zuerst
            die drei wichtigsten Arbeiten, danach das kompakte Archiv.
          </p>
        </div>
      </header>

      <FeaturedProjects context="projects" />

      <section className="project-archive-section" aria-labelledby="archive-title">
        <div className="site-container">
          <header className="archive-heading">
            <div>
              <p className="section-eyebrow">Weitere Projekte</p>
              <h2 id="archive-title">Archiv</h2>
            </div>
            <p>Web, Schule, Hardware und Desktop – als ruhige Liste statt Shop-Grid.</p>
          </header>
          <ProjectArchive />
        </div>
      </section>
    </section>
  );
}
