"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function GamePage() {
    const [gameId, setGameId] = useState<string>('')
    const {roomId}=useParams()
    useEffect(()=>{
        setGameId(roomId as string)
    },[])    
    return (
        <div className="min-h-screen max-w-7xl mx-auto py-20 lg:px-0 px-4">
            <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-lg lg:text-2xl font-semibold">Players Joined</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="lg:col-span-2 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-lg lg:text-2xl font-semibold">
                            Create Game
                        </CardTitle>
                        <CardDescription>
                            Create a game and invite your friends to join you and race you in a typing battle. Once the game is created wait till your friends join your room. Click on start game to start the game
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className=" mx-auto space-y-2">
                            <Label className="font-semibold text-lg">Copy The Code Below</Label>
                            <div className="relative flex  items-center  p-1  rounded-full overflow-hidden ">
                                <Input disabled className="px-3 rounded-full  z-10" value={gameId} />
                                <div
                                    className="absolute right-0 z-20 size-8 flex items-center justify-center rounded-full bg-primary"
                                    onClick={
                                        (e) => {
                                            window.navigator.clipboard.writeText(gameId)
                                            toast.success("Room Id copied to clipboards")
                                        }
                                    }
                                >
                                    <Copy className="size-5" />
                                </div>
                            </div>
                        </div>


                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


