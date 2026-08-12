"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { interests } from "@/data/profile";

const floorballVideos = [
  {
    src: "/images/unihockey/floorball-clip.mp4",
    poster: "/images/unihockey/faceoff-1.jpeg",
    label: "Clip 01",
  },
  {
    src: "/images/unihockey/floorball-clip-2.mp4",
    poster: "/images/unihockey/faceoff-2.jpeg",
    label: "Clip 02",
  },
  {
    src: "/images/unihockey/floorball-clip-3.mp4",
    poster: "/images/unihockey/attack-1.jpeg",
    label: "Clip 03",
  },
  {
    src: "/images/unihockey/floorball-clip-4.mp4",
    poster: "/images/unihockey/faceoff-1.jpeg",
    label: "Clip 04",
  },
] as const;

export function InterestsSection() {
  const [floorball, dart, geoguessr] = interests;
  const [activeVideo, setActiveVideo] = useState(0);
  const currentVideo = floorballVideos[activeVideo];

  function showPreviousVideo() {
    setActiveVideo((current) =>
      current === 0 ? floorballVideos.length - 1 : current - 1,
    );
  }

  function showNextVideo() {
    setActiveVideo((current) =>
      current === floorballVideos.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <section className="content-section interests-section" aria-labelledby="interests-title">
      <div className="site-container">
        <header className="section-heading-row">
          <div>
            <h2 id="interests-title" className="section-title">
              Unihockey, Dart und GeoGuessr
            </h2>
          </div>
          <p>
            In meiner Freizeit bin ich meistens nicht am Laptop.
          </p>
        </header>

        <div className="hobby-showcase">
          <article className="floorball-feature">
            <div className="floorball-feature-copy">
              <p className="interest-index">01 / Sport</p>
              <h3>{floorball.title}</h3>
              <p>{floorball.description}</p>
            </div>

            <div className="floorball-slider" aria-label="Unihockey Video Slider">
              <button
                type="button"
                className="floorball-slider-button floorball-slider-button-left"
                onClick={showPreviousVideo}
                aria-label="Vorheriges Unihockey Video"
              >
                <ChevronLeft aria-hidden="true" size={24} />
              </button>

              <figure className="floorball-slide">
                <video
                  key={currentVideo.src}
                  aria-label={`Unihockey ${currentVideo.label}`}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster={currentVideo.poster}
                >
                  <source src={currentVideo.src} type="video/mp4" />
                </video>
                <figcaption>
                  <span>{currentVideo.label}</span>
                  <span>
                    {activeVideo + 1} / {floorballVideos.length}
                  </span>
                </figcaption>
              </figure>

              <button
                type="button"
                className="floorball-slider-button floorball-slider-button-right"
                onClick={showNextVideo}
                aria-label="Nächstes Unihockey Video"
              >
                <ChevronRight aria-hidden="true" size={24} />
              </button>

            </div>
          </article>

          <div className="interest-side" aria-label="Weitere Hobbys">
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
