import { GetState, SetState } from "zustand";
import { createGameId } from "/src/utils/id";

interface Round {
    base?: string,
    points?: string,
    result: number
}

export interface Player {
    name: string,
    id: number,
    rounds: Round[]
}

export interface Game {
    id: number,
    players: Player[]
    winScore: number;
}

export interface GameSliceState {
    game: Game | null;
    createGame: (playersName: string[], winScore: number) => number;
    addRound: (playerId: number, round: any) => void;
}

export type GameSlice = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => GameSliceState;

const createGame = (set: SetState<GameSliceState>) => {
    return (playersNames: string[], winScore: number) => {
        const id = createGameId();
        const players: Player[] = playersNames.map((player, i) => ({
            id: i,
            name: player,
            rounds: [],
        }))
        const game: Game = { id: id, players, winScore };
        set(state => ({ game }));
        return id;
    }
}

const addRound = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => {
    return (playerId: number, round: any) => {
        const players = get().game?.players.slice() as Player[];
        const currentPlayerIndex = players.findIndex(player => player.id === playerId);
        const currentPlayer = players[currentPlayerIndex];
        console.log(currentPlayer.rounds);
        const fullRound = getFullRound(currentPlayer, round);
        currentPlayer.rounds.push(fullRound);
        console.log(currentPlayer);
        set(state => ({
            game: {
                ...state.game as Game,
                players
            }
        }))
    }
}

export const gameSlice: GameSlice = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => ({
    game: null,
    createGame: createGame(set),
    addRound: addRound(set, get)
})

const getFullRound = (currentPlayer: Player, round: any) => {
    console.log(currentPlayer);
    const lastResult = currentPlayer.rounds.slice().pop()?.result;
    const roundResult = Number(round.base) + Number(round.points);
    return {
        ...round,
        result: lastResult ? lastResult + roundResult : roundResult
    };
}