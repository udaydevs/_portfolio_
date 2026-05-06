"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const accents = [
  { name: "default", className: "bg-neutral-500" },
  { name: "green", className: "bg-green-600" },
  { name: "pink", className: "bg-pink-600" },
  { name: "orange", className: "bg-orange-600" },
  { name: "blue", className: "bg-blue-600" },
] as const;

type AccentName = (typeof accents)[number]["name"];

const defaultAccent: AccentName = "default";

function isAccentName(value: string | null): value is AccentName {
  return accents.some((accent) => accent.name === value);
}

function applyAccent(accent: AccentName) {
  document.documentElement.dataset.accent = accent;
}

export default function AccentPicker() {
  const [activeAccent, setActiveAccent] = useState<AccentName>(defaultAccent);

  useEffect(() => {
    const savedAccent = localStorage.getItem("portfolio-accent");
    const nextAccent = isAccentName(savedAccent) ? savedAccent : defaultAccent;

    setActiveAccent(nextAccent);
    applyAccent(nextAccent);
  }, []);

  const changeAccent = (accent: AccentName) => {
    setActiveAccent(accent);
    localStorage.setItem("portfolio-accent", accent);
    applyAccent(accent);
  };

  return (
    <div className="flex items-center gap-2">
      {accents.map((accent) => {
        const isActive = activeAccent === accent.name;

        return (
          <button
            key={accent.name}
            type="button"
            aria-label={`Use ${accent.name} accent`}
            aria-pressed={isActive}
            onClick={() => changeAccent(accent.name)}
            className={`grid h-5 w-5 place-items-center rounded-full border border-foreground/60 ${accent.className} transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--portfolio-accent)]`}
          >
            {isActive ? <Check className="h-3 w-3 text-white" /> : null}
          </button>
        );
      })}
    </div>
  );
}
