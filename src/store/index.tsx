import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import { gameSlice } from './slices/gameSlice';
import { roundSlice } from './slices/roundSlice';

export type StoreSlice<T extends object, E extends object = T> = (
    set: SetState<E extends T ? E : E & T>,
    get: GetState<E extends T ? E : E & T>
  ) => T;

const useStore = create(persist((set: SetState<any>, get: GetState<any>) => ({
    ...gameSlice(set, get),
    ...roundSlice(set, get)
    }),
    {
        name: 'game-storage'
    })
);

export default useStore;