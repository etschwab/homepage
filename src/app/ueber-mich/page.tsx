import { AboutSection } from "@/components/sections/about-section";
import { InterestsSection } from "@/components/sections/interests-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { Timeline } from "@/components/sections/Timeline";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Etienne Schwab über IMS Bern, Frontend-Entwicklung, Unihockey, Kompetenzen und Bildungsweg.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection />
      <InterestsSection />
      <SkillsSection />
      <Timeline />
    </PageShell>
  );
}
import type { Metadata } from "next";
