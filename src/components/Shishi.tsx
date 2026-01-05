"use client"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "../../projects.json"
import { animate } from "animejs"
import LaunchIcon from '@mui/icons-material/Launch';
import { useEffect, useRef } from "react";
const pr = data.projects[2]

export default function Shishi({ onClose }: { onClose: () => void }) {
    const currentRef = useRef<HTMLDivElement | null>(null);
    // useEffect(() => {
    //     if (!currentRef.current) return;
    //     animate(currentRef.current, {
    //         translateX: ["-120vw", 0],
    //         duration: 700,
    //         easing: "spring(1, 80, 10, 0)",
    //     });
    // }, []);


    return (
        <div style={{
            backgroundImage: "url('https://img.freepik.com/premium-photo/subtle-dark-textured-background-with-vignette-effect_457879-2164.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }} className="h-screen overflow-y-auto md:overflow-hidden w-full flex justify-center ">
            <div className="w-4/5 lg:w-[60%] flex flex-col mt-16">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose()
                    }}
                    className=
                    "w-12 h-12  px-3 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white "

                >
                    <ArrowBackIcon fontSize="large" />
                </button>
                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex md:w-2/5 flex-col md:flex-row mt-3 ">
                        <div ref={currentRef} className="w-full text-2xl mb-4 overflow-y-auto">
                            <div><img src={pr.gallery[0].image} className="h-20 w-20 object-contain" /></div>
                            <span
                                onClick={() => window.open(pr.url)}
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
                    </div>
                    <div className="md:w-4/8 pt-3 font-mono">{pr.description}</div>
                </div>

            </div>
        </div>
    )
}
