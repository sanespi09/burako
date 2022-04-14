import { GetState, SetState } from "zustand";
import { StoreSlice } from "..";
import { Game, GameSliceState, Player, Round } from "./gameSlice";
import { numberify } from "/src/utils/casting/numberify";

export interface RoundSliceState {
    editRound: (playerId: number, roundId: number, edit: any) => void;
    addRound: (playerId: number, round: any) => void;
    deleteRound: (playerId: number, roundId: number) => void;
}

type CombinedState = GameSliceState & RoundSliceState;

const addRound = (set: SetState<CombinedState>, get: GetState<CombinedState>) => {
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

const editRound = (set: SetState<CombinedState>, get: GetState<CombinedState>) => {
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

const deleteRound = (set: SetState<CombinedState>, get: GetState<CombinedState>) => {
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

export const roundSlice: StoreSlice<RoundSliceState, GameSliceState> = (set, get) => ({
    addRound: addRound(set, get),
    editRound: editRound(set, get),
    deleteRound: deleteRound(set, get)
})
