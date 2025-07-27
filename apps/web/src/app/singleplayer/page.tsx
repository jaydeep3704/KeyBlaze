"use client"
import { SinglePlayerTypeBox } from "@/components/general/SinglePlayerTypeBox"
import { Card } from "@/components/ui/card"
import { TypingProvider, useTyping } from "@/context/TypingContext"
import { cn } from "@/lib/utils"
import { span } from "framer-motion/client"
import { Clock } from "lucide-react"
import { useState } from "react"


export default function SinglePlayer(){

    return(
       <TypingProvider>
         <main className="py-20 min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
            <Options />
             <SinglePlayerTypeBox/>
         </main>
       </TypingProvider> 
    )
}


function Options(){
    const {mode,setMode,setSelectedValue,selectedValue}=useTyping()
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
                <div className={cn("flex items-center cursor-pointer gap-2 hover:text-white ",
                mode==="time" && "text-yellow-400" )} 
                onClick={()=>{
                    setMode("time")
                    setSelectedValue(60)
                    }}>
                <Clock className="size-3"/> time</div>
                <div className={cn("flex items-center cursor-pointer gap-2 hover:text-white ",
                mode==="words" && "text-yellow-400" )} 
                onClick={()=>{
                    setMode("words")
                    setSelectedValue(50)
                    }}><span className="font-semibold">A</span> words</div>
            </div>
            <Seperator/>
            <div className="flex gap-2">
                {
                    values[mode].map((val,index)=><span key={index} className={cn("hover:text-white",selectedValue===val && "text-yellow-400")} onClick={()=>setSelectedValue(val)}>
                        {val}
                   </span>)
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