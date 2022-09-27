import { ICoordinates } from "./grid";

export interface ISnake {
    head: ICoordinates;
    body: ICoordinates[]
}

export interface IGameState {
    snake: ISnake;
    apples: ICoordinates[];
    level: number;
    gameOver: boolean;
}
