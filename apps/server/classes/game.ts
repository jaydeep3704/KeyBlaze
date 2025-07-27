import { Server, Socket } from "socket.io";
import { generateParagraph } from "../utils/generateParagraph";
import { rooms } from "../socket_listeners/setup_listeners";
import chalk from "chalk";

export class Game {
    gameStatus: "not-started" | "in-progress" | "finished";
    gameId: string;
    players: {
        id: string;
        score: number;
        name: string;
        accuracy: number;
        lastTyped: string;
        startTime: number;
    }[];
    io: Server;
    gameHost: string;
    paragraph: string;

    constructor(id: string, io: Server, host: string) {
        this.gameId = id;
        this.players = [];
        this.io = io;
        this.gameHost = host;
        this.gameStatus = "not-started";
        this.paragraph = "";
    }

    setupListeners(socket: Socket) {
        socket.on("start-game", async () => {
            console.log(chalk.bgCyan("The game has been started"));

            if (this.gameStatus === "in-progress")
                return socket.emit("error", "The game has already started");

            if (this.gameHost !== socket.id)
                return socket.emit("error", "Only game hosts can start the game");

            // Reset scores
            for (const player of this.players) {
                player.score = 0;
                player.startTime = 0;
                player.lastTyped = "";
                player.accuracy = 100;
            }

            this.io.to(this.gameId).emit("players", this.players);

            this.gameStatus = "in-progress";
            const paragraph = (await generateParagraph()) as string;
            this.paragraph = paragraph?.toString();
            console.log(paragraph);
            this.io.to(this.gameId).emit("game-started", this.paragraph);

            // Auto end after 60 seconds
            setTimeout(() => {
                this.gameStatus = "finished";
                this.io.to(this.gameId).emit("game-finished");
                this.io.to(this.gameId).emit("players", this.players);
            }, 60000);

            // Player typing handler
            socket.on("player-typed", (typed: string) => {
                if (this.gameStatus !== "in-progress")
                    return socket.emit("error", "The game has not started yet");

                const player = this.players.find(p => p.id === socket.id);
                if (!player) return;

                const targetChars = this.paragraph.split("");
                const typedChars = typed.split("");
                const wrongIndices: number[] = [];

                let correctChars = 0;
                for (let i = 0; i < typedChars.length; i++) {
                    if (typedChars[i] === targetChars[i]) {
                        correctChars++;
                    } else {
                        wrongIndices.push(i);
                    }
                }

                // Send wrong indices to the player
                if (wrongIndices.length > 0) {
                    socket.emit("wrong-chars", { indices: wrongIndices });
                }

                // Set start time only once
                if (player.startTime === 0) {
                    player.startTime = Date.now();
                }

                const elapsedMinutes = (Date.now() - player.startTime) / 60000;

                const wpm = elapsedMinutes > 0 ? (correctChars / 5) / elapsedMinutes : 0;
                const accuracy = typedChars.length === 0 ? 100 : (correctChars / typedChars.length) * 100;

                player.score = Number.parseInt(wpm.toFixed(2));
                player.accuracy = accuracy;
                player.lastTyped = typed;

                this.io.to(this.gameId).emit("player-score", player);
            });
        });

        // Leaving game
        socket.on("leave", async () => {
            if (socket.id === this.gameHost) {
                this.players = this.players.filter(player => player.id !== socket.id);
                if (this.players.length !== 0) {
                    this.gameHost = this.players[0].id;
                    this.io.to(this.gameId).emit("new-host", this.gameHost);
                    this.io.to(this.gameId).emit("player-left", socket.id);
                } else {
                    rooms.delete(this.gameId);
                }
            }

            socket.leave(this.gameId);
            this.players = this.players.filter(player => player.id !== socket.id);
            this.io.to(this.gameId).emit("player-left", socket.id);
        });
    }

    joinPlayer(id: string, name: string, socket: Socket) {
        if (this.gameStatus === "in-progress") {
            return socket.emit(
                "error",
                "Game has already started, Please wait for it to end before joining!"
            );
        }

        socket.join(this.gameId);
        this.players.push({
            id,
            name,
            score: 0,
            accuracy: 100,
            lastTyped: "",
            startTime: 0,
        });

        this.io.to(this.gameId).emit("player-joined", {
            id,
            name,
            score: 0,
        });

        socket.emit("players", this.players);
        socket.emit("new-host", this.gameHost);

        this.setupListeners(socket);
    }
}
