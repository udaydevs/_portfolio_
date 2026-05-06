import { DashCard, PageShell, Pill } from "@/components/portfolio-page/page-shell";
import { Github, Linkedin, Mail, MapPin, Quote } from "lucide-react";

const facts = [
  "B.Tech ECE student at KIET Ghaziabad",
  "Graduating in 2028",
  "Backend, full-stack, and GenAI systems",
  "Open source and hackathon focused",
];

const links = [
  {
    href: "https://github.com/udaydevs",
    label: "GitHub",
    value: "github.com/udaydevs",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/uday-coder/",
    label: "LinkedIn",
    value: "linkedin.com/in/uday-coder",
    icon: Linkedin,
  },
  {
    href: "mailto:udaysingno2005@gmail.com",
    label: "Email",
    value: "udaysingno2005@gmail.com",
    icon: Mail,
  },
];

export const metadata = {
  title: "About",
  description:
    "Learn about Uday Pratap Singh, a full-stack and AI engineer based in Delhi-NCR.",
};

export default function AboutPage() {
  return (
    <PageShell
      label="// about me"
      title="The Developer Behind the Code"
      description="I build scalable web applications and intelligent AI-driven systems, with a strong bias toward practical products that ship."
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <DashCard className="space-y-5">
          <p className="font-mono text-sm leading-7 text-muted-foreground">
            Hey, I&apos;m Uday, a B.Tech student at KIET Ghaziabad in Electronics
            & Communication Engineering, graduating in 2028. While my degree is
            in ECE, my work sits firmly in code.
          </p>
          <p className="font-mono text-sm leading-7 text-muted-foreground">
            I specialize in Python-based backends with FastAPI and Django, and
            modern Generative AI systems using OpenAI, Gemini, Anthropic,
            LlamaIndex, LangChain, vector search, and RAG pipelines. I care
            about clean architecture, useful AI behavior, and APIs that stay
            understandable after the first version ships.
          </p>
          <p className="font-mono text-sm leading-7 text-muted-foreground">
            When I&apos;m not building, I&apos;m exploring new tech, contributing
            to open source, or participating in hackathons. I believe in shipping
            fast and learning faster.
          </p>
        </DashCard>

        <div className="space-y-5">
          <DashCard>
            <div className="mb-4 flex items-center gap-2 font-mono text-sm">
              <MapPin size={16} />
              Delhi-NCR, IN
            </div>
            <div className="flex flex-wrap gap-2">
              {facts.map((fact) => (
                <Pill key={fact}>{fact}</Pill>
              ))}
            </div>
          </DashCard>

          <DashCard className="space-y-3">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="flex items-center gap-3 rounded-md border border-dashed border-border px-3 py-3 transition hover:bg-foreground hover:text-background"
                >
                  <Icon size={17} />
                  <span>
                    <span className="block text-sm">{item.label}</span>
                    <span className="block font-mono text-xs opacity-75">
                      {item.value}
                    </span>
                  </span>
                </a>
              );
            })}
          </DashCard>
        </div>
      </div>

      <DashCard className="mt-5">
        <Quote size={19} />
        <p className="mt-4 font-mono text-sm leading-7 text-muted-foreground">
          &quot;We wander not to escape life, but to master it through code,
          creation, and courage.&quot;
        </p>
        <p className="mt-3 text-sm">Uday Pratap Singh</p>
      </DashCard>
    </PageShell>
  );
}
