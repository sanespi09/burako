export const createGameId = () => {
    const id = Math.random() * 9999;
    return Math.ceil(id);
} 