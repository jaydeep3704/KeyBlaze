import { createServer } from "http"
import { Server } from "socket.io";
import chalk from 'chalk';
import { setupListeners } from "../socket_listeners/setup_listeners";

const PORT = process.env.PORT || 4000


function init() {
    const httpServer = createServer();
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST']
        }
    })
    setupListeners(io)
    httpServer.listen(PORT,()=>{
        console.log(chalk.magenta(`Server started on http://localhost:${PORT}`))
    })
}

init()