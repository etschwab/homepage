import { HeroSection } from "@/components/sections/hero-section";
import { PageShell } from "@/components/site/page-shell";

export default function Home() {
  return (
    <PageShell showFooter={false}>
      <HeroSection />
    </PageShell>
  );
}
