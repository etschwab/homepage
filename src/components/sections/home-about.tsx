import Link from "next/link";

export function HomeAbout() {
  return (
    <section className="home-about" aria-labelledby="home-about-title">
      <div className="site-container home-about-grid">
        <div>
          <h2 id="home-about-title">
            IMS Bern, Frontend<br />
            <em>und zehn Jahre Unihockey.</em>
          </h2>
          <p>
            Ich komme aus Muri-Gümligen, entwickle gerne verständliche digitale
            Produkte und sammle bei Planary Erfahrung mit echten Webprojekten.
          </p>
          <Link className="inline-link" href="/ueber-mich">
            Mehr über mich <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
