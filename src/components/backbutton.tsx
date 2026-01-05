"use client"
import { useRouter } from "next/navigation";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

 const iconBtn =
    "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus:outline-none focus:ring-2 focus:ring-black/30 dark:focus:ring-white/40";


export default function Back(){
    const router = useRouter()
    return(
        <div className=" bg-transparent w-fit">
            <button
                onClick={() => {router.push("./home")}}
                className={iconBtn}
            >
                <ArrowBackIcon fontSize="large" className="bg-transparent"/>
            </button>
        </div>
    )
}