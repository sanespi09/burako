import { createGame, roundModal } from "/src/content/forms/errors";

export const roundValidate = (value: string) => {
    const length = value.length;
    if (length < 1) {
        return roundModal.length;
    } else {
        return null;
    }
}

export const gameValidate = (value: string) => {
    const length = value.length;
    if (length < 1) {
        return createGame.length;
    } else {
        return null;
    }
}