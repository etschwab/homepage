import { Mail } from "lucide-react";

import { privateProfile } from "@/data/private";

export function ContactSection() {
  return (
    <section className="private-contact" aria-labelledby="contact-title">
      <div className="site-container split-layout">
        <div>
          <p className="section-eyebrow">Privat</p>
          <h2 id="contact-title" className="section-title">
            Kontakt
          </h2>
        </div>

        <div className="contact-details">
          <a href={`mailto:${privateProfile.email}`}>
            <Mail aria-hidden="true" size={18} />
            {privateProfile.email}
          </a>
          <p>{privateProfile.location}</p>
        </div>
      </div>
    </section>
  );
}
