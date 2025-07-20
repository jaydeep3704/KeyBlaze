import { Server } from "socket.io";
import chalk from "chalk";
import { Game } from "../classes/game";

//create a map which keeps tracks of game
const rooms=new Map<string,Game>();

export function setupListeners(io:Server){

    io.on('connection',(socket)=>{
        
        console.log(chalk.bgGreen(`Socket connected - ${socket.id}`))
        //join room
        socket.on('join-room',(roomId:string,name:string)=>{
            
            if(!roomId) 
                return socket.emit("error","Invalid Room Id")

            if(!name)
                return socket.emit("error","Please provide nickname")

            
            if(rooms.has(roomId)){
                const game=rooms.get(roomId);
                if(!game) return socket.emit("error","Game not found")
                game.joinPlayer(socket.id,name,socket)
            }
            else{
                const game=new Game(roomId,io,socket.id)
                rooms.set(roomId,game);
                game.joinPlayer(socket.id,name,socket)
            }
        })
    })

    

}