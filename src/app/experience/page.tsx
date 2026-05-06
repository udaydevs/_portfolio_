import { DashCard, PageShell, Pill } from "@/components/portfolio-page/page-shell";
import { Briefcase, GitPullRequest, Trophy } from "lucide-react";

const achievements = [
  ["Hackathon Participant", "Multiple national-level competitions"],
  ["2 Merged PRs", "Contributions to open-source projects"],
  ["1 Issue Raised", "Active open-source community engagement"],
  ["Pull Shark x2", "GitHub achievement badge"],
  ["Quickdraw", "GitHub achievement badge"],
  ["46 Repositories", "Active codebase on GitHub"],
];

export const metadata = {
  title: "Experience",
  description:
    "Experience and achievements of Uday Pratap Singh across backend development, open source, and hackathons.",
};

export default function ExperiencePage() {
  return (
    <PageShell
      label="// experience"
      title="Where I've Worked"
      description="Hands-on work across web development, databases, healthcare technology, open source, and hackathon builds."
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <DashCard>
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-dashed border-border">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground">
                July 2025 · Remote · Lucknow, IN
              </p>
              <h2 className="mt-1 text-2xl">Backend Developer</h2>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                Health Care Trust
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-l border-dashed border-border pl-5">
            <p className="font-mono text-sm leading-7 text-muted-foreground">
              Developed and enhanced the organization&apos;s official website,
              improving accessibility and overall user experience.
            </p>
            <p className="font-mono text-sm leading-7 text-muted-foreground">
              Gained practical experience in web development, database handling,
              and healthcare technology integration.
            </p>
          </div>
        </DashCard>

        <DashCard>
          <div className="flex items-center gap-2">
            <Trophy size={18} />
            <h2 className="text-xl">Milestones</h2>
          </div>
          <div className="mt-5 space-y-3">
            {achievements.map(([title, detail]) => (
              <div
                key={title}
                className="rounded-md border border-dashed border-border px-3 py-3"
              >
                <p className="text-sm">{title}</p>
                <p className="mt-1 font-mono text-xs leading-5 text-muted-foreground">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </DashCard>
      </div>

      <DashCard className="mt-5">
        <div className="flex items-center gap-2">
          <GitPullRequest size={18} />
          <h2 className="text-xl">Current Focus</h2>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {["RAG systems", "FastAPI backends", "Open source", "Production AI", "Hackathon builds"].map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>
      </DashCard>
    </PageShell>
  );
}
