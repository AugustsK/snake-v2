import { setUnit } from "../util/unit2px";

import { CANVAS_RESOLUTION } from "@/app/constant/game";

let observer: ResizeObserver;

const detectViewport = () => {
    return {
        innerWidth: globalThis.innerWidth,
        innerHeight: globalThis.innerHeight
    }
};

const resizeCanvas = ($canvas: HTMLCanvasElement) => {
    const { innerWidth, innerHeight } = detectViewport();
    const size = Math.min(innerHeight, innerWidth) * 0.99;
    const unit = size / CANVAS_RESOLUTION;

    $canvas.width = size;
    $canvas.height = size;
    $canvas.setAttribute('data-unit', ('' + size));
    setUnit(unit);
}

const cleanup = ($root: HTMLElement) => {
    $root.querySelector('canvas')?.remove();
    observer?.unobserve(globalThis.document.body);
}

export default function createGame($root: HTMLElement) {
    cleanup($root);

    const $canvas = globalThis.document.createElement('canvas');

    $canvas.classList.add('canvas');

    observer = new ResizeObserver(() => {
        resizeCanvas($canvas);
    });

    resizeCanvas($canvas);
    observer.observe(globalThis.document.body);

    $root.classList.add('game');
    $root.appendChild($canvas);

    return $canvas;
}