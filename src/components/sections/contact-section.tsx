import { privateProfile } from "@/data/private";

export function ContactSection() {
  return (
    <section className="private-contact" aria-labelledby="contact-title">
      <div className="site-container split-layout">
        <div>
          <h2 id="contact-title" className="section-title">
            Kontakt
          </h2>
        </div>

        <div className="contact-details">
          <a href={`mailto:${privateProfile.email}`}>
            {privateProfile.email}
          </a>
          <p>{privateProfile.location}</p>
        </div>
      </div>
    </section>
  );
}
