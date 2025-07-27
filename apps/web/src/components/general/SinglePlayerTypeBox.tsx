"use client"
import { cn } from "@/lib/utils"
import { generateParagraph } from "@/lib/utils/GenerateParagraph"
import { MousePointer } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function SinglePlayerTypeBox(){
    
    const [paragraph,setParagraph]=useState('')
    const [inputParagraph,setInputParagraph]=useState('')
    const [blur,setBlur]=useState<boolean>(true)
    const inputRef=useRef<HTMLInputElement | null>(null)
    const paragraphRef=useRef<HTMLDivElement | null>(null)
    const characterRef=useRef<HTMLSpanElement | null>(null)
    useEffect(()=>{
        const text=generateParagraph()
        document.addEventListener("click",handleOutsideClick)
        setParagraph(text)

        return ()=>{
            document.removeEventListener("click",handleOutsideClick)
        }
    },[])

    function handleOutsideClick(event:any){
        if(paragraphRef && paragraphRef.current && paragraphRef.current.contains(event.target)){
            setBlur(false)
        }
        else{
            inputRef && inputRef.current?.blur()
            setBlur(true)
        }
    }

useEffect(() => {
  setTimeout(() => {
    if (!characterRef.current || !paragraphRef.current) return;

    const charTop = characterRef.current.offsetTop;
    const container = paragraphRef.current;
    const containerHeight = container.clientHeight;
    const scrollBuffer = containerHeight * 0.4; // how early to scroll

    const scrollTarget = Math.max(0, charTop - scrollBuffer);
    const maxScroll = container.scrollHeight - containerHeight;

    // Scroll only if needed and clamp within bounds
    if (charTop - container.scrollTop > containerHeight - scrollBuffer) {
      container.scrollTop = Math.min(scrollTarget, maxScroll);
    }
  }, 0);
}, [inputParagraph]);


    
    return(
        <section className="mt-10 min-h-screen">
            
         <div className="relative max-w-4xl mx-auto" >
            {blur && 
            <p className="absolute top-1/2 left-1/2 -translate-1/2 flex items-center gap-3">
            <MousePointer className="size-4"/> Click here or press any key to focus
            </p>}
            <div 
            className={cn("w-full mx-auto text-2xl word-spacing-wider h-[150px]", 
            "overflow-scroll py-2 no-scrollbar leading-12 z-10s",blur && "bg-card/20 blur-sm")}
            ref={paragraphRef}
            onClick={()=>inputRef.current?.focus()}
            >
                {
                    paragraph.split('').map((char,index)=>{
                        const isTyped=index<inputParagraph.length
                        const isCorrectChar=char===inputParagraph[index]
                        return(
                            <span 
                            key={index}
                            className={cn(
                                !isTyped ? "text-white/30" :  
                                isCorrectChar ? "text-white" : 
                                "text-red-400 border-b border-red-400"
                            )}
                            ref={index===inputParagraph.length ? characterRef : null}
                            >
                                {char}
                            </span>
                        )
                    })
                }
            </div>
            <input 
            type="text" 
            className="opacity-0 -z-10 absolute top-0 left-0" 
            ref={inputRef} 
            onChange={(e)=>setInputParagraph(e.target.value)}
            value={inputParagraph}
            />
        </div> 
        </section>
    )
}