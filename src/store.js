import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useBoardStore = create(
  persist(
    (set) => ({
      data: [],
      addBoard: (newBoard) => set((state) => ({ data: [...state.data, newBoard] })),
      removeBoard: (id) => set((state) => ({ data: state.data.filter((item) => item.id !== id) })),
      updateBoard: (updatedBoard) =>
        set((state) => ({
          data: state.data.map((item) => (item.id === updatedBoard.id ? updatedBoard : item)),
        })),

      updateBoardType: (id, type) => set((state) => ({ data: state.data.map(el => el.id === id ? { ...el, type: type } : el) })),
      reorderItems: (newData) => set({ data: newData })
    }),
    {
      name: 'board-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
