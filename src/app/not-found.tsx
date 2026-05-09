"use client";

import { RiveBackground } from "@/components/ui/loadingCat";
import Sidebar from "@/components/ui/sidebar";
import { animate, stagger } from "animejs";
import type { JSAnimation } from "animejs";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const driftMarks = Array.from({ length: 18 }, (_, index) => index);

export default function NotFound() {
  const pageRef = useRef<HTMLElement | null>(null);
  const numberRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const marksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animations: JSAnimation[] = [];

    if (numberRef.current) {
      animations.push(
        animate(numberRef.current.querySelectorAll("[data-digit]"), {
          y: ["1.4rem", "0rem"],
          opacity: [0, 1],
          rotate: [-6, 0],
          duration: 900,
          delay: stagger(120),
          easing: "out(4)",
        })
      );
    }

    if (copyRef.current) {
      animations.push(
        animate(copyRef.current.children, {
          y: ["1rem", "0rem"],
          opacity: [0, 1],
          duration: 700,
          delay: stagger(90, { start: 220 }),
          easing: "out(3)",
        })
      );
    }

    if (marksRef.current) {
      animations.push(
        animate(marksRef.current.children, {
          translateX: () => `${Math.random() * 24 - 12}px`,
          translateY: () => `${Math.random() * 30 - 15}px`,
          rotate: () => Math.random() * 28 - 14,
          opacity: [0.18, 0.5, 0.18],
          duration: () => 2400 + Math.random() * 1800,
          delay: stagger(80),
          easing: "inOutSine",
          alternate: true,
          loop: true,
        })
      );
    }

    if (pageRef.current) {
      const scanline = pageRef.current.querySelector("[data-scanline]");

      if (scanline) {
        animations.push(
          animate(scanline, {
            translateX: ["-115%", "215%"],
            duration: 3600,
            easing: "inOutQuad",
            loop: true,
          })
        );
      }
    }

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative z-[1] flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-5 py-16 text-foreground"
    >
      <div
        ref={marksRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {driftMarks.map((mark) => (
          <span
            key={mark}
            className="absolute h-6 w-6 border border-dashed border-border text-[10px] opacity-20"
            style={{
              left: `${8 + ((mark * 19) % 84)}%`,
              top: `${8 + ((mark * 29) % 80)}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute right-5 top-5 z-20">
        <Sidebar />
      </div>

      <section className="relative z-10 w-full max-w-4xl">
        <div className="relative overflow-hidden border-y border-dashed border-border py-10 md:py-14">
          <span
            data-scanline
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-1/3 border-x border-dashed border-border bg-foreground/5"
          />
          <div
            ref={numberRef}
            className="flex items-center justify-center gap-2 text-[clamp(5rem,22vw,13rem)] leading-none"
            aria-label="404"
          >
            <span data-digit>4</span>

            <span
              data-digit
              className="grid aspect-square w-[0.82em] place-items-center rounded-full border border-dashed border-border text-[0.72em]"
            >
              0
            </span>

            <span data-digit className="">
              4
            </span>
          </div>

          <div
            ref={copyRef}
            className="mx-auto mt-8 flex max-w-2xl flex-col items-center text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Route not found
            </p>
            <h1 className="mt-4 text-2xl md:text-4xl">This page drifted away.</h1>
            <p className="mt-4 max-w-xl font-mono text-sm leading-6 text-muted-foreground md:text-base">
              Somewhere between commits and deployments, this page disappeared.
              But hey, great things still exist on the homepage.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/home"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-dashed border-border px-4 text-sm transition hover:bg-foreground hover:text-background"
              >
                <Home size={17} />
                Home
              </Link>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
