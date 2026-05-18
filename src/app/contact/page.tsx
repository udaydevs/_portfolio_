import { DashCard, PageShell } from "@/components/portfolio-page/page-shell";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const contacts = [
  {
    href: "mailto:udaysingno2005@gmail.com",
    label: "Email",
    value: "udaysingno2005@gmail.com",
    icon: Mail,
  },
  {
    href: "https://www.linkedin.com/in/uday-coder/",
    label: "LinkedIn",
    value: "linkedin.com/in/uday-coder",
    icon: Linkedin,
  },
  {
    href: "https://github.com/udaydevs",
    label: "GitHub",
    value: "github.com/udaydevs",
    icon: Github,
  },
  {
    href: "tel:+919670157349",
    label: "Phone",
    value: "+91-9670157349",
    icon: Phone,
  },
];

export const metadata = {
  title: "Contact",
  description:
    "Contact Uday Pratap Singh for freelance projects, internships, and full-time opportunities.",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Got a Project in Mind?"
      description="I'm open to freelance projects, internships, and full-time opportunities. Let's build something useful."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {contacts.map((item) => {
          const Icon = item.icon;
          const external = item.href.startsWith("http");

          return (
            <a
              key={item.href}
              href={item.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="rounded-md border border-dashed border-border p-5 transition hover:bg-foreground hover:text-background"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-dashed border-current">
                  <Icon size={19} />
                </span>
                <span>
                  <span className="block text-lg">{item.label}</span>
                  <span className="block break-all font-mono text-sm opacity-75">
                    {item.value}
                  </span>
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <DashCard className="mt-5">
        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <h2 className="text-xl">Based in Delhi-NCR, IN</h2>
        </div>
        <p className="mt-4 max-w-3xl font-mono text-sm leading-7 text-muted-foreground">
          Best fit: backend-heavy full-stack products, FastAPI or Django APIs,
          RAG workflows, LLM integrations, and polished frontend experiences for
          early-stage products.
        </p>
      </DashCard>
    </PageShell>
  );
}
