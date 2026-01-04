'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Loader from "@/components/loading_page"
export default function Loading(){
  const router =  useRouter()

  useEffect(()=>{
    router.push("/home")
  },[router])

  return(
    <>
      <Loader/>
    </>
  )
}