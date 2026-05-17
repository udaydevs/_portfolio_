"use client";

import { animate, splitText, stagger } from "animejs";
import { Github, Heart, Linkedin, Mail } from "lucide-react";
import Stacks from "@/components/stacks";
import { useEffect, useRef } from "react";
import data from "../../../projects.json"
import Sensei from "@/components/sensei";
import LiftMyMind from "@/components/liftmymind";
import Shishi from "@/components/Shishi";
import CliTool from "@/components/cli";
import IconWrapper from "@/components/ui/IconWrapper";
import Sidebar from "@/components/ui/sidebar";


export default function Page() {
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const contactsRef = useRef<HTMLDivElement | null>(null);
    const activeIndex = useRef<number | null>(null);
    const originalRects = useRef<Record<number, DOMRect & { radius: string }>>({});
    const previousBodyOverflow = useRef("");
    const textRefs = useRef<HTMLParagraphElement | null>(null);
    const splitInstance = useRef<any>(null);

    const openCard = (index: number) => {
        if (activeIndex.current !== null) return;

        const el = cardRefs.current[index];
        if (!el) return;

        const rect = el.getBoundingClientRect();

        originalRects.current[index] = {
            ...rect,
            radius: getComputedStyle(el).borderRadius,
        };

        activeIndex.current = index;
        previousBodyOverflow.current = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        el.classList.add("is-expanding");

        Object.assign(el.style, {
            position: "fixed",
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            zIndex: "60",
            overflow: "hidden",
        });

        animate(el, {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            easing: "linear",
            duration: 350,
        });
    };

    const closeCard = () => {
        if (activeIndex.current === null) return;

        const index = activeIndex.current;
        const el = cardRefs.current[index];
        const original = originalRects.current[index];

        if (!el || !original) return;

        el.classList.remove("is-expanding");

        animate(el, {
            top: `${original.top}px`,
            left: `${original.left}px`,
            width: `${original.width}px`,
            height: `${original.height}px`,
            borderRadius: original.radius,
            easing: "inOutQuad",
            duration: 350,
            complete: () => {
                Object.assign(el.style, {
                    position: "",
                    top: "",
                    left: "",
                    width: "",
                    height: "",
                    zIndex: "",
                    overflow: "",
                });

                document.body.style.overflow = previousBodyOverflow.current;
                activeIndex.current = null;
            },
        });
    };

useEffect(() => {
    const timer = setTimeout(() => {
        if (textRefs.current) {
            splitInstance.current = splitText(textRefs.current, {
                lines: { wrap: 'clip' },
            }).addEffect(({ lines }) =>
                animate(lines, {
                    y: ['100%', '0%'],
                    duration: 750,
                    easing: 'out(3)',
                    delay: stagger(200),
                })
            );
        }
    }, 50);

    return () => {
        clearTimeout(timer);
        splitInstance.current?.revert();
        splitInstance.current = null;
    };
}, []);
    useEffect(() => {
        return () => {
            document.body.style.overflow = previousBodyOverflow.current;
            activeIndex.current = null;
        };
    }, []);

    return (
        <div className="flex min-h-dvh w-full justify-center overflow-x-hidden px-4 sm:px-6">
            <div className="mt-14 flex w-full max-w-5xl flex-col sm:mt-16 lg:max-w-[65rem]">
                <div className="relative z-[10] flex items-start justify-between gap-5">
                    <p ref={textRefs} style={{ visibility: 'visible' }}
                        className="min-h-20 w-full text-3xl leading-tight md:text-4xl">
                        Uday
                        <br />
                        Pratap Singh
                    </p>
                    <Sidebar />
                </div>



                <p className="mt-2 font-mono text-sm leading-7 md:mt-5">
                    Full-Stack & AI Engineer based in Delhi-NCR. I build scalable web apps and intelligent AI systems using Python, FastAPI, Next.js, and Generative AI. Open to freelance, internships & full-time roles.I build scalable web applications and intelligent AI-driven systems, from RAG pipelines and LLM integrations to clean, fast APIs and polished frontend experiences.
                </p>

                <div ref={contactsRef} className="mt-7 flex h-fit w-fit max-w-full gap-4 px-1">
                    <IconWrapper dashed link="https://github.com/udaydevs">
                        <Github size={30} />
                    </IconWrapper>
                    <IconWrapper dashed link="mailto:udaysinghno2005@gmail.com">
                        <Mail size={30} />
                    </IconWrapper>
                    <IconWrapper dashed link="https://www.linkedin.com/in/uday-coder/">
                        <Linkedin size={30} />
                    </IconWrapper>
                </div>

                <p className="text-xl mt-5 font-medium">
                    Projects
                </p>

                <div className="no-scrollbar relative z-5 md:z-10 mt-3 flex h-[22rem] w-full snap-x snap-mandatory flex-nowrap items-center gap-4 overflow-x-auto overflow-y-clip pb-3">
                    {data.projects.map((project, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                if (el) {
                                    cardRefs.current[i] = el;
                                }
                            }}
                            onClick={() => openCard(i)}
                            className="no-scrollbar h-80 w-[min(82vw,20rem)] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl ring-1 ring-transparent transition-all hover:-translate-y-3 hover:ring-[var(--portfolio-accent)] md:w-[18rem] lg:w-[23%] lg:min-w-[13rem]"
                        >
                            {project.gallery[0].link == 'Sensei' ?
                                <Sensei onClose={closeCard} /> : project.gallery[0].link == 'Shishi' ?
                                    <Shishi onClose={closeCard} /> : project.gallery[0].link == 'clitool' ? <CliTool onClose={closeCard} /> : <LiftMyMind onClose={closeCard} />}
                        </div>
                    ))}
                </div>
                <div className="relative z-0">
                    <p className="text-xl mt-3 font-medium">
                        Tech Stack
                    </p>
                    <Stacks />
                    <div className="mt-10 border-t border-gray-600 p-3 flex justify-center transition-colors hover:border-[var(--portfolio-accent)]">
                        <p className="text-sm font-mono font-extralight flex items-center gap-1">
                            Made with <Heart size={16} className="accent-text" /> by <a href="https://github.com/udaydevs" className="transition hover:text-[var(--portfolio-accent)]" >udaydevs</a>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
