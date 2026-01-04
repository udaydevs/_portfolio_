"use client";

import { ModeToggle } from "@/components/ui/theme";
import { animate } from "animejs";
import GitHubIcon from "@mui/icons-material/GitHub";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stacks from "@/components/stacks";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import data from "../../../projects.json"
 const iconBtn =
    "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus:outline-none focus:ring-2 focus:ring-black/30 dark:focus:ring-white/40";



export default function Page() {
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const router = useRouter();

    const handleClick = (index: number, link: string) => {
        const el = cardRefs.current[index];
        if (!el) return;

        const rect = el.getBoundingClientRect();

        document.body.style.overflow = "hidden";

        Object.assign(el.style, {
            position: "fixed",
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            zIndex: "100",
        });

        animate(el, {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            easing: "inOutQuad",
            duration: 300,
            complete: () => setTimeout(() => { router.push(link) }, 300),
        });
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-4/5 lg:w-[60%] flex flex-col mt-16">
                <div className="absolute top-[5%] right-[5%]">
                    <ModeToggle />
                </div>

                <p className="text-4xl">
                    Uday
                    <br />
                    Pratap Singh
                </p>

                <p className="text-sm font-mono mt-6">
                    Hi, I’m a second-year B.Tech student and a passionate developer who
                    loves building real-world projects. I work mainly in Python, Django,
                    FastAPI and I’m deeply interested in backend development and Generative
                    AI.
                </p>

                <div className="w-[10rem] flex gap-4 mt-7">
                    <button onClick={() => window.open("https://github.com/udaydevs")} className={iconBtn}>
                        <GitHubIcon fontSize="large" />
                    </button>
                    <button onClick={() => window.open("mailto:udaysinghno2005@gmail.com")} className={iconBtn}>
                        <MarkunreadIcon fontSize="large" />
                    </button>
                    <button onClick={() => window.open("https://www.linkedin.com/in/uday-coder/")} className={iconBtn}>
                        <LinkedInIcon fontSize="large" />
                    </button>
                </div>

                <p className="text-xl mt-10 font-medium">Projects</p>

                <div className="flex flex-nowrap w-full overflow-x-auto gap-4 mt-6">
                    {data.projects.map((project, i) => (
                        <div
                            key={i}
                            ref={(el) => el && (cardRefs.current[i] = el)}
                            onClick={() => handleClick(i, project.gallery[0].link)}
                            style={{
                                backgroundImage: `url(${project.gallery[0].image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                            className="flex-shrink-0 w-4/5 md:w-2/5 lg:w-[23%] h-80 rounded-xl cursor-pointer"
                        >
                        </div>
                    ))}
                </div>

                <p className="text-xl mt-10 font-medium">Tech Stack</p>
                <Stacks />

                <footer className="mt-10 border-t border-gray-600 p-3 flex justify-center">
                    <p className="text-sm font-mono font-extralight flex items-center gap-1">
                        Made with <FavoriteIcon fontSize="small" /> by udaydevs
                    </p>
                </footer>
            </div>
        </div>
    );
}
