import { getContent } from "@/lib/cms/content";

export async function HeroSection() {
  const { home } = await getContent();

  return (
    <section className="home-hero">
      <div className="site-container home-hero-grid">
        <div className="home-hero-copy">
          <p className="home-kicker">{home.kicker}</p>
          <h1>
            Etienne
            <em>Schwab.</em>
          </h1>
          <p className="home-role">{home.role}</p>
        </div>

      </div>
    </section>
  );
}
