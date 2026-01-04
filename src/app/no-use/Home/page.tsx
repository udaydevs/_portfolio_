"use client"
import ArrowButton from "@/components/ui/buttun1";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


export default function Home() {
  const router = useRouter();
  const handleNavigation = useCallback(() => {
    router.push("/Skills");
  }, [router]);
  const handleNavigation2 = useCallback(() => {
    router.push("/Contact");
  }, [router]);


  const box = {
    backgroundImage: "url('/images/img3.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 5,
    borderColor: "red"
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full"
        style={box}>
        <h2 className="text-3xl text-amber-50 font-extrabold shadow-2xl text-shadow-black text-shadow-2xl "> Lost in dune... <br/>but every journey begins here</h2>
        <ArrowButton 
          text="Skills"
          textColor="#FFF7E5"
          buttonOverlayColor="#black"
          borderColor="#c284f9"
          iconColor="#FFF7E5"
          className="mt-5"
          onClick={handleNavigation}
          style={{ backgroundColor: "transparent", borderColor: "transparent" , }
          }
        />
        <ArrowButton 
          text="Contacts"
          textColor="#FFF7E5"
          buttonOverlayColor="#black"
          borderColor="#c284f9"
          iconColor="#FFF7E5"
          className="mt-5"
          onClick={handleNavigation2}
          style={{ backgroundColor: "transparent", borderColor: "transparent" , }
          }
        />
      </div>
    </>
  )
}
