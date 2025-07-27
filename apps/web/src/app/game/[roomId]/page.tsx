import { Game } from "@/components/general/Game"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import { toast } from "sonner"


interface iAppProps {
    params: Promise<{ roomId: string }>
    searchParams: Promise<{ name?: string }>
}



export default async function GamePage({ params, searchParams }: iAppProps) {

    const { name } = await searchParams
    const { roomId } = await params
    async function appendName(data: FormData) {
        "use server"
        const name = data.get('name') as string
        if (!name) return;
        redirect(`/game/${roomId}/?name=${name}`)
    }

    if (!name) {
        return (
            <main className="max-w-2xl mx-auto py-20 min-h-screen lg:px-0 px-4">
                <Card className="bg-card/50 w-full flex-col flex ">
                    <CardHeader>
                        <CardTitle className="font-bold text-xl lg:text-2xl">Enter Your Name</CardTitle>
                        <CardDescription className="text-lg ">
                            Before you join the game we require you to provide a username/nickname. The nickname/username should
                            be shown in the leaderboard and in the participants section
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form action={appendName} className="space-y-4">
                            <Input className="" placeholder="Please Enter your name here" name="name" />
                            <Button type="submit" variant={"outline"} className="w-full text-lg hover:text-white">Join Game</Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <Game gameId={roomId} name={name}/>
    )
}