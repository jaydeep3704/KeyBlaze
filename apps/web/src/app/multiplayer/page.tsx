"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FormEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User2, Users } from "lucide-react";

export default function Multiplayer() {
    const router=useRouter()
    function handleJoinRoom(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form=e.currentTarget;
        const formData=new FormData(form)
        const inviteCode=formData.get("invite_code") as string
        if(!inviteCode) return toast.error("Invite code is required")
        router.push(`/game/${inviteCode}`)
    }

    function handleCreateGame(){
        const inviteCode=uuidv4()
        router.push(`/game/${inviteCode}`)
    }


    return (
        <div className="max-w-5xl mx-auto py-20 space-y-4 lg:px-0 px-4">
            <h1 className="font-bold text-4xl flex items-center gap-2"><Users className="size-8"/>Multiplayer Battles</h1>
            <div className=" text-muted-foreground ">
                Welcome to KeyBlaze — the ultimate battleground where speed meets skill.
                Challenge real players in lightning-fast typing duels, shatter accuracy records, and climb the global leaderboard.
                Every keystroke counts. Are you fast enough?
            </div>
            <div className="grid lg:grid-cols-2 gap-6 ">
                <Card className="bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-xl">Create Game</CardTitle>
                        <CardDescription>
                            Host your own typing arena. Set the rules, invite friends or go public, and prepare to dominate.
                            You will recieve an invite code once you create a game.You will be the host of the game
                        </CardDescription>
                    </CardHeader>
                    <CardContent >
                            <Button type="submit" variant={"outline"} className="w-full hover:text-white" onClick={handleCreateGame}>Create Game</Button>
                    </CardContent>
                </Card>

                <Card className="bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-xl">Join Game</CardTitle>
                        <CardDescription>
                            Jump into a live battle. Test your speed, crush opponents, and earn your place on the leaderboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <form className="space-y-3" onSubmit={handleJoinRoom}>
                            <Input placeholder="Enter your Invite Code here" name="invite_code"/>
                            <Button type="submit" variant={"outline"} className="w-full hover:text-white">Join Game</Button>
                        </form>

                    </CardContent>
                </Card>

            </div>
        </div>
    )
}