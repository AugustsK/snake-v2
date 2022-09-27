const BASE_SPEED = 1000; // 1sec

export default function calcSpeed(level: number) {
    if (level <= 10) {
        return BASE_SPEED - ((level - 1) * 40);
    } else if (level <= 20) {
        return BASE_SPEED - (9 * 40) - ((level - 10) * 30);
    } else if (level <= 30) {
        return BASE_SPEED - (9 * 40) - (10 * 30) - ((level - 20) * 20);
    } else if (level <= 40) {
        return BASE_SPEED - (9 * 40) - (10 * 30) - (10 * 20) - ((level - 30) * 10);
    }

    return Math.max(BASE_SPEED - (9 * 40) - (10 * 30) - (10 * 20) - (9 * 10) - (level - 30), 1);
}