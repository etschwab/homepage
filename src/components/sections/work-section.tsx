import { ProjectExplorer } from "@/components/sections/project-explorer";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";
import { getGithubProjects } from "@/lib/github-projects";

export async function WorkSection() {
  const projects = await getGithubProjects(profile.githubUsername);

  return (
    <section id="projekte" className="py-14 sm:py-16 lg:py-20">
      <div className="site-container">
        <SectionHeading
          eyebrow="Projekte"
          title="Meine GitHub-Projekte auf einen Blick."
          description="Die Liste kommt direkt von GitHub. Mit dem Filter kannst du nach Sprache oder Demo suchen, und ein Klick auf ein Projekt zeigt mehr Details."
        />

        <ProjectExplorer
          projects={projects}
          username={profile.githubUsername}
        />
      </div>
    </section>
  );
}
