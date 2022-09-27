import { CANVAS_RESOLUTION } from "@/app/constant/game";

export default function randomNumber(min: number, max = CANVAS_RESOLUTION) {
    return Math.round(Math.random() * (max - min) + min);
}
