import { GetState, SetState } from 'zustand';
import { StoreSlice } from '..';
import { numberify } from '/src/utils/casting/numberify';
import { createGameId } from '/src/utils/id';

export interface Round {
    id: number;
    base: number;
    points: number;
}

export interface Player {
    name: string;
    id: number;
    rounds: Round[];
}

export interface Game {
    id?: number;
    createdAt?: string;
    players: Player[];
    winScore?: number;
}

export interface GameSliceState {
    games: Game[];
    currentGame: Game | null;
    setCurrentGame: (id: number) => Game | null;
    changePlayerName: (playerId: number, name: string) => void;
    saveCurrentGame: () => void;
    getGame: (id: number) => Game | undefined;
    createGame: (playersName: string[], winScore: number) => number;
}

export type GameSlice = (
    set: SetState<GameSliceState>,
    get: GetState<GameSliceState>
) => GameSliceState;

const createGame = (set: SetState<GameSliceState>) => {
    return (playersNames: string[], winScore: number) => {
        const id = createGameId();
        const players: Player[] = playersNames.map((player, i) => ({
            id: i,
            name: player,
            rounds: [],
        }));
        const date = new Date().toLocaleString('en-GB');

        const game: Game = { id: id, players, winScore, createdAt: date };
        set((state) => ({
            games: [...state.games, game],
            currentGame: game,
        }));
        return id;
    };
};

const setCurrentGame = (
    set: SetState<GameSliceState>,
    get: GetState<GameSliceState>
) => {
    return (gameId: number) => {
        const game = get().getGame(gameId);
        if (!game) {
            console.log('game not found');
            return null;
        }
        set((_state) => ({
            currentGame: game,
        }));
        return game;
    };
};

const saveCurrentGame = (
    set: SetState<GameSliceState>,
    get: GetState<GameSliceState>
) => {
    return () => {
        const currentGame = get().currentGame;
        if (!currentGame) {
            console.log('game not found');
            return null;
        }

        const games = get().games.slice();
        const gameIndex = games.findIndex(
            (game) => game.id === currentGame?.id
        );
        games[gameIndex] = currentGame;

        set((_state) => ({
            games,
        }));
    };
};

const changePlayerName = (
    set: SetState<GameSliceState>,
    get: GetState<GameSliceState>
) => {
    return (playerId: number, name: string) => {
        const currentGame = get().currentGame;
        const players = currentGame?.players.slice();
        if (players) {
            const selectedPlayerIndex = players?.findIndex(
                (player) => player.id === playerId
            );
            const selectedPlayer = players[selectedPlayerIndex];
            const newPlayer = { ...selectedPlayer, name };
            players[selectedPlayerIndex] = newPlayer;

            set((state) => ({
                currentGame: { ...state.currentGame, players },
            }));
        }
    };
};

export const gameSlice: StoreSlice<GameSliceState> = (set, get) => ({
    games: [],
    currentGame: null,
    changePlayerName: changePlayerName(set, get),
    getGame: (id: number) => get().games.find((game) => game.id === id),
    createGame: createGame(set),
    setCurrentGame: setCurrentGame(set, get),
    saveCurrentGame: saveCurrentGame(set, get),
});
