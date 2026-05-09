"use client"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "../../projects.json"
import LaunchIcon from '@mui/icons-material/Launch';
const pr = data.projects[0]

export default function Sensei({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="relative  w-full h-full"
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/free-vector/hand-drawn-painted-whitewash-background_23-2151171148.jpg?w=740')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="card-cover absolute inset-0 z-10 flex flex-col items-center justify-center text-[#333]">
                <img
                    src={pr.gallery[0].image}
                    alt=""
                    className="h-24 w-24 object-contain mb-4"
                />
            </div>

            <div className="card-content absolute inset-0 z-20 overflow-y-auto pb-20 text-[#333] sm:pb-8">
                <div className="mx-auto mt-6 w-[min(90vw,64rem)] md:mt-12 lg:w-[60%]">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-black hover:text-white"
                    >
                        <ArrowBackIcon fontSize="large" />
                    </button>

                    <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between">
                    <div className="mt-3 flex flex-col md:w-2/5 md:flex-row">
                        <div className="card-title mb-4 w-full overflow-y-auto break-words text-2xl">
                            <div><img src={pr.gallery[0].image} alt="" className="h-20 w-20 object-contain" /></div>
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
                    <div className="card-description py-3 font-mono text-sm leading-7 md:w-1/2">{pr.description}</div>
                </div>

            </div>
        </div>
    </div>
    )
}
