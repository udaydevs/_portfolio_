"use client";

import { animate, svg, stagger } from "animejs";
import * as motion from "motion/react-client";
import { useEffect, useRef } from "react";

const loadingLetterPaths = [
  "M32 24V124H114",
  "M168 72C139 72 121 92 121 111C121 132 138 148 164 148C193 148 211 128 211 108C211 88 193 72 168 72Z",
  "M283 78C272 72 259 70 247 75C226 84 215 107 224 128C233 148 255 154 273 143C285 136 292 124 292 110M293 76V146",
  "M381 26V146M381 87C371 76 357 72 343 77C321 85 310 108 319 129C328 149 351 154 369 143C381 135 388 123 388 109",
  "M436 76V146M436 38V39",
  "M491 76V146M491 100C498 84 511 74 526 75C547 76 558 91 558 114V146",
  "M651 82C640 74 624 72 611 78C592 87 582 108 591 128C600 147 623 153 641 142C653 135 660 123 660 109M660 76V148C660 173 644 187 618 187C603 187 590 182 581 173",
];

export default function Loader() {
  const loadingTextRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!loadingTextRef.current) return;

    const drawables = svg.createDrawable(
      loadingTextRef.current.querySelectorAll("[data-drawable]")
    );

    animate(drawables, {
      draw: ["0 0", "0 1", "1 1"],
      ease: "inOutQuad",
      duration: 2200,
      delay: stagger(120),
      loop: true,
    });
  }, []);

  const box = {
    width: 200,
    height: 200,
    backgroundImage: "url('/images/avatar_loader.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 5,
  };

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center">
      <motion.div
        style={box}
        animate={{ rotate: 720 }}
        transition={{ duration: 2 }}
      />

      <svg
        ref={loadingTextRef}
        className="mt-10 h-32 w-[min(86vw,46rem)] overflow-visible text-foreground"
        viewBox="0 0 700 205"
        fill="none"
        aria-label="Loading"
      >
        {loadingLetterPaths.map((path) => (
          <path
            key={path}
            data-drawable
            d={path}
            stroke="currentColor"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}
