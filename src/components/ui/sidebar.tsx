"use client";

import Link from "next/link";
import { animate, svg, stagger } from "animejs";
import { X, Home, Mail, Github, Linkedin, ShieldUser, Monitor, Code2, Download, User, Briefcase, } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "@/components/ui/theme";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import GitStats from "../gitStats";
import AccentPicker from "@/components/ui/accent-picker";
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/skills", label: "Skills", icon: Code2 },
  { href: "/projects", label: "Projects", icon: Monitor },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

const socialItems = [
  { href: "https://github.com/udaydevs", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/uday-coder/", label: "LinkedIn", icon: Linkedin },
  { href: "https://docs.google.com/document/d/1hzjcsisOg43TPVff-wFs0p6Q8rVhIQZwvs-3NAjHub0/edit?usp=sharing", label: "Resume", icon: Download },

];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuIconRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!menuIconRef.current || isOpen) return;

    const drawables = svg.createDrawable(
      menuIconRef.current.querySelectorAll("path")
    );

    animate(drawables, {
      draw: ["0 0", "0 1"],
      ease: "inOutQuad",
      duration: 650,
      delay: stagger(80),
    });
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="fixed right-5 top-5 z-[90] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-dashed border-gray-800 bg-background text-foreground shadow-lg transition hover:border-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent)] hover:text-white dark:border-gray-100"
      >
        {isOpen ? (
          <X size={20} />
        ) : (<MenuSharpIcon fontSize="small" />
        )}
      </button>

      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[70] bg-background/40 backdrop-blur-[1px] transition-opacity duration-300 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      />

      <aside
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[80] flex h-dvh w-[min(92vw,22rem)] flex-col overflow-y-auto overscroll-contain border-l border-border bg-background px-5 pb-8 pt-24 text-foreground shadow-2xl transition-transform duration-300 ease-out sm:px-6 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <nav className="flex shrink-0 flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex h-12 items-center gap-3 rounded-md border border-dashed border-border px-4 text-sm transition hover:border-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent)] hover:text-white"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 flex shrink-0 flex-col border-t border-border pt-6">
          <div className="font-mono font-bold mb-3">Appearance</div>
          <div className="">
            <div className="flex items-center justify-between mb-2 p-1"><span className="text-sm font-mono">Theme</span>
              <ModeToggle /></div>
            <div className="flex items-center justify-between gap-3 mb-2 p-1"><span className="text-sm font-mono">Accent Colour</span>
              <AccentPicker />
            </div>
          </div>
        </div>
        <div className="mt-8 flex shrink-0 items-center gap-1 border-t border-border pt-6">
          <GitStats/>
        </div>
        <div className="mt-6 flex shrink-0 flex-wrap items-center gap-2 border-t border-border pt-6">
          {socialItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 items-center gap-2 rounded-md border border-dashed px-2 text-center text-[14px] font-mono transition hover:border-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent)] hover:text-white"
              >
                <Icon size={15} />
                {item.label}
              </a>
            );
          })}
        </div>
      </aside>
    </>
  );
}
