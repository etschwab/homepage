import { ProjectExplorer } from "@/components/sections/project-explorer";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile, siteCopy } from "@/data/profile";
import { getGithubProjects } from "@/lib/github-projects";

export async function WorkSection() {
  const projects = await getGithubProjects(profile.githubUsername);

  return (
    <section id="projekte" className="section-band py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow={siteCopy.projects.eyebrow}
          title={siteCopy.projects.title}
          description={siteCopy.projects.description}
        />

        <ProjectExplorer
          projects={projects}
          username={profile.githubUsername}
        />
      </div>
    </section>
  );
}
