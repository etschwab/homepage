import { interests } from "@/data/profile";

export function InterestsSection() {
  const [floorball, dart, geoguessr] = interests;

  return (
    <section className="content-section interests-section" aria-labelledby="interests-title">
      <div className="site-container">
        <header className="section-heading-row">
          <div>
            <p className="section-label">Abseits des Codes</p>
            <h2 id="interests-title" className="section-title">
              Was mich begleitet
            </h2>
          </div>
          <p>
            Sport, Präzision und ein gutes Auge für Details gehören für mich
            genauso dazu wie die Entwicklung.
          </p>
        </header>

        <div className="interests-grid">
          <article className="floorball-interest">
            <div className="interest-court" aria-hidden="true">
              <span className="court-center-line" />
              <span className="court-center-circle" />
              <span className="court-goal-area court-goal-area-left" />
              <span className="court-goal-area court-goal-area-right" />
            </div>
            <p className="interest-number">10+</p>
            <div className="interest-copy">
              <p className="interest-index">01 / Jahre im Team</p>
              <h3>{floorball.title}</h3>
              <p>{floorball.description}</p>
            </div>
          </article>

          <div className="interest-side">
            <InterestItem item={dart} index="02" />
            <InterestItem item={geoguessr} index="03" />
          </div>
        </div>
      </div>
    </section>
  );
}

function InterestItem({
  item,
  index,
}: {
  item: (typeof interests)[number];
  index: string;
}) {
  return (
    <article className="interest-item">
      <p className="interest-index">{index}</p>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}
