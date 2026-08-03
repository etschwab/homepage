import { AboutSection } from "@/components/sections/about-section";
import { HobbiesSection } from "@/components/sections/hobbies-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { PageShell } from "@/components/site/page-shell";

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection />
      <SkillsSection />
      <HobbiesSection />
    </PageShell>
  );
}
