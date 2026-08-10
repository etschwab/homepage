import { AboutSection } from "@/components/sections/about-section";
import { InterestsSection } from "@/components/sections/interests-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { Timeline } from "@/components/sections/Timeline";
import { PageShell } from "@/components/site/page-shell";

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
