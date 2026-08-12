import { skillGroups } from "@/data/profile";

export function SkillsSection() {
  return (
    <section className="content-section" aria-labelledby="skills-title">
      <div className="site-container split-layout">
        <div>
          <p className="section-label">Technologien</p>
          <h2 id="skills-title" className="section-title">
            Kompetenzen
          </h2>
        </div>

        <div className="skill-list">
          {skillGroups.map((group) => (
            <article key={group.category}>
              <div>
                <h3>{group.category}</h3>
                <p>{group.skills.join(" · ")}</p>
              </div>
              <p className="skill-context">
                <span>Eingesetzt in</span>
                {group.context}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
