"use client"
import data from "../../projects.json"
import { ArrowLeft, ExternalLink } from "lucide-react";
const pr = data.projects[2]

export default function Shishi({ onClose }: { onClose: () => void }) {

    return (
        <div
            className="relative  w-full h-full overflow-hidden bg-[#F7F493]"
        >
            <div className="card-cover absolute inset-0 z-10 flex flex-col items-center justify-center ">
                <img
                    src={pr.gallery[0].image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-24 w-24 object-contain mb-4"
                />
            </div>

            <div className="card-content absolute inset-0 z-20 overflow-y-auto pb-20 text-black sm:pb-8">
                <div className="mx-auto mt-6 w-[min(90vw,64rem)] md:mt-12 lg:w-[60%]">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-black hover:text-white"
                    >
                        <ArrowLeft size={30} />
                    </button>

                    <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between">
                        <div className="card-title mt-3 flex flex-col md:w-2/5 md:flex-row">
                            <div className="mb-4 w-full overflow-y-auto break-words text-2xl">
                                <div><img src={pr.gallery[0].image} alt="" loading="lazy" decoding="async" className="h-20 w-20 object-contain" /></div>
                                <span
                                    onClick={() => window.open(pr.url)}
                                    className="title hover:underline">{pr.title}<br />({pr.subtitle})
                                    <ExternalLink className="inline h-6 w-6" />
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
                        <div className="card-description pt-3 font-mono text-sm leading-7 md:w-1/2">{pr.description}</div>
                    </div>

                </div>
            </div>
        </div>
    )
}
