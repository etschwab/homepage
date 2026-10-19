import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/about-section";
import { InterestsSection } from "@/components/sections/interests-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { Timeline } from "@/components/sections/Timeline";
import { PageShell } from "@/components/site/page-shell";
import { getContent } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Etienne Schwab über IMS Bern, Frontend-Entwicklung, Unihockey, Kompetenzen und Bildungsweg.",
};

export default async function AboutPage() {
  const { interests, sections } = await getContent();

  return (
    <PageShell>
      <AboutSection />
      <SkillsSection />
      <Timeline />
      <InterestsSection copy={sections.leisure} interests={interests} />
    </PageShell>
  );
}
