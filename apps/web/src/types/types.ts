export type Player={
    id:string;
    name:string;
    score:number;
}

export type PlayerScore={
    id:string;
    score:number;
}

export type GameProps={
    name:string;
    gameId:string;
}

export type GameStatus="not-started" | "in-progress" | "finished"