import { GetState, SetState } from "zustand";
import { numberify } from "/src/utils/casting/numberify";
import { createGameId } from "/src/utils/id";

export interface Round {
    id: number;
    base: number,
    points: number,
}

export interface Player {
    name: string;
    id: number;
    rounds: Round[];
}

export interface Game {
    id: number;
    createdAt: string;
    players: Player[];
    winScore: number;
}

export interface GameSliceState {
    games: Game[];
    currentGame: Game | null;
    setCurrentGame: (id:number) => Game | null;
    saveCurrentGame: () => void;
    getGame: (id: number) => Game | undefined;
    createGame: (playersName: string[], winScore: number) => number;
    editRound: (playerId: number, roundId: number, edit: any) => void;
    addRound: (playerId: number, round: any) => void;
    deleteRound: (playerId: number, roundId: number) => void;
}

export type GameSlice = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => GameSliceState;

const createGame = (set: SetState<GameSliceState>) => {
    return (playersNames: string[], winScore: number) => {
        const id = createGameId();
        const players: Player[] = playersNames.map((player, i) => ({
            id: i,
            name: player,
            rounds: [],
        }));
        const date = new Date().toLocaleString();
        console.log(date);

        const game: Game = { id: id, players, winScore, createdAt: date };
        set(state => ({ 
            games: [...state.games, game],
            currentGame: game
        }));
        return id;
    }
}

const addRound = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => {
    return (playerId: number, round: any) => {
        const players = get().currentGame?.players.slice() as Player[];
        const currentPlayerIndex = players?.findIndex(player => player.id === playerId);
        const currentPlayer = players[currentPlayerIndex];
        round.id = currentPlayer.rounds.length;
        const roundNumber = numberify<Round>(round); 
        currentPlayer.rounds.push(roundNumber);

        set(state => ({
            currentGame: {
                ...state.currentGame as Game,
                players
            }
        }))
    }
}

const editRound = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => {
    return (playerId: number, roundId: number, edit: any) => {
        const players = get().currentGame?.players.slice() as Player[];
        const currentPlayer = players.find(player => player.id === playerId) as Player;
        const selectedRoundIndex = currentPlayer?.rounds.findIndex(round => roundId === round.id);
        const selectedRound = currentPlayer.rounds[selectedRoundIndex];
        const editNumber = numberify<Round>(edit);

        editNumber.id = selectedRound?.id;
        
        currentPlayer.rounds[selectedRoundIndex] = editNumber;

        set(state => ({
            currentGame: {
                ...state.currentGame as Game,
                players
            }
        }))
    }
}

const deleteRound = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => {
    return (playerId: number, roundId: number) => {
        const players = get().currentGame?.players.slice() as Player[];
        const currentPlayer = players?.find(player => player.id === playerId) as Player;
        const newRounds = currentPlayer?.rounds.filter(round => roundId !== round.id);
        
        currentPlayer.rounds = newRounds;

        set(state => ({
            currentGame: {
                ...state.currentGame as Game,
                players
            }
        }))
    }
}

const setCurrentGame = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => {
    return (gameId: number) => {
        const game = get().getGame(gameId);
        if(!game){
            console.log('game not found');
            return null;
        }
        set(_state => ({
            currentGame: game
        }));
        return game;
    }
}

const saveCurrentGame = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => {
    return () => {
        const currentGame = get().currentGame;
        if(!currentGame){
            console.log('game not found');
            return null;
        }

        const games = get().games.slice();
        const gameIndex = games.findIndex(game => game.id === currentGame?.id);
        games[gameIndex] = currentGame;

        set(_state => ({
            games
        }));
    }
}



export const gameSlice: GameSlice = (set: SetState<GameSliceState>, get: GetState<GameSliceState>) => ({
    games: [],
    currentGame: null,
    getGame: (id: number) => get().games.find(game => game.id === id),
    createGame: createGame(set),
    setCurrentGame: setCurrentGame(set, get),
    saveCurrentGame: saveCurrentGame(set, get),
    addRound: addRound(set, get),
    editRound: editRound(set, get),
    deleteRound: deleteRound(set, get)
})
