import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PrivateSection } from "@/components/sections/private-section";
import { Timeline } from "@/components/sections/Timeline";
import { WorkSection } from "@/components/sections/work-section";
import { PageShell } from "@/components/site/page-shell";

type PortfolioPageProps = {
  isProtected?: boolean;
  username?: string;
};

export function PortfolioPage({
  isProtected = false,
  username,
}: PortfolioPageProps) {
  return (
    <PageShell isProtected={isProtected} username={username}>
      <HeroSection />
      <AboutSection />
      <Timeline />
      {isProtected && username ? <PrivateSection username={username} /> : null}
      <WorkSection />
      <ContactSection isProtected={isProtected} />
    </PageShell>
  );
}
