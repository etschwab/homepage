import { skillGroups } from "@/data/profile";

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

        <div className="skill-list">
          {skillGroups.map((group) => (
            <article key={group.category}>
              <div className="skill-main">
                <span className="skill-kind">{group.kind}</span>
                <h3>{group.category}</h3>
                <p className="skill-technologies">{group.skills.join(" · ")}</p>
                <p className="skill-description">{group.description}</p>
              </div>
              <p className="skill-context">
                <strong>Praxis</strong>
                {group.context}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
