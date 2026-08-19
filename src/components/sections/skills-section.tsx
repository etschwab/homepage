import { skillLevels, strengths } from "@/data/profile";

export function SkillsSection() {
  return (
    <section className="content-section" aria-labelledby="skills-title">
      <div className="site-container split-layout">
        <div>
          <h2 id="skills-title" className="section-title">
            Kompetenzen
          </h2>
          <p className="section-intro">
            Technisches Wissen ist für mich dann wertvoll, wenn daraus eine
            verständliche und verlässliche Lösung entsteht.
          </p>
        </div>

        <div className="skills-content">
          <div className="skill-levels" aria-label="Technische Kenntnisse nach Erfahrungsstufe">
            {skillLevels.map((group) => (
              <section className={`skill-level is-${group.tone}`} key={group.level}>
                <header className="skill-level-heading">
                  <div>
                    <span className="skill-level-kicker">Kenntnisstand</span>
                    <h3>{group.level}</h3>
                  </div>
                  <span className="skill-level-dots" aria-hidden="true">
                    {[1, 2, 3].map((dot) => (
                      <i className={dot <= group.score ? "is-filled" : ""} key={dot} />
                    ))}
                  </span>
                </header>

                <div className="skill-level-list">
                  {group.items.map((item) => (
                    <article key={item.name}>
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
              {strengths.map((strength) => (
                <article key={strength.name}>
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
