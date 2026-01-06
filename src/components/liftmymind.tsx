"use client"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "../../projects.json"
import { animate } from "animejs"
import LaunchIcon from '@mui/icons-material/Launch';
import { useEffect, useRef } from "react";
const pr = data.projects[1]

export default function Sensei({ onClose }: { onClose: () => void }) {
    const currentRef = useRef<HTMLDivElement | null>(null);
    return (
        <div
            className="relative w-full h-full rounded-xl  "
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/premium-photo/scanned-paper-old-vintage-wrinkled-minimalist-white-black-newspaper-texture-overlay_820074-400.jpg')",
                backgroundSize: "contain",
                backgroundPosition: "center",
            }}
        >
            <div className="card-cover absolute inset-0 z-10 overflow-hidden flex flex-col items-center justify-center ">
                <img
                    src={pr.gallery[0].image}
                    className="h-24 w-24 scale-250 object-contain mb-4"
                />
            </div>

            <div className="card-content absolute inset-0 z-0 overflow-y-auto text-white">
                <div className="w-4/5 lg:w-[60%] pb-5 mx-auto mt-16">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-white hover:text-black"
                    >
                        <ArrowBackIcon fontSize="large" />
                    </button>

                    <div className="flex flex-col md:flex-row justify-between w-full ">
                    <div className="card-title flex md:w-2/5 flex-col md:flex-row mt-3 ">
                        <div ref={currentRef} className="w-full text-2xl mb-4 overflow-y-auto">
                            <div><img src={pr.gallery[0].image} className="h-20 w-20 scale-200 mb-2 object-contain" /></div>
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
                    <div className="card-description md:w-4/8 py-3  font-mono">{pr.description}</div>
                </div>

            </div>
        </div>
    </div>
    )
}
