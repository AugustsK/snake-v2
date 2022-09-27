import { PLAYER_MOVEMENT } from "@/app/constant/player";
import { GAME_RESOLUTION } from "@/app/constant/game";
import {
    EVENT_KEY_UP,
    EVENT_KEY_UP_ARROW,
    EVENT_KEY_RIGHT,
    EVENT_KEY_RIGHT_ARROW,
    EVENT_KEY_DOWN,
    EVENT_KEY_DOWN_ARROW,
    EVENT_KEY_LEFT,
    EVENT_KEY_LEFT_ARROW
} from "@/app/constant/event";

import { addSubscriber, getState, setState } from "@/app/game/state";
import { ICoordinates } from "@/types/grid";
import randomNumber from "@/app/util/random";

const match = (a: ICoordinates, b: ICoordinates) => a.x === b.x && a.y === b.y;

const moveCoords = (coords: ICoordinates, direction: number) => {
    const newCoords = {
        ...coords
    }

    switch (direction) {
        case PLAYER_MOVEMENT.UP: newCoords.y--; break;
        case PLAYER_MOVEMENT.RIGHT: newCoords.x++; break;
        case PLAYER_MOVEMENT.DOWN: newCoords.y++; break;
        case PLAYER_MOVEMENT.LEFT: newCoords.x--; break;
    }

    if (newCoords.x >= GAME_RESOLUTION) newCoords.x = 0;
    if (newCoords.x < 0) newCoords.x = GAME_RESOLUTION - 1;
    if (newCoords.y >= GAME_RESOLUTION) newCoords.y = 0;
    if (newCoords.y < 0) newCoords.y = GAME_RESOLUTION - 1;

    return newCoords;
}

export default function game() {
    let direction = PLAYER_MOVEMENT.RIGHT;

    const step = () => {
        const state = {
            ...getState()
        };

        if (state.gameOver) {
            return;
        }

        const oldHead: ICoordinates = {
            ...state.snake.head
        };

        state.snake.head = <ICoordinates>moveCoords(state.snake.head, direction);

        state.snake.body = [
            ...state.snake.body.slice(1),
            oldHead
        ];

        state.gameOver = state.snake.body.some(bodyNode => match(bodyNode, state.snake.head));

        state.apples = state.apples.map((apple, idx, apples) => {
            if (match(apple, state.snake.head)) {
                state.snake.body.push({
                    ...state.snake.head,
                    large: true
                } as ICoordinates);
                state.level++;

                let newApple: ICoordinates;

                while (!newApple) {
                    newApple = {
                        x: randomNumber(0, GAME_RESOLUTION - 1),
                        y: randomNumber(0, GAME_RESOLUTION - 1),
                        large: false
                    }

                    const matchesHead = match(newApple, state.snake.head);
                    const matchesBody = !matchesHead && state.snake.body.some(node => match(node, newApple));
                    const matchesApples = !matchesHead && !matchesBody && apples.some((apple, jdx) => idx !== jdx && match(apple, newApple));

                    if (matchesHead || matchesBody || matchesApples) {
                        newApple = null;
                    }
                }

                return newApple;
            }

            return apple;
        });


        setState({
            ...state
        });
    };

    globalThis.document.addEventListener('keydown', (event: KeyboardEvent) => {
        switch (event.key.toLowerCase()) {
            case EVENT_KEY_UP:
            case EVENT_KEY_UP_ARROW:
                if (direction !== PLAYER_MOVEMENT.DOWN) direction = PLAYER_MOVEMENT.UP;

                break;
            case EVENT_KEY_RIGHT:
            case EVENT_KEY_RIGHT_ARROW:
                if (direction !== PLAYER_MOVEMENT.LEFT) direction = PLAYER_MOVEMENT.RIGHT;

                break;
            case EVENT_KEY_DOWN:
            case EVENT_KEY_DOWN_ARROW:
                if (direction !== PLAYER_MOVEMENT.UP) direction = PLAYER_MOVEMENT.DOWN;

                break;
            case EVENT_KEY_LEFT:
            case EVENT_KEY_LEFT_ARROW:
                if (direction !== PLAYER_MOVEMENT.RIGHT) direction = PLAYER_MOVEMENT.LEFT;

                break;
        }
    });

    addSubscriber(step);
}