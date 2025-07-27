"use client"
import { cn } from "@/lib/utils"
import { generateParagraph } from "@/lib/utils/GenerateParagraph"
import { MousePointer, RefreshCcw, RefreshCwIcon, RotateCw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useTyping } from "@/context/TypingContext"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export function SinglePlayerTypeBox() {
    const [paragraph, setParagraph] = useState('')
    const [inputParagraph, setInputParagraph] = useState('')
    const [blur, setBlur] = useState<boolean>(true)
    const [status, setStatus] = useState<"started" | "not-started" | "finished">("not-started")
    const inputRef = useRef<HTMLInputElement | null>(null)
    const paragraphRef = useRef<HTMLDivElement | null>(null)
    const characterRef = useRef<HTMLSpanElement | null>(null)
    const { mode, selectedValue } = useTyping()
    const [timeLeft, setTimeLeft] = useState<number>(selectedValue);
    const [accuracy, setAccuracy] = useState<number>(100)
    const [wpm, setWpm] = useState<number>(0)
    const [raw, setRaw] = useState<number>(0)
    useEffect(() => {
        if (mode !== "time") return;
        if (status !== "started") {
            setTimeLeft(selectedValue)
            return
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setStatus("finished");
                    return 0;
                }
                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(interval);
    }, [status, mode, selectedValue]);

    useEffect(() => {
        if (status === "finished") {
            calculateWPM();
        }
    }, [status]);

    useEffect(() => {
        const text = generateParagraph()
        document.addEventListener("click", handleOutsideClick)
        setParagraph(text)

        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, [])




    function calculateWPM() {
        if (mode !== "time") return;

        let accurateCharacters = 0;
        for (let i = 0; i < inputParagraph.length; i++) {
            if (inputParagraph[i] === paragraph[i]) {
                accurateCharacters++;
            }
        }

        const wordsPerMinute = Math.ceil((accurateCharacters / 5) * (60 / selectedValue));
        const accuracy = inputParagraph.length === 0
            ? 0
            : Math.ceil((accurateCharacters / inputParagraph.length) * 100);

        setRaw(Math.ceil((inputParagraph.length / 5) * (60 / selectedValue)));
        setWpm(wordsPerMinute);
        setAccuracy(accuracy);
    }



    function handleOutsideClick(event: any) {
        if (paragraphRef && paragraphRef.current && paragraphRef.current.contains(event.target)) {
            setBlur(false)
        }
        else {
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

    function resetGame() {
        const text = generateParagraph()
        setParagraph(text)
        setInputParagraph("");
        setTimeLeft(selectedValue);
        setStatus("not-started");
        setRaw(0);
        setWpm(0);
        setAccuracy(0);
    }




    return (
        <section className="mt-10 min-h-screen">

            {status !== "finished" && <div className="relative max-w-4xl mx-auto" >
                <p className="text-3xl mb-4 text-orange-400">{timeLeft}</p>
                {blur &&
                    <p className="absolute top-1/2 left-1/2 -translate-1/2 flex items-center gap-3">
                        <MousePointer className="size-4" /> Click here or press any key to focus
                    </p>}
                <div
                    className={cn("w-full mx-auto text-2xl word-spacing-wider h-[150px]",
                        "overflow-scroll py-2 no-scrollbar leading-12 z-10s", blur && "bg-card/20 blur-sm")}
                    ref={paragraphRef}
                    onClick={() => inputRef.current?.focus()}
                >
                    {
                        paragraph.split('').map((char, index) => {
                            const isTyped = index < inputParagraph.length
                            const isCorrectChar = char === inputParagraph[index]
                            return (
                                <span
                                    key={index}
                                    className={cn(
                                        !isTyped ? "text-white/30" :
                                            isCorrectChar ? "text-white" :
                                                "text-red-400 border-b border-red-400",
                                    )}
                                    ref={index === inputParagraph.length ? characterRef : null}
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
                    onChange={(e) => {
                        setInputParagraph(e.target.value)
                        if (status !== "started") {
                            setStatus("started")
                        }
                    }}
                    value={inputParagraph}
                />
            </div>}
            {status === "finished" && <Score mode={mode} selectedValue={selectedValue} accuracy={accuracy} wpm={wpm} raw={raw} />}
            <div className="mt-10 flex justify-center text-white/50 font-semibold">
                <Button variant={"outline"} onClick={resetGame}><RotateCw className="size-4" /> Restart</Button>

            </div>
        </section>
    )
}



function Score({ mode, selectedValue, accuracy, wpm, raw }: { mode: string, selectedValue: number, accuracy: number, wpm: number, raw: number }) {
    return (
        <Card className="bg-card/50 max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <div >
                        <span className="text-xl font-semibold text-muted-foreground/50">wpm</span>
                        <div className="text-5xl text-primary">{wpm}</div>
                    </div>
                    <div >
                        <span className="text-xl font-semibold text-muted-foreground/50">acc</span>
                        <div className="text-5xl text-primary">{accuracy}%</div>
                    </div>
                    <div >
                        <span className="text-xl font-semibold text-muted-foreground/50">raw</span>
                        <div className="text-5xl text-primary">{raw}</div>
                    </div>
                    <div >
                        <span className="text-xl font-semibold text-muted-foreground/50">time</span>
                        <div className="text-5xl text-primary">{mode === "time" ? `${selectedValue}S` : `${selectedValue}W`}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
