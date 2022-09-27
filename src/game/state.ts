import {IGameState} from "@/types/game";

import getNewState from "@/app/structure/state";

let state: IGameState = {
    ...getNewState()
};

export const getState = (): IGameState => state;

export const setState = (newState: IGameState) => {
    state = {
        ...newState
    };
};

const subscribers = new Set<() => void>();

export const addSubscriber = (callback: () => void) => {
    subscribers.add(callback);
}

export const trigger = () => {
    subscribers.forEach(callback => {
        callback();
    });

    return state;
}
