import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="home-hero">
      <div className="site-container home-hero-grid">
        <div className="home-hero-copy">
          <p className="home-kicker">Portfolio · IMS Bern · 2026</p>
          <h1>
            Etienne
            <em>Schwab.</em>
          </h1>
          <p className="home-role">{profile.role}</p>
        </div>
      </div>
    </section>
  );
}
