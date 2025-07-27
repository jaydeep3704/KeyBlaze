"use client"
import { SinglePlayerTypeBox } from "@/components/general/SinglePlayerTypeBox"
import { Card } from "@/components/ui/card"
import { span } from "framer-motion/client"
import { Clock } from "lucide-react"
import { useState } from "react"


export default function SinglePlayer(){

    return(
        <main className="py-20 min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
            <Options />
             <SinglePlayerTypeBox/>
        </main>
    )
}


function Options(){
    const [option,setOption]=useState<"time" | "words">("time")
    const values={
            "time":[15,30,60,120],
            "words":[10,25,50,100]
        }
    

    return(
        <div className="max-w-3xl mx-auto py-2 px-6 rounded-xl flex gap-6 items-center bg-card/50 text-sm text-white/30">
            <div className="flex gap-3">
                <div className="hover:text-white cursor-pointer"><span>@</span> punctuation</div>
                <div className="hover:text-white cursor-pointer"><span>#</span> numbers</div>
            </div>
            <Seperator/>
            <div className="flex gap-4">
                <div className="flex items-center cursor-pointer text-yellow-500 gap-2 hover:text-white " 
                onClick={()=>setOption("time")}>
                <Clock className="size-3"/> time</div>
                <div className="cursor-pointer flex items-center gap-2 hover:text-white" onClick={()=>setOption("words")}><span className="font-semibold">A</span> words</div>
            </div>
            <Seperator/>
            <div className="flex gap-2">
                {
                    values[option].map((val,index)=><span key={index} className="hover:text-white">{val}</span>)
                }
            </div>
        </div>
    )
}

function Seperator(){
    return(
        <span className="inline-block w-[6px] h-5 rounded-full bg-card"/>
    )
}