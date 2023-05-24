import { create } from "zustand";

interface item {
  id: string;
  //   variant?: string;
  //   type?: string;
  //   quantity: number;
}
interface cartStore {
  content: item[];
}

export const useCartStore = create((set) => ({
  content: [],
  resumeContent: (local: item[]) => set(() => ({ content: [...local] })),
  addItem: (item: item) => {
    set((state: cartStore) => ({ content: [...state.content, item] }));
  },
  //   removeItem: (item:item) => set((state:cartStore) => ( { content: [...state.content, item] }))
}));
