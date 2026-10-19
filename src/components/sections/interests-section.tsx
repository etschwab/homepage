"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { SiteContent } from "@/lib/cms/types";

type Interest = SiteContent["interests"][number];

const floorballMedia = [
  {
    kind: "image",
    src: "/images/unihockey/faceoff-1.jpeg",
    alt: "Etienne Schwab bei einem Unihockey-Bully",
    label: "Spielszene 01",
  },
  {
    kind: "image",
    src: "/images/unihockey/attack-1.jpeg",
    alt: "Etienne Schwab im Angriff während eines Unihockeyspiels",
    label: "Spielszene 03",
  },
  {
    kind: "video",
    src: "/images/unihockey/floorball-clip-4.mp4",
    poster: "/images/unihockey/attack-1.jpeg",
    label: "Matchclip",
  },
] as const;

type InterestsSectionProps = {
  copy: SiteContent["sections"]["leisure"];
  interests: SiteContent["interests"];
};

export function InterestsSection({ copy, interests }: InterestsSectionProps) {
  const [floorball = { title: "", description: "" }, ...otherInterests] = interests;
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = floorballMedia[activeSlide];

  function showPreviousSlide() {
    setActiveSlide((current) =>
      current === 0 ? floorballMedia.length - 1 : current - 1,
    );
  }

  function showNextSlide() {
    setActiveSlide((current) =>
      current === floorballMedia.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <section
      className="content-section interests-section"
      id="freizeit"
      aria-labelledby="interests-title"
    >
      <div className="site-container">
        <header className="section-heading-row">
          <div>
            <h2 id="interests-title" className="section-title">
              {copy.title}
            </h2>
          </div>
          <p>{copy.text}</p>
        </header>

        <div className="hobby-showcase">
          <article className="floorball-feature">
            <div className="floorball-feature-copy">
              <p className="interest-index">01 / Sport</p>
              <h3>{floorball.title}</h3>
              <p>{floorball.description}</p>
            </div>

            <div className="floorball-slider" aria-label="Unihockey Medien-Slider">
              <button
                type="button"
                className="floorball-slider-button floorball-slider-button-left"
                onClick={showPreviousSlide}
                aria-label="Vorheriges Unihockey-Medium"
              >
                <ChevronLeft aria-hidden="true" size={24} />
              </button>

              <figure className="floorball-slide">
                <div className="floorball-media">
                  {currentSlide.kind === "video" ? (
                    <video
                      key={currentSlide.src}
                      aria-label={`Unihockey ${currentSlide.label}`}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      poster={currentSlide.poster}
                    >
                      <source src={currentSlide.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      key={currentSlide.src}
                      src={currentSlide.src}
                      alt={currentSlide.alt}
                      fill
                      loading={activeSlide === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 800px) calc(100vw - 2rem), 60vw"
                    />
                  )}
                </div>
                <figcaption>
                  <span>{currentSlide.label}</span>
                  <span>
                    {activeSlide + 1} / {floorballMedia.length}
                  </span>
                </figcaption>
              </figure>

              <button
                type="button"
                className="floorball-slider-button floorball-slider-button-right"
                onClick={showNextSlide}
                aria-label="Nächstes Unihockey-Medium"
              >
                <ChevronRight aria-hidden="true" size={24} />
              </button>

            </div>
          </article>

          <div className="interest-side" aria-label="Weitere Hobbys">
            {otherInterests.map((item, index) => (
              <InterestItem key={index} item={item} index={String(index + 2).padStart(2, "0")} />
            ))}
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
  item: Interest;
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
