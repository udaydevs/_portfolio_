"use client";

import Sidebar from "@/components/ui/sidebar";
import Link from "next/link";
import type { ReactNode } from "react";

type PageShellProps = {
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageShell({ label, title, description, children }: PageShellProps) {
  return (
    <main className="min-h-dvh w-full overflow-x-hidden bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-10 sm:px-6 md:py-14 lg:px-0">
        <header className="flex items-start justify-between gap-6">
          <Link
            href="/home"
            className="font-mono text-xs text-muted-foreground transition hover:text-foreground"
          >
            Uday Pratap Singh
          </Link>
          <Sidebar />
        </header>

        <section className="mt-14 border-y border-dashed border-border py-8 md:mt-20 md:py-10">
          <p className="font-mono text-xs uppercase accent-text">
            {label}
          </p>
          <h1 className="mt-3 text-3xl leading-tight md:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-3xl font-mono text-sm leading-7 text-muted-foreground md:text-base">
              {description}
            </p>
          ) : null}
        </section>

        <div className="py-8 md:py-10">{children}</div>
      </div>
    </main>
  );
}

export function DashCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-md border border-dashed border-border p-5 transition-colors hover:border-[var(--portfolio-accent)] ${className}`}>
      {children}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-8 items-center rounded-full border border-dashed border-border px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-[var(--portfolio-accent)] hover:text-foreground">
      {children}
    </span>
  );
}
