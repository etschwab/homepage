import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PrivateSection } from "@/components/sections/private-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorkSection } from "@/components/sections/work-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SectionDivider } from "@/components/ui/section-divider";

type PortfolioPageProps = {
  isProtected?: boolean;
  username?: string;
};

export function PortfolioPage({ isProtected = false, username }: PortfolioPageProps) {
  return (
    <>
      <SiteHeader isProtected={isProtected} username={username} />
      <main>
        <HeroSection />
        <SectionDivider />
        {isProtected && username ? (
          <>
            <PrivateSection username={username} />
            <SectionDivider />
          </>
        ) : null}
        <SkillsSection />
        <SectionDivider />
        <WorkSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ContactSection isProtected={isProtected} />
      </main>
      <SiteFooter />
    </>
  );
}
