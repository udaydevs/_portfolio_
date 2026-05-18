import { DashCard, PageShell, Pill } from "@/components/portfolio-page/page-shell";

const groups = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "Java", "C"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["FastAPI", "Django", "Next.js", "React.js", "LlamaIndex", "LangChain", "Celery"],
  },
  {
    title: "AI & Generative AI",
    items: ["OpenAI API", "Gemini", "Anthropic", "RAG", "Vector Search", "Qdrant", "Semantic Search"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    title: "Tools & DevOps",
    items: ["Git", "GitHub", "Docker", "Postman", "REST APIs", "Vercel"],
  },
  {
    title: "Frontend",
    items: ["Tailwind CSS", "Responsive Design", "Animation Libraries", "shadcn/ui"],
  },
];

export const metadata = {
  title: "Skills",
  description:
    "Uday Pratap Singh's technical stack across backend, frontend, AI, databases, and developer tools.",
};

export default function SkillsPage() {
  return (
    <PageShell
      title="Tools of the Trade"
      description="A curated set of technologies I use to build production-grade applications, AI systems, and polished interfaces."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {groups.map((group) => (
          <DashCard key={group.title}>
            <h2 className="text-xl">{group.title}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </DashCard>
        ))}
      </div>
    </PageShell>
  );
}
