"use client"
import Back from "@/components/backbutton";
import data from "../../../projects.json"
import { animate } from "animejs"
import LaunchIcon from '@mui/icons-material/Launch';
import { useEffect, useRef } from "react";
const pr = data.projects[0]

export default function Page() {
    const currentRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!currentRef.current) return;

        animate(currentRef.current, {
            translateX: ["-120vw", 0],
            duration: 700,
            easing: "spring(1, 80, 10, 0)",
        });
    }, []);


    return (
        <div style={{
            backgroundImage: "url('https://img.freepik.com/free-vector/hand-drawn-painted-whitewash-background_23-2151171148.jpg?t=st=1767546192~exp=1767549792~hmac=dedc441bccc2f36da3371ed4c41ec72977ae3700611fc42cfd40f06fddb5c9d9&w=740')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }} className="md:h-screen w-full flex justify-center ">
            <div className="w-4/5 lg:w-[60%] flex flex-col mt-16">
                <div className="w-full">
                    <Back />
                    <div className="flex flex-col md:flex-row mt-3">
                        <div ref={currentRef} className="w-full md:w-2/5 text-2xl mb-4 overflow-y-auto">
                            <span
                                className="title hover:underline">{pr.title}<br />({pr.subtitle})
                                <LaunchIcon />
                            </span>
                            <div className="font-mono text-sm font-extrabold  mt-4">Role: <span className="font-light ">{pr.role}</span></div>
                            <div className="font-mono text-sm font-extrabold  mt-2">Duration: <span className="font-light ">{pr.duration}</span></div>
                            <div className="font-mono text-sm font-bold  mt-2 mb-1">Technologies Used</div>
                            {pr.techStack.map((value, i) => {
                                return (
                                    <p key={i} className="font-mono text-sm font-light">{value}</p>
                                )
                            })}
                        </div>
                        <div className="md:w-3/6 pt-3 font-mono">{pr.description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
