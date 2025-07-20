import { Server, Socket } from "socket.io";
import { generateParagraph } from "../utils/generateParagraph";

export class Game{
    gameStatus:"not-started" | "in-progress" | "finished"
    gameId:string
    players:{id:string; score:number; name:string}[]
    io:Server
    gameHost:string
    paragraph:String

    constructor(id:string,io:Server,host:string){
        this.gameId=id
        this.players=[]
        this.io=io
        this.gameHost=host
        this.gameStatus="not-started",
        this.paragraph=""
    }

    setupListeners(socket:Socket){
        socket.on('start-game',async()=>{
            if(this.gameStatus==="in-progress")
                return socket.emit('error','The game has already started')
            
            if(this.gameHost!==socket.id)
                return socket.emit('error','Only game hosts can start the game')

            for(const player of this.players){
                player.score=0
            }
            this.io.to(this.gameId).emit('players',this.players)

            this.gameStatus="in-progress"
            const paragraph=await generateParagraph()
            this.paragraph=paragraph as string
            this.io.to(this.gameId).emit('game-started',paragraph)

            setTimeout(()=>{
                this.gameStatus="finished",
                this.io.to(this.gameId).emit('game-finished')
                this.io.to(this.gameId).emit('players',this.players)
            },60000)

            socket.on('player-typed',()=>{
                if(this.gameStatus !=="in-progress") 
                    return socket.emit('error','The game has not started yet') 
            })
            
        })
    }

    joinPlayer(id:string,name:string,socket:Socket){
        if(this.gameStatus=='in-progress'){
            return socket.emit('error','Game has already started, Please wait for it to end before joining !')
        }
        this.players.push({id,name,score:0})

        this.io.to(this.gameId).emit('player-joined',{
            id,
            name,
            score:0
        })

        socket.emit('players',this.players)
        socket.emit('new-host',this.gameHost)

        this.setupListeners(socket)
    }
}