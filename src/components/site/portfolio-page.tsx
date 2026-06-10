import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HobbiesSection } from "@/components/sections/hobbies-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MediaSection } from "@/components/sections/media-section";
import { PrivateSection } from "@/components/sections/private-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { Timeline } from "@/components/sections/Timeline";
import { WorkSection } from "@/components/sections/work-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

type PortfolioPageProps = {
  isProtected?: boolean;
  username?: string;
};

export function PortfolioPage({
  isProtected = false,
  username,
}: PortfolioPageProps) {
  return (
    <>
      <SiteHeader isProtected={isProtected} username={username} />
      <main>
        <HeroSection />
        <AboutSection />
        <Timeline />
        {isProtected && username ? (
          <PrivateSection username={username} />
        ) : null}
        <SkillsSection />
        <WorkSection />
        <HobbiesSection />
        <MediaSection />
        <ContactSection isProtected={isProtected} />
      </main>
      <SiteFooter />
    </>
  );
}
