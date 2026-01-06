"use client";

import { ModeToggle } from "@/components/ui/theme";
import { animate, cubicBezier, splitText, stagger } from "animejs";
import GitHubIcon from "@mui/icons-material/GitHub";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stacks from "@/components/stacks";
import { useLayoutEffect, useRef } from "react";
import data from "../../../projects.json"
import Sensei from "@/components/sensei";
import LiftMyMind from "@/components/liftmymind";
import Shishi from "@/components/Shishi";

const iconBtn =
    "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus:outline-none focus:ring-2 focus:ring-black/30 dark:focus:ring-white/40";

export default function Page() {
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const contactsRef = useRef<HTMLDivElement | null>(null);
    const activeIndex = useRef<number | null>(null);
    const originalRects = useRef<Record<number, DOMRect & { radius: string }>>({});
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
        document.body.style.overflow = "hidden";

        el.classList.add("is-expanding");

        Object.assign(el.style, {
            position: "fixed",
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            zIndex: "100",
            overflow: "hidden",
        });

        animate(el, {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            easing: "inOutQuad",
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

                document.body.style.overflow = "auto";
                activeIndex.current = null;
            },
        });
    };


    useLayoutEffect(() => {
        animate(cardRefs.current, {
            opacity: [0, 1],
            y: ['5rem', 0],
            easing: cubicBezier(.7, .1, .5, .9),
            delay: stagger(50),
        });

        if (contactsRef.current) {
            animate(contactsRef.current.children, {
                opacity: [0, 1],
                y: ['1rem', 0],
                easing: 'out(3)',
                delay: stagger(50),
            });
        }

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

        return () => {
            splitInstance.current?.revert();
            splitInstance.current = null;
        };
    }, []);

    return (
        <div className="w-full flex justify-center overflow-auto">
            <div className="w-4/5 lg:w-[60%] flex flex-col mt-16 overflow-y-auto">
                <div className="absolute top-[5%] right-[5%]">
                    <ModeToggle />
                </div>

                <p ref={textRefs} style={{ visibility: 'visible' }}
                    className="text-3xl md:text-4xl w-full h-20">
                    Uday
                    <br />
                    Pratap Singh
                </p>

                <p className="text-sm font-mono mt-2 md:mt-5">
                    Hi, I’m a second-year B.Tech student and a passionate developer who
                    loves building real-world projects. I work mainly in Python, Django,
                    FastAPI and I’m deeply interested in backend development and Generative
                    AI.
                </p>

                <div ref={contactsRef} className="w-50 px-1 h-fit flex gap-4 mt-7">
                    <div>
                        <button onClick={() => window.open("https://github.com/udaydevs")} className={iconBtn}>
                            <GitHubIcon fontSize="large" />
                        </button>
                    </div>
                    <div>

                        <button onClick={() => window.open("mailto:udaysinghno2005@gmail.com")} className={iconBtn}>
                            <MarkunreadIcon fontSize="large" />
                        </button>
                    </div>
                    <div>

                        <button onClick={() => window.open("https://www.linkedin.com/in/uday-coder/")} className={iconBtn}>
                            <LinkedInIcon fontSize="large" />
                        </button>
                    </div>
                </div>

                <p className="text-xl mt-5 font-medium">Projects</p>

                <div className="flex items-center flex-nowrap w-full z-2 h-88 overflow-x-auto overflow-y-clip gap-4 mt-3">
                    {data.projects.map((project, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                if (el) {
                                    cardRefs.current[i] = el;
                                }
                            }}
                            onClick={() => openCard(i)}
                            className="shrink-0 hover:-translate-y-1 w-4/5 md:w-2/5 lg:w-[23%] h-80 rounded-2xl cursor-pointer"
                        >
                            {project.gallery[0].link == 'Sensei' ?
                                <Sensei onClose={closeCard} /> : project.gallery[0].link == 'Shishi' ?
                                    <Shishi onClose={closeCard} /> : <LiftMyMind onClose={closeCard} />}
                        </div>
                    ))}
                </div>
                <div className="z-0">
                    <p className="text-xl mt-3 font-medium">Tech Stack</p>
                    <Stacks />
                    <div className="mt-15 border-t border-gray-600 p-3 flex justify-center">
                        <p className="text-sm font-mono font-extralight flex items-center gap-1">
                            Made with <FavoriteIcon fontSize="small" /> by udaydevs
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
