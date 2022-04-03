import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameSlice, gameSlice, GameSliceState } from './slices/gameSlice';

const useStore = create(persist((set: SetState<GameSliceState>, get: GetState<GameSliceState>) => ({
    ...gameSlice(set, get)
    }),
    {
        name: 'game-storage'
    })
);

export default useStore;