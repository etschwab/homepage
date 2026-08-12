import Image from "next/image";

import { interests } from "@/data/profile";

const floorballMedia = [
  {
    src: "/images/unihockey/faceoff-1.jpeg",
    alt: "Unihockey-Spielszene beim Bully",
  },
  {
    src: "/images/unihockey/attack-1.jpeg",
    alt: "Unihockey-Angriff in der Halle",
  },
  {
    src: "/images/unihockey/faceoff-2.jpeg",
    alt: "Unihockey-Spielszene mit Ball",
  },
] as const;

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

        <div className="hobby-showcase">
          <article className="floorball-feature">
            <Image
              src={floorballMedia[0].src}
              alt={floorballMedia[0].alt}
              fill
              sizes="(max-width: 900px) 100vw, 62vw"
              priority={false}
              className="floorball-feature-image"
            />
            <div className="floorball-feature-shade" aria-hidden="true" />
            <div className="floorball-feature-copy">
              <p className="interest-index">01 / Sport</p>
              <h3>{floorball.title}</h3>
              <p>{floorball.description}</p>
              <div className="floorball-tags" aria-label="Unihockey Stichworte">
                <span>10+ Jahre</span>
                <span>Teamplay</span>
                <span>Tempo</span>
              </div>
            </div>
          </article>

          <div className="hobby-side">
            <div className="floorball-media-grid" aria-label="Unihockey Eindrücke">
              <figure className="floorball-photo-tile floorball-photo-wide">
                <Image
                  src={floorballMedia[1].src}
                  alt={floorballMedia[1].alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 32vw"
                />
              </figure>
              <figure className="floorball-video-tile">
                <video
                  aria-label="Kurzer Unihockey Clip"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={floorballMedia[2].src}
                >
                  <source src="/images/unihockey/floorball-clip.mp4" type="video/mp4" />
                </video>
              </figure>
            </div>

            <div className="interest-side">
              <InterestItem item={dart} index="02" />
              <InterestItem item={geoguessr} index="03" />
            </div>
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
