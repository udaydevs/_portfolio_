"use client"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "../../projects.json"
import LaunchIcon from '@mui/icons-material/Launch';
const pr = data.projects[3]

export default function CliTool({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="relative w-full h-full bg-[#7CC99F]"
        >
            <div className="card-cover absolute inset-0 z-10 no-scrollbar flex flex-col items-center justify-center ">
                <img
                    src={pr.gallery[0].image}
                    className="h-24 w-24 object-contain mb-4"
                />
            </div>

            <div className="card-content absolute inset-0 z-0 overflow-y-auto  pb-20 sm:pb-0 text-black">
                <div className="w-4/5 lg:w-[60%] pb-5 mx-auto mt-10 md:mt-16">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-black hover:text-white"
                    >
                        <ArrowBackIcon fontSize="large" />
                    </button>

                    <div className="flex flex-col md:flex-row justify-between w-full ">
                    <div className="card-title flex md:w-2/5 flex-col md:flex-row mt-3 ">
                        <div className="w-full text-2xl mb-4 overflow-y-auto">
                            <div><img src={pr.gallery[0].image} className="h-20 w-20  mb-2 object-contain" /></div>
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
