import { getState, trigger } from "@/app/game/state";
import calcSpeed from "@/app/game/speed";
import unit2px from "@/app/util/unit2px";
import {CANVAS_RESOLUTION, GAME_RESOLUTION} from "@/app/constant/game";
import {ICoordinates} from "@/types/grid";
import {IGameState} from "@/types/game";

const GameOverSvg = require('@/public/assets/game-over.svg') as string;

let $c: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let speed = calcSpeed(1);
let lastUpdate = 0 - Infinity;

const GRID_UNIT_SIZE = CANVAS_RESOLUTION / GAME_RESOLUTION;

const gameCoordsToCanvasCoords = ({ x, y, large }: ICoordinates): ICoordinates => ({
    x: x * GRID_UNIT_SIZE,
    y: y * GRID_UNIT_SIZE,
    large
});

const drawGame = (gameState: IGameState) => {
    const snakeHead = gameCoordsToCanvasCoords(gameState.snake.head);
    const snakeBody = gameState.snake.body.map(gameCoordsToCanvasCoords);
    const apples = gameState.apples.map(gameCoordsToCanvasCoords);

    speed = calcSpeed(gameState.level);
    lastUpdate = performance.now();

    const unitPx = unit2px(GRID_UNIT_SIZE);

    ctx.clearRect(0, 0, $c.width, $c.height);

    // Draw apples
    ctx.fillStyle = `rgb(230, 20, 100)`;

    apples.forEach(({ x, y }) => {
        ctx.fillRect(unit2px(x), unit2px(y), unitPx, unitPx);
    });

    // Draw snake body
    ctx.fillStyle = `rgb(40, 120, 170)`;

    snakeBody.forEach(({ x, y, large }) => {
        if (large) {
            const offset = unitPx / 4;
            const halfOffset = offset / 2;
            const largeSize = unitPx + offset;

            ctx.fillRect(
                unit2px(x) - halfOffset,
                unit2px(y) - halfOffset,
                largeSize,
                largeSize
            );
        } else {
            ctx.fillRect(unit2px(x), unit2px(y), unitPx, unitPx);
        }
    });

    // Draw snake head
    ctx.fillStyle = `rgb(10, 125, 255)`;
    ctx.fillRect(unit2px(snakeHead.x), unit2px(snakeHead.y), unitPx, unitPx);
}

const img = new Image();
img.src = `data:image/svg+xml;base64,${btoa(GameOverSvg)}`;
img.width = 1000;
img.height = 1000;

document.body.appendChild(img);

const drawGameOver = (size: number) => {
    const BASE_SIZE = 1080;
    const adjustedSize = BASE_SIZE / 100 * (Math.min(size, 100));
    const position = 500 - adjustedSize / 2;

    const img = new Image();

    img.src = `data:image/svg+xml;utf8,${GameOverSvg}`;
    img.width = unit2px(adjustedSize);
    img.height = unit2px(adjustedSize);
    ctx.drawImage(img, unit2px(position), unit2px(position));

    document.body.appendChild(img);
}

export const setCanvas = ($canvas: HTMLCanvasElement) => {
    $c = $canvas;
    ctx = $c.getContext('2d');
}

export default function startEngine() {
    let iteration = 1;

    const run = () => {
        const timestamp = performance.now();
        const gameState = getState();

        if (gameState.gameOver) {
            drawGame(gameState);
            drawGameOver(iteration++);
        } else if (lastUpdate + speed < timestamp) {
            trigger();
            drawGame(gameState);
        }

        globalThis.requestAnimationFrame(run);
    }

    globalThis.requestAnimationFrame(run);
}