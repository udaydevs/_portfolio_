import { DashCard, PageShell, Pill } from "@/components/portfolio-page/page-shell";
import data from "../../../projects.json";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Projects",
  description:
    "Featured projects by Uday Pratap Singh, including AI tutor systems, backend platforms, and frontend products.",
};

export default function ProjectsPage() {
  return (
    <PageShell
      label="// featured work"
      title="Things I've Built"
      description="Real projects solving real problems, from AI tutors to mental wellness platforms and backend systems."
    >
      <div className="grid gap-5">
        {data.projects.map((project, index) => (
          <DashCard key={project.slug}>
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-dashed border-border">
                  <img
                    src={project.gallery[0].image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">
                    Project {index + 1}
                  </p>
                  <h2 className="mt-1 text-2xl">{project.title}</h2>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">
                    {project.subtitle} · {project.role} · {project.duration}
                  </p>
                </div>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-dashed border-border px-4 text-sm transition hover:bg-foreground hover:text-background"
              >
                View Project
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="mt-5 space-y-2">
              {project.description.map((line) => (
                <p
                  key={line}
                  className="font-mono text-sm leading-7 text-muted-foreground"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </DashCard>
        ))}
      </div>
    </PageShell>
  );
}
