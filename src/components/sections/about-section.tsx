import type { ReactNode } from "react";
import {
  Building2,
  Code2,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { profile, profileFacts, strengths } from "@/data/profile";

type AboutCard = {
  title: string;
  eyebrow: string;
  icon: LucideIcon;
  content: ReactNode;
};

const aboutCards: AboutCard[] = [
  {
    title: "Hobbys und Teamfähigkeit",
    eyebrow: "Team",
    icon: Users,
    content: (
      <>
        Seit über <strong className="font-semibold text-white">10 Jahren</strong>{" "}
        spiele ich Unihockey im Team. Dadurch habe ich gelernt,
        Verantwortung zu übernehmen, mit anderen zusammenzuarbeiten und mich
        aktiv einzubringen. Diese Erfahrungen machen mich auch ausserhalb des
        Sports zu einem zuverlässigen Teamplayer.
      </>
    ),
  },
  {
    title: "Dart, Computer und GeoGuessr",
    eyebrow: "Freizeit",
    icon: Gamepad2,
    content: (
      <>
        Zuhause spiele ich gerne <strong className="font-semibold text-white">Dart</strong>{" "}
        oder verbringe Zeit am Computer. Eines meiner Lieblingsspiele ist{" "}
        <strong className="font-semibold text-white">GeoGuessr</strong>, das ich
        oft gemeinsam mit{" "}
        <a
          href="https://nilton-barroso.planary.ch"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-orange-300 transition-colors hover:text-orange-200"
        >
          Nilton
          <ExternalLink aria-hidden="true" size={13} />
        </a>{" "}
        spiele.
      </>
    ),
  },
  {
    title: "Informatik und Webdesign",
    eyebrow: "Fokus",
    icon: Code2,
    content: (
      <>
        Im Bereich Informatik interessieren mich besonders{" "}
        <strong className="font-semibold text-white">Frontend-Entwicklung</strong>{" "}
        und <strong className="font-semibold text-white">Webdesign</strong>. Mir
        gefällt es, Webseiten und Webanwendungen zu gestalten, die nicht nur
        gut aussehen, sondern auch einfach und intuitiv zu bedienen sind.
      </>
    ),
  },
  {
    title: "Projekte mit modernen Technologien",
    eyebrow: "Tech",
    icon: Target,
    content: (
      <>
        Ich habe bereits mehrere Projekte mit modernen Technologien wie{" "}
        <strong className="font-semibold text-white">React</strong>,{" "}
        <strong className="font-semibold text-white">NestJS</strong> und{" "}
        <strong className="font-semibold text-white">Next.js</strong> umgesetzt.
        Dabei ist mir wichtig, dass Design, Struktur und Bedienbarkeit
        zusammenpassen.
      </>
    ),
  },
];

export function AboutSection() {
  return (
    <section id="ueber-mich" className="py-14 sm:py-16 lg:py-20">
      <div className="site-container grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Über mich"
            title="Persönlich, zuverlässig und mit Freude an Webdesign."
            description="Ich heisse Etienne Schwab, bin 17 Jahre alt und wohne in Muri-Gümligen. Zurzeit besuche ich die IMS in Bern."
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {profileFacts.map((fact) => (
              <div
                key={fact.label}
                className="scroll-reveal motion-card rounded-soft border border-white/10 p-4"
              >
                <p className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                  {fact.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-white">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <div className="scroll-reveal motion-card rounded-soft border border-white/10 bg-black/30 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-soft border border-orange-400/35 text-orange-300">
                <GraduationCap aria-hidden="true" size={19} />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                  Kurze Vorstellung
                </p>
                <p className="font-mono text-sm text-orange-400">
                  {profile.location} · IMS in Bern
                </p>
              </div>
            </div>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              {profile.availability}
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Diese Website ist mein persönliches Portfolio. Sie zeigt, woran
              ich gerade arbeite, welche Technologien mich interessieren und wie
              ich Projekte Schritt für Schritt weiterentwickle.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {aboutCards.map(({ title, eyebrow, icon: Icon, content }) => (
              <article
                key={title}
                className="scroll-reveal motion-card rounded-soft border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-soft border border-white/10 text-orange-300">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                      {eyebrow}
                    </p>
                    <h3 className="text-base font-semibold text-white">
                      {title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{content}</p>
              </article>
            ))}
          </div>

          <ul className="grid gap-2.5">
            {strengths.map((strength) => (
              <li
                key={strength}
                className="scroll-reveal motion-card rounded-soft flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-zinc-300"
              >
                <Target
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-orange-400"
                  size={17}
                />
                {strength}
              </li>
            ))}
          </ul>

          <article className="scroll-reveal rounded-soft border border-orange-400/25 bg-orange-400/[0.045] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-soft border border-orange-400/30 text-orange-300">
                <Building2 aria-hidden="true" size={18} />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-normal text-orange-300">
                  Planary
                </p>
                <h3 className="text-base font-semibold text-white">
                  Klare digitale Lösungen für konkrete Probleme.
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Ausserdem bin ich Mitglied der Firma{" "}
              <a
                href="https://planary.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-orange-300 transition-colors hover:text-orange-200"
              >
                Planary
                <ExternalLink aria-hidden="true" size={13} />
              </a>
              . Bei Planary entwickeln wir einfache, klare Webanwendungen, die
              sich auf konkrete Probleme konzentrieren und dafür passende
              digitale Lösungen bieten.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
