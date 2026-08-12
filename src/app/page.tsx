import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeAbout } from "@/components/sections/home-about";
import { PageShell } from "@/components/site/page-shell";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <div id="selected-work">
        <FeaturedProjects />
      </div>
      <HomeAbout />
    </PageShell>
  );
}
