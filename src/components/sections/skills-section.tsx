import { getContent } from "@/lib/cms/content";

export async function SkillsSection() {
  const { sections, skillLevels, strengths } = await getContent();

  return (
    <section
      className="content-section skills-section"
      id="kompetenzen"
      aria-labelledby="skills-title"
    >
      <div className="site-container skills-layout">
        <header className="skills-heading">
          <div>
            <span className="section-eyebrow">Kompetenzen</span>
            <h2 id="skills-title" className="section-title">
              {sections.skills.title}
            </h2>
          </div>
          <p>{sections.skills.text}</p>
        </header>

        <div className="skills-content">
          <div className="skill-levels" aria-label="Technische Kenntnisse nach Erfahrungsstufe">
            {skillLevels.map((group, index) => (
              <section className={`skill-level is-${group.tone}`} key={index}>
                <header className="skill-level-heading">
                  <div>
                    <span className="skill-level-kicker">
                      0{index + 1} / Kenntnisstand
                    </span>
                    <h3>{group.level}</h3>
                  </div>
                  <span className="skill-level-dots" aria-hidden="true">
                    {[1, 2, 3].map((dot) => (
                      <i className={dot <= group.score ? "is-filled" : ""} key={dot} />
                    ))}
                  </span>
                </header>

                <div className="skill-level-list">
                  {group.items.map((item, itemIndex) => (
                    <article key={itemIndex}>
                      <div className="skill-main">
                        <h4>{item.name}</h4>
                        <p className="skill-technologies">{item.skills.join(" · ")}</p>
                        <p className="skill-description">{item.description}</p>
                      </div>
                      <p className="skill-context">
                        <strong>Genutzt in</strong>
                        {item.context}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="strengths" aria-labelledby="strengths-title">
            <div className="strengths-heading">
              <span>Arbeitsweise</span>
              <h3 id="strengths-title">Was mich im Team auszeichnet</h3>
            </div>
            <div className="strength-grid">
              {strengths.map((strength, index) => (
                <article key={index}>
                  <h4>{strength.name}</h4>
                  <p>{strength.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
