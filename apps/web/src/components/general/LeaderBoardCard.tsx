import { Player } from "@/types/types";
import { Card } from "../ui/card";

export function LeaderBoardCard({player,rank}:{player:Player,rank:number}){
  return (
    <div className="w-full flex flex-row p-4 items-center rounded-lg bg-card/10 border">
        <div className="flex gap-3 items-center">
        <div className="text-lg font-semibold text-orange-600">#{rank}</div>
        <div className="text-lg font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">{player.name}</div>
        </div>
        <div className="ml-auto text-yellow-500">{player.score} wpm</div>
    </div>
  )
}

