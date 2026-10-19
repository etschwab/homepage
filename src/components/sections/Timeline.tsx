import { getContent } from "@/lib/cms/content";

export async function Timeline() {
  const { education, sections } = await getContent();

  return (
    <section
      className="content-section timeline-section"
      id="bildungsweg"
      aria-labelledby="education-title"
    >
      <div className="site-container">
        <header className="section-heading-row">
          <div>
            <h2 id="education-title" className="section-title">
              {sections.education.title}
            </h2>
          </div>
          <p>{sections.education.text}</p>
        </header>

        <div className="education-track">
          <ol className="education-list">
            {education.map((item, index) => (
              <li
                key={index}
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
