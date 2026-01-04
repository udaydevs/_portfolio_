"use client"
import * as motion from "motion/react-client"
import { useState } from "react"
import LoadingDots from '@/components/dotloader';
export default function Loader(){
  const box = {
    width: 200,
    height: 200,
    backgroundImage: "url('/images/avatar_loader.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 5,
    borderColor: "red"
  }
  return(
    <>
      <div className='flex flex-col justify-center align-middle items-center text h-screen w-full'>
        <motion.div
          style={box}
          animate={{ rotate: 720 }}
          transition={{ duration: 2 }}
        />
        <div className="flex mt-10  flex-row">
          <div className='text text-4xl font-extrabold'>Loading  </div>
          <LoadingDots />
        </div>
      </div>
    </>
  )
}
