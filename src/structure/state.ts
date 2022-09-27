import { IGameState } from "@/types/game";
import { ICoordinates } from "@/types/grid";

import randomNumber from "@/app/util/random";

import { GAME_RESOLUTION } from "@/app/constant/game";

export default function getNewState(): IGameState {
    const snakeHead: ICoordinates = {
        x: randomNumber(1, GAME_RESOLUTION - 2),
        y: randomNumber(1, GAME_RESOLUTION - 2),
        large: false
    };

    const state: IGameState = {
        snake: {
            head: {
                ...snakeHead
            },
            body: [
                {...snakeHead},
                {...snakeHead}
            ]
        },
        apples: [],
        level: 1,
        gameOver: false
    }

    while (state.apples.length < 3) {
        const newCoords: ICoordinates = {
            x: randomNumber(0, GAME_RESOLUTION - 1),
            y: randomNumber(0, GAME_RESOLUTION - 1),
            large: false
        }

        let allowed = newCoords.x !== state.snake.head.x && newCoords.y !== state.snake.head.y;

        for (let i = 0; i < state.apples.length; i++) {
            if (newCoords.x !== state.apples[i].x && newCoords.y !== state.apples[i].y) {
                allowed = false;
            }
        }

        if (allowed) {
            state.apples.push(newCoords);
        }
    }

    return state;
}