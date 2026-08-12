import { education } from "@/data/profile";

export function Timeline() {
  return (
    <section className="content-section timeline-section" aria-labelledby="education-title">
      <div className="site-container">
        <header className="section-heading-row">
          <div>
            <h2 id="education-title" className="section-title">
              Bildungsweg
            </h2>
          </div>
          <p>Seit 2024 besuche ich die IMS mit Unterricht an der bwd und gibb.</p>
        </header>

        <div className="education-track">
          <ol className="education-list">
            {education.map((item, index) => (
              <li
                key={`${item.period}-${item.school}`}
                className={index === education.length - 1 ? "is-current" : undefined}
              >
                <span className="track-marker" aria-hidden="true">
                  <span />
                </span>
                <div className="education-entry">
                  <p className="education-period">{item.period}</p>
                  <h3>{item.school}</h3>
                  <p>{item.description}</p>
                  {index === education.length - 1 ? (
                    <span className="current-label">Aktuell</span>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
