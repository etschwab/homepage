import { ProjectExplorer } from "@/components/sections/project-explorer";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile, siteCopy } from "@/data/profile";
import { getGithubProjects } from "@/lib/github-projects";

export async function WorkSection() {
  const projects = await getGithubProjects(profile.githubUsername);
  const personalProjects = projects.filter(
    (project) => project.category === "personal",
  ).length;
  const schoolProjects = projects.filter(
    (project) => project.category === "gibb",
  ).length;

  return (
    <section id="projekte" className="section-band py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow={siteCopy.projects.eyebrow}
          title={siteCopy.projects.title}
          description={siteCopy.projects.description}
        />

        <div className="mt-9 grid gap-3 rounded-[2rem] border border-white/60 bg-white/35 p-3 shadow-[0_24px_80px_rgba(17,19,24,0.06)] backdrop-blur-md sm:grid-cols-3">
          <ProjectMetric label="Total" value={projects.length} />
          <ProjectMetric label="Persönlich" value={personalProjects} />
          <ProjectMetric label="gibb" value={schoolProjects} />
        </div>

        <ProjectExplorer
          projects={projects}
          username={profile.githubUsername}
        />
      </div>
    </section>
  );
}

function ProjectMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="relative rounded-[1.4rem] border border-sky-200/45 bg-white/65 p-5">
      <span
        aria-hidden="true"
        className="absolute left-5 right-5 top-0 h-1 rounded-full bg-sky-300/75"
      />
      <p className="font-mono text-xs uppercase tracking-normal text-sky-700/80">
        {label}
      </p>
      <p className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950">
        {value}
      </p>
    </div>
  );
}
