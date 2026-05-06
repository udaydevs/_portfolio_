'use client'
import Loader from "@/components/loading_page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push('./home')
  }, [])
  return <Loader />;
}
