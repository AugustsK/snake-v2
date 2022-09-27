import createGame from "./dom/createGame";
import startEngine, { setCanvas } from "@/app/dom/draw";
import game from "@/app/game";

import '@/public/styles.css';

export default function main($root: HTMLElement) {
    const $canvas = createGame($root);

    setCanvas($canvas);
    startEngine();
    game();
}

main(globalThis.document.getElementById('game'));
